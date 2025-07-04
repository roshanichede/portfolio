export interface VercelDeployment {
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

export interface VercelProject {
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

export interface ProjectWithDeployments extends VercelProject {
    latestDeployment?: VercelDeployment
    productionDeployment?: VercelDeployment
    previewDeployments: VercelDeployment[]
    status: "active" | "building" | "error" | "inactive"
    lastUpdated: string
    commitMessage?: string
    githubRepo?: string
    isIncluded?: boolean // For portfolio filtering
}

export class VercelAPIError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message)
        this.name = "VercelAPIError"
    }
}

export class VercelAPI {
    private baseURL = "https://api.vercel.com"
    private token: string | null = null

    constructor() {
        // Get token from environment variable
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
                        isIncluded: false, // Default to not included
                    }
                }),
            )

            return projectsWithDeployments
                .filter((result): result is PromiseFulfilledResult<ProjectWithDeployments> => result.status === "fulfilled")
                .map((result) => result.value)
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        } catch (error) {
            throw error instanceof VercelAPIError
                ? error
                : new VercelAPIError("Failed to fetch projects with deployments", 500)
        }
    }
}

export const vercelAPI = new VercelAPI()
  