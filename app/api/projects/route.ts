import { NextResponse } from "next/server"
import { portfolioConfig, shouldIncludeProject, sortProjects } from "@/lib/portfolio-config"

interface VercelDeployment {
    uid: string
    name: string
    url: string
    state: "BUILDING" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY" | "CANCELED"
    type: "LAMBDAS"
    created: number
    creator: {
        uid: string
        username: string
    }
    meta: {
        githubCommitMessage?: string
        githubCommitRef?: string
        githubCommitSha?: string
        githubRepo?: string
    }
    target: "production" | "preview"
    aliasAssigned?: boolean
    aliasError?: any
}

interface VercelProject {
    id: string
    name: string
    accountId: string
    createdAt: number
    updatedAt: number
    framework: string | null
    devCommand: string | null
    buildCommand: string | null
    outputDirectory: string | null
    rootDirectory: string | null
    directoryListing: boolean
    nodeVersion: string
    latestDeployments: VercelDeployment[]
}

interface ProjectWithDeployments extends VercelProject {
    latestDeployment?: VercelDeployment
    productionDeployment?: VercelDeployment
    previewDeployments: VercelDeployment[]
    status: "active" | "building" | "error" | "inactive"
    lastUpdated: string
    commitMessage?: string
    githubRepo?: string
}

class VercelAPIError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message)
        this.name = "VercelAPIError"
    }
}

class VercelAPI {
    private baseURL = "https://api.vercel.com"
    private token: string | null = null

    constructor() {
        this.token = process.env.VERCEL_TOKEN || null
    }

    private async fetchWithAuth(endpoint: string): Promise<any> {
        if (!this.token) {
            throw new VercelAPIError("Vercel API token not configured. Please add VERCEL_TOKEN environment variable.", 401)
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                if (response.status === 401) {
                    throw new VercelAPIError("Invalid Vercel API token. Please check your VERCEL_TOKEN.", 401)
                }
                if (response.status === 403) {
                    throw new VercelAPIError("Access denied. Please check your Vercel API token permissions.", 403)
                }
                if (response.status === 429) {
                    throw new VercelAPIError("Rate limit exceeded. Please try again later.", 429)
                }
                throw new VercelAPIError(`API request failed with status ${response.status}`, response.status)
            }

            return await response.json()
        } catch (error) {
            if (error instanceof VercelAPIError) {
                throw error
            }
            throw new VercelAPIError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`, 500)
        }
    }

    async getProjects(): Promise<VercelProject[]> {
        try {
            const response = await this.fetchWithAuth("/v9/projects")
            return response.projects || []
        } catch (error) {
            throw error instanceof VercelAPIError ? error : new VercelAPIError("Failed to fetch projects", 500)
        }
    }

    async getProjectDeployments(projectId: string): Promise<VercelDeployment[]> {
        try {
            const response = await this.fetchWithAuth(`/v6/deployments?projectId=${projectId}&limit=10`)
            return response.deployments || []
        } catch (error) {
            throw error instanceof VercelAPIError
                ? error
                : new VercelAPIError(`Failed to fetch deployments for project ${projectId}`, 500)
        }
    }

    async getProjectsWithDeployments(): Promise<ProjectWithDeployments[]> {
        try {
            const projects = await this.getProjects()

            const projectsWithDeployments = await Promise.allSettled(
                projects.map(async (project): Promise<ProjectWithDeployments> => {
                    const deployments = await this.getProjectDeployments(project.id)

                    // Only include READY deployments
                    const readyDeployments = deployments.filter((d) => d.state === "READY")
                    const productionDeployments = readyDeployments.filter((d) => d.target === "production")
                    const previewDeployments = readyDeployments.filter((d) => d.target === "preview")

                    const latestDeployment = readyDeployments[0]
                    const productionDeployment = productionDeployments[0]

                    // Only include projects that have at least one ready deployment
                    if (!latestDeployment) {
                        throw new Error("No ready deployments found")
                    }

                    let status: ProjectWithDeployments["status"] = "inactive"
                    if (latestDeployment) {
                        switch (latestDeployment.state) {
                            case "READY":
                                status = "active"
                                break
                            case "BUILDING":
                            case "INITIALIZING":
                            case "QUEUED":
                                status = "building"
                                break
                            case "ERROR":
                            case "CANCELED":
                                status = "error"
                                break
                        }
                    }

                    return {
                        ...project,
                        latestDeployment,
                        productionDeployment,
                        previewDeployments,
                        status,
                        lastUpdated: new Date(latestDeployment?.created || project.updatedAt).toISOString(),
                        commitMessage: latestDeployment?.meta?.githubCommitMessage,
                        githubRepo: latestDeployment?.meta?.githubRepo,
                    }
                }),
            )

            const allProjects = projectsWithDeployments
                .filter((result): result is PromiseFulfilledResult<ProjectWithDeployments> => result.status === "fulfilled")
                .map((result) => result.value)

            // Apply portfolio configuration filtering
            const filteredProjects = allProjects.filter(shouldIncludeProject)

            // Sort projects according to configuration
            const sortedProjects = sortProjects(filteredProjects)

            // Limit number of projects if specified
            const limitedProjects =
                portfolioConfig.display.maxProjects > 0
                    ? sortedProjects.slice(0, portfolioConfig.display.maxProjects)
                    : sortedProjects

            return limitedProjects
        } catch (error) {
            throw error instanceof VercelAPIError
                ? error
                : new VercelAPIError("Failed to fetch projects with deployments", 500)
        }
    }
}

const vercelAPI = new VercelAPI()

export async function GET() {
    try {
        const projects = await vercelAPI.getProjectsWithDeployments()

        // Add configuration info to response
        const response = {
            projects,
            config: {
                totalIncluded: projects.length,
                maxProjects: portfolioConfig.display.maxProjects,
                sortBy: portfolioConfig.display.sortBy,
                autoIncludeEnabled: portfolioConfig.autoInclude.withProduction,
            },
            success: true,
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error("Vercel API Error:", error)

        if (error instanceof VercelAPIError) {
            return NextResponse.json(
                {
                    error: error.message,
                    success: false,
                    status: error.status,
                },
                { status: error.status || 500 },
            )
        }

        return NextResponse.json(
            {
                error: "An unexpected error occurred while fetching projects",
                success: false,
                status: 500,
            },
            { status: 500 },
        )
    }
}
