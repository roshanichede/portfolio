"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, Package, Presentation, Link as LinkIcon, Hand } from "lucide-react"
import { ScrollReveal } from "@/components/motion/ScrollReveal"
import { TextEffect } from "@/components/core/text-effect"
import { Button } from "@/components/ui/button"

type Project = {
  name: string
  tagline: string
  description: string
  tech: string[]
  github?: string
  live?: string
  image?: string
  icon: React.ReactNode
  gradient: string
  status?: "Live" | "" | ""
}

const projects: Project[] = [
  {
    name: "EcoQuick",
    tagline: "Sustainable same-day delivery platform",
    description:
      "End-to-end two-sided delivery marketplace with customer and driver apps. Customers book parcels through a multi-step wizard, pay via Stripe, and track their driver live on a Mapbox map. Drivers accept jobs, progress deliveries through real-time status updates, and earn 80% per completed order. Built with eco-incentive pricing to encourage sustainable logistics.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Supabase", "Stripe", "Mapbox"],
    github: "https://github.com/roshanichede/ecoquick",
    live: "https://ecoquick.vercel.app",
    icon: <Package className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2.5} />,
    gradient: "from-green-300 via-emerald-300 to-teal-300",
    status: "Live",
  },
  {
    name: "AI Slide Enhancer",
    tagline: "Turn plain slides into polished presentations",
    description:
      "Web app that enhances presentation slides using AI — upload a deck, generate improved content, and preview narration with speech synthesis. Features Supabase-backed auth with row-level security, a Radix UI + Tailwind interface, and a Python pipeline powering the slide-processing backend.",
    tech: ["Next.js", "TypeScript", "Supabase", "Python", "Tailwind", "Radix UI"],
    github: "https://github.com/roshanichede/slide-enhancer",
    live: "https://slide-enhancer.vercel.app",
    icon: <Presentation className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2.5} />,
    gradient: "from-purple-300 via-pink-300 to-rose-300",
    status: "Live",
  },
  {
    name: "Gesture Workspace Controls",
    tagline: "Hands-free macOS control from your menu bar",
    description:
      "macOS menu bar utility that maps webcam hand gestures to workspace actions — thumb up/down for brightness, peace sign to toggle dark mode, open palm for Focus, fist for Do Not Disturb. Built with Electron + MediaPipe Hands, with a hold-to-trigger flow and a macOS bridge that dispatches actions via AppleScript and Shortcuts CLI.",
    tech: ["Electron", "JavaScript", "MediaPipe", "AppleScript", "macOS Shortcuts"],
    github: "https://github.com/roshanichede/gesture-workspace-controls",
    icon: <Hand className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2.5} />,
    gradient: "from-orange-300 via-amber-300 to-yellow-300",
    status: "",
  },
  {
    name: "URL Shortener",
    tagline: "Django-powered link shortening service",
    description:
      "Classic URL shortener built as a learning project in Django. Generates short slugs, persists mappings in SQLite, and redirects visitors to original URLs — a clean example of Django's MVT pattern, form handling, and database models.",
    tech: ["Django", "Python", "SQLite", "HTML"],
    github: "https://github.com/roshanichede/url-shortener",
    icon: <LinkIcon className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2.5} />,
    gradient: "from-blue-300 via-sky-300 to-cyan-300",
    status: "",
  },
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-16 lg:py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-4">
                <TextEffect per="char" preset="rise">Projects</TextEffect>
              </h2>
            </ScrollReveal>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              A few things I've built recently — from full-stack platforms to weekend experiments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <article
                key={project.name}
                className={`flex flex-col bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Hero block */}
                <div
                  className={`relative h-40 sm:h-44 bg-gradient-to-br ${project.gradient} border-b-4 border-black dark:border-white flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }} />
                  <div className="relative text-black group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {project.icon}
                  </div>
                  {project.status && (
                    <span
                      className={`absolute top-3 right-3 px-2 py-1 text-[10px] font-black uppercase tracking-wider border-2 border-black ${
                        project.status === "Live"
                          ? "bg-green-400 text-black"
                          : project.status === ""
                          ? "bg-yellow-400 text-black"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 lg:p-6">
                  <h3 className="text-xl lg:text-2xl font-black text-black dark:text-white mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-gray-100 dark:bg-zinc-800 text-black dark:text-white px-2 py-1 text-xs font-semibold border border-black dark:border-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.live && (
                      <Button
                        onClick={() => window.open(project.live, "_blank")}
                        size="sm"
                        className="flex-1 bg-green-400 hover:bg-green-500 text-black font-bold border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        Live Demo
                      </Button>
                    )}
                    {project.github && (
                      <Button
                        onClick={() => window.open(project.github, "_blank")}
                        size="sm"
                        variant="ghost"
                        className="flex-1 bg-white dark:bg-zinc-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black text-black dark:text-white font-bold border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                      >
                        <Github className="w-4 h-4 mr-1.5" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
