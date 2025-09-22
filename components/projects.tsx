"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw, AlertTriangle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { useVercelProjects } from "@/hooks/use-vercel-projects"

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { projects, loading, error, refetch, lastUpdated, config } = useVercelProjects(true, 60000)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const formatLastUpdated = () => {
    if (!lastUpdated) return ""
    return lastUpdated.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <section ref={sectionRef} id="projects" className="py-12 lg:py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              Projects
            </h2>

            {/* Error State */}
            {error && (
              <div
                className={`bg-red-100 dark:bg-red-900/30 border-4 border-red-500 dark:border-red-400 p-6 mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
                  <h3 className="text-lg font-bold text-red-800 dark:text-red-200">Unable to Load Projects</h3>
                </div>
                <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
                {error.includes("token") && (
                  <div className="bg-red-200 dark:bg-red-900/40 border-2 border-red-400 dark:border-red-300 p-4 mb-4 text-sm">
                    <p className="font-semibold mb-2">To display your real Vercel projects:</p>
                    <ol className="list-decimal list-inside space-y-1 text-red-800">
                      <li>Go to Vercel Dashboard → Settings → Tokens</li>
                      <li>Create a new token with appropriate permissions</li>
                      <li>Add it as VERCEL_TOKEN environment variable</li>
                      <li>Redeploy your portfolio</li>
                    </ol>
                  </div>
                )}
                <Button
                  onClick={refetch}
                  className="bg-red-500 text-white border-2 border-red-700 hover:bg-red-600 font-semibold"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Loading State */}
            {loading && projects.length === 0 && (
              <div
                className={`text-center py-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="bg-blue-100 border-4 border-black p-8 inline-block">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p className="text-lg font-semibold">Loading your deployed projects...</p>
                  <p className="text-sm text-gray-600 mt-2">Applying portfolio configuration filters</p>
                </div>
              </div>
            )}

            {/* Projects Grid - Responsive grid for mini cards */}
            {projects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && projects.length === 0 && (
              <div
                className={`text-center py-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="bg-yellow-100 border-4 border-black p-8 inline-block">
                  <Settings className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Projects Match Configuration</h3>
                  <p className="text-gray-600 mb-4">
                    Check your portfolio configuration or deploy some projects to Vercel!
                  </p>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>
                      Edit <code className="bg-gray-200 px-2 py-1 rounded">lib/portfolio-config.ts</code> to:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Add specific project names to include</li>
                      <li>Adjust auto-include settings</li>
                      <li>Modify framework filters</li>
                    </ul>
                  </div>
                  <Button
                    onClick={refetch}
                    className="bg-green-400 text-black border-2 border-black hover:bg-green-500 font-semibold"
                  >
                    Refresh Projects
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
