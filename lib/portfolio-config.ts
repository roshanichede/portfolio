// Portfolio Configuration
// Add project names here to include them in your portfolio
// Projects not listed here will be hidden automatically

export const portfolioConfig = {
    // Projects to include in portfolio (by exact project name from Vercel)
    includedProjects: [
        ""
        // Add your project names here
    ],

    // Projects to explicitly exclude (even if they match other criteria)
    excludedProjects: [
        "storybook",
        "roshani-portfolio",
        "slpp-dashboard",
        "slpp-dashboard-123",
        "roshani-chede-portfolio",
        "",
        // Add project names you want to hide
    ],

    // Auto-include settings
    autoInclude: {
        // Automatically include projects with production deployments
        withProduction: true,

        // Automatically include projects with these frameworks
        frameworks: ["nextjs", "react", "vue", "gatsby"],

        // Exclude projects older than X days (0 = include all)
        maxAgeDays: 365,

        // Minimum deployments required to auto-include
        minDeployments: 1,
    },

    // Display settings
    display: {
        // Maximum number of projects to show
        maxProjects: 12,

        // Sort order: 'newest', 'oldest', 'alphabetical', 'framework'
        sortBy: "newest" as "newest" | "oldest" | "alphabetical" | "framework",

        // Show project stats in UI
        showStats: true,
    },
}

// Helper function to determine if a project should be included
export function shouldIncludeProject(project: any): boolean {
    const { name, framework, lastUpdated, previewDeployments, productionDeployment } = project
    const { includedProjects, excludedProjects, autoInclude } = portfolioConfig

    // Explicit exclusion takes priority
    if (excludedProjects.includes(name)) {
        return false
    }

    // Explicit inclusion
    if (includedProjects.includes(name)) {
        return true
    }

    // Auto-include logic
    if (autoInclude.withProduction && productionDeployment) {
        // Check framework filter
        if (autoInclude.frameworks.length > 0 && framework) {
            if (!autoInclude.frameworks.includes(framework.toLowerCase())) {
                return false
            }
        }

        // Check age filter
        if (autoInclude.maxAgeDays > 0) {
            const projectAge = (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
            if (projectAge > autoInclude.maxAgeDays) {
                return false
            }
        }

        // Check minimum deployments
        const totalDeployments = (previewDeployments?.length || 0) + (productionDeployment ? 1 : 0)
        if (totalDeployments < autoInclude.minDeployments) {
            return false
        }

        return true
    }

    return false
}

// Helper function to sort projects
export function sortProjects(projects: any[]): any[] {
    const { sortBy } = portfolioConfig.display

    switch (sortBy) {
        case "newest":
            return projects.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        case "oldest":
            return projects.sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime())
        case "alphabetical":
            return projects.sort((a, b) => a.name.localeCompare(b.name))
        case "framework":
            return projects.sort((a, b) => {
                if (!a.framework && !b.framework) return 0
                if (!a.framework) return 1
                if (!b.framework) return -1
                return a.framework.localeCompare(b.framework)
            })
        default:
            return projects
    }
}
  