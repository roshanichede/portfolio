"use client"

import { ExternalLink, Github, Code2, Palette, Database, Globe, Zap, Heart, Star, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProjectWithDeployments } from "@/lib/vercel-client"

interface ProjectCardProps {
    project: ProjectWithDeployments
    index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const deploymentUrl = project.productionDeployment?.url || project.latestDeployment?.url
    const githubUrl = project.githubRepo ? `https://github.com/${project.githubRepo}` : null

    const getRandomProjectColor = () => {
        const colors = [
            "bg-red-100 border-red-300",
            "bg-blue-100 border-blue-300",
            "bg-green-100 border-green-300",
            "bg-yellow-100 border-yellow-300",
            "bg-purple-100 border-purple-300",
            "bg-pink-100 border-pink-300",
            "bg-indigo-100 border-indigo-300",
            "bg-orange-100 border-orange-300",
            "bg-teal-100 border-teal-300",
            "bg-cyan-100 border-cyan-300",
        ]
        const hash = project.name.split("").reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0)
            return a & a
        }, 0)
        return colors[Math.abs(hash) % colors.length]
    }

    const getCuteThumbnail = () => {
        const thumbnails = [
            { icon: Code2, bg: "bg-blue-500" },
            { icon: Palette, bg: "bg-purple-500" },
            { icon: Database, bg: "bg-green-500" },
            { icon: Globe, bg: "bg-orange-500" },
            { icon: Zap, bg: "bg-yellow-500" },
            { icon: Heart, bg: "bg-pink-500" },
            { icon: Star, bg: "bg-indigo-500" },
            { icon: Rocket, bg: "bg-red-500" },
        ]

        const hash = project.name.split("").reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0)
            return a & a
        }, 0)

        return thumbnails[Math.abs(hash) % thumbnails.length]
    }

    const getTechStack = () => {
        const techStack = []

        // Add framework
        if (project.framework) {
            techStack.push(project.framework)
        }

        // Infer additional tech based on framework and project name
        const projectNameLower = project.name.toLowerCase()
        const commitMessage = project.commitMessage?.toLowerCase() || ""

        // Frontend technologies
        if (project.framework?.toLowerCase() === "nextjs") {
            techStack.push("React", "TypeScript")
        } else if (project.framework?.toLowerCase() === "react") {
            techStack.push("JavaScript")
        } else if (project.framework?.toLowerCase() === "vue") {
            techStack.push("Vue.js")
        }

        // Styling
        if (projectNameLower.includes("tailwind") || commitMessage.includes("tailwind")) {
            techStack.push("Tailwind CSS")
        } else if (projectNameLower.includes("styled") || commitMessage.includes("styled")) {
            techStack.push("Styled Components")
        } else {
            techStack.push("CSS")
        }

        // Backend/Database (inferred from project name)
        if (projectNameLower.includes("api") || projectNameLower.includes("backend")) {
            techStack.push("Node.js")
        }
        if (projectNameLower.includes("mongo") || projectNameLower.includes("db")) {
            techStack.push("MongoDB")
        }
        if (projectNameLower.includes("postgres") || projectNameLower.includes("sql")) {
            techStack.push("PostgreSQL")
        }
        if (projectNameLower.includes("firebase")) {
            techStack.push("Firebase")
        }
        if (projectNameLower.includes("supabase")) {
            techStack.push("Supabase")
        }

        // Tools/Platforms
        if (projectNameLower.includes("auth")) {
            techStack.push("Authentication")
        }
        if (projectNameLower.includes("chat") || projectNameLower.includes("socket")) {
            techStack.push("WebSocket")
        }

        // Always add Vercel since it's deployed there
        techStack.push("Vercel")

        // Remove duplicates and limit to 5 items for mini cards
        return [...new Set(techStack)].slice(0, 5)
    }

    const thumbnail = getCuteThumbnail()
    const techStack = getTechStack()

    return (
        <div
            className={`${getRandomProjectColor()} border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group overflow-hidden`}
            style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
            }}
        >
            <div className="p-4">
                {/* Cute Thumbnail */}
                <div className="flex items-center gap-3 mb-3">
                    <div
                        className={`${thumbnail.bg} w-12 h-12 border-2 border-black flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}
                    >
                        <thumbnail.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-black group-hover:scale-105 transition-transform duration-300 leading-tight">
                            {project.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h3>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-3">
                    <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                        {techStack.map((tech, techIndex) => (
                            <span
                                key={tech}
                                className="bg-white text-black px-2 py-1 text-xs font-semibold border border-black hover:scale-105 transition-all duration-200 cursor-default"
                                style={{
                                    animationDelay: `${index * 100 + techIndex * 50}ms`,
                                    animation: "fadeInUp 0.3s ease-out forwards",
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {deploymentUrl && (
                        <Button
                            size="sm"
                            className="bg-green-400 text-black border-2 border-black hover:bg-green-500 flex-1 font-semibold hover:scale-105 transition-all duration-200 text-xs py-2"
                            onClick={() => window.open(`https://${deploymentUrl}`, "_blank")}
                        >
                            <ExternalLink size={12} className="mr-1" />
                            Live Site
                        </Button>
                    )}

                    {githubUrl && (
                        <Button
                            size="sm"
                            className="bg-black text-white border-2 border-black hover:bg-gray-800 flex-1 font-semibold hover:scale-105 transition-all duration-200 text-xs py-2"
                            onClick={() => window.open(githubUrl, "_blank")}
                        >
                            <Github size={12} className="mr-1" />
                            Code
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
