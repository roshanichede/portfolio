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
}

export class VercelClientError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message)
        this.name = "VercelClientError"
    }
}

export class VercelClient {
    async getProjectsWithDeployments(): Promise<{
        projects: ProjectWithDeployments[]
        config: any
    }> {
        try {
            const response = await fetch("/api/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new VercelClientError(data.error || "Failed to fetch projects", data.status || response.status)
            }

            if (!data.success) {
                throw new VercelClientError(data.error || "API request was not successful", data.status || 500)
            }

            return {
                projects: data.projects || [],
                config: data.config || null,
            }
        } catch (error) {
            if (error instanceof VercelClientError) {
                throw error
            }

            // Handle network errors
            if (error instanceof TypeError && error.message.includes("fetch")) {
                throw new VercelClientError("Network error: Unable to connect to the server", 0)
            }

            throw new VercelClientError(
                error instanceof Error ? error.message : "An unexpected error occurred while fetching projects",
                500,
            )
        }
    }
}

export const vercelClient = new VercelClient()
  