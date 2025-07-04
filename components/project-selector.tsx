"use client"

import { useState, useEffect } from "react"
import { Check, X, Eye, EyeOff, Settings, Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ProjectWithDeployments } from "@/lib/vercel-client"

interface ProjectSelectorProps {
    projects: ProjectWithDeployments[]
    onSelectionChange: (selectedProjects: string[]) => void
    loading: boolean
    onRefresh: () => void
}

export function ProjectSelector({ projects, onSelectionChange, loading, onRefresh }: ProjectSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set())
    const [searchTerm, setSearchTerm] = useState("")
    const [hasChanges, setHasChanges] = useState(false)

    // Load saved selections from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("portfolio-selected-projects")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setSelectedProjects(new Set(parsed))
                onSelectionChange(parsed)
            } catch (error) {
                console.error("Failed to load saved project selections:", error)
            }
        }
    }, [onSelectionChange])

    const toggleProject = (projectId: string) => {
        const newSelected = new Set(selectedProjects)
        if (newSelected.has(projectId)) {
            newSelected.delete(projectId)
        } else {
            newSelected.add(projectId)
        }
        setSelectedProjects(newSelected)
        setHasChanges(true)
    }

    const saveSelection = () => {
        const selectedArray = Array.from(selectedProjects)
        localStorage.setItem("portfolio-selected-projects", JSON.stringify(selectedArray))
        onSelectionChange(selectedArray)
        setHasChanges(false)
    }

    const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <div className="relative">
            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-purple-400 text-black font-bold border-2 border-black hover:bg-purple-500 hover:scale-105 transition-all duration-200"
            >
                <Settings className="w-4 h-4 mr-2" />
                Manage Projects ({selectedProjects.size})
            </Button>

            {/* Project Selector Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
                    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b-4 border-black">
                            <div>
                                <h3 className="text-2xl font-bold">Select Projects for Portfolio</h3>
                                <p className="text-gray-600 text-sm">Choose which deployed projects to showcase</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={onRefresh}
                                    disabled={loading}
                                    size="sm"
                                    className="bg-blue-400 text-black border-2 border-black hover:bg-blue-500"
                                >
                                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                                    Refresh
                                </Button>
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    variant="ghost"
                                    className="text-black hover:bg-black hover:text-white border-2 border-black p-2"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Search and Actions */}
                        <div className="p-4 border-b-2 border-black">
                            <div className="flex gap-4 items-center">
                                <Input
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 border-2 border-black"
                                />
                                <Button
                                    onClick={saveSelection}
                                    disabled={!hasChanges}
                                    className="bg-green-400 text-black border-2 border-black hover:bg-green-500 font-semibold"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Selection
                                </Button>
                            </div>
                        </div>

                        {/* Projects List */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {loading ? (
                                <div className="text-center py-8">
                                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                                    <p>Loading projects...</p>
                                </div>
                            ) : filteredProjects.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">
                                        {searchTerm ? "No projects match your search." : "No ready deployments found."}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredProjects.map((project) => {
                                        const isSelected = selectedProjects.has(project.id)
                                        const deploymentUrl = project.productionDeployment?.url || project.latestDeployment?.url

                                        return (
                                            <div
                                                key={project.id}
                                                className={`p-4 border-2 border-black cursor-pointer transition-all duration-200 ${isSelected
                                                        ? "bg-green-100 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)]"
                                                        : "bg-gray-50 hover:bg-gray-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                                                    }`}
                                                onClick={() => toggleProject(project.id)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div
                                                                className={`w-6 h-6 border-2 border-black flex items-center justify-center ${isSelected ? "bg-green-500" : "bg-white"
                                                                    }`}
                                                            >
                                                                {isSelected && <Check className="w-4 h-4 text-white" />}
                                                            </div>
                                                            <h4 className="font-bold text-lg">
                                                                {project.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                                            </h4>
                                                            {project.framework && (
                                                                <span className="bg-blue-500 text-white px-2 py-1 text-xs font-bold border border-black">
                                                                    {project.framework.toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="text-sm text-gray-600 space-y-1">
                                                            {deploymentUrl && (
                                                                <div>
                                                                    <span className="font-semibold">URL:</span> {deploymentUrl}
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span className="font-semibold">Last Updated:</span> {formatDate(project.lastUpdated)}
                                                            </div>
                                                            {project.commitMessage && (
                                                                <div>
                                                                    <span className="font-semibold">Latest:</span> {project.commitMessage}
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span className="font-semibold">Deployments:</span> Production:{" "}
                                                                {project.productionDeployment ? "✓" : "✗"}, Preview: {project.previewDeployments.length}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {isSelected ? (
                                                            <Eye className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <EyeOff className="w-5 h-5 text-gray-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t-2 border-black bg-gray-50">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div>
                                    {selectedProjects.size} of {projects.length} projects selected
                                </div>
                                {hasChanges && <div className="text-orange-600 font-semibold">Unsaved changes</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
