"use client"

import { useState, useEffect, useCallback } from "react"
import { vercelClient, type ProjectWithDeployments, VercelClientError } from "@/lib/vercel-client"

interface UseVercelProjectsReturn {
    projects: ProjectWithDeployments[]
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
    lastUpdated: Date | null
    config: {
        totalIncluded: number
        maxProjects: number
        sortBy: string
        autoIncludeEnabled: boolean
    } | null
}

export function useVercelProjects(autoRefresh = true, refreshInterval = 60000): UseVercelProjectsReturn {
    const [projects, setProjects] = useState<ProjectWithDeployments[]>([])
    const [config, setConfig] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchProjects = useCallback(async () => {
        try {
            setError(null)
            const data = await vercelClient.getProjectsWithDeployments()
            setProjects(data.projects || [])
            setConfig(data.config || null)
            setLastUpdated(new Date())
        } catch (err) {
            const errorMessage =
                err instanceof VercelClientError ? err.message : "An unexpected error occurred while fetching projects"
            setError(errorMessage)
            console.error("Failed to fetch Vercel projects:", err)
        } finally {
            setLoading(false)
        }
    }, [])

    const refetch = useCallback(async () => {
        setLoading(true)
        await fetchProjects()
    }, [fetchProjects])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    useEffect(() => {
        if (!autoRefresh) return

        const interval = setInterval(() => {
            fetchProjects()
        }, refreshInterval)

        return () => clearInterval(interval)
    }, [autoRefresh, refreshInterval, fetchProjects])

    return {
        projects,
        loading,
        error,
        refetch,
        lastUpdated,
        config,
    }
}
