"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollReveal } from "@/components/motion/ScrollReveal"
import { TextEffect } from "@/components/core/text-effect"
import { Code, Database, Globe, Wrench, Layers, Link, Settings, Cloud } from "lucide-react"

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

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

  const skillsData = {
    "Languages": {
      skills: [
        { name: "Python", icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "TypeScript", icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "JavaScript", icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "C#", icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "SQL / PL-SQL", icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "C++", icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "HTML / CSS", icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" /> },
      ],
      color: "bg-blue-100",
      borderColor: "border-blue-300",
    },
    "Frameworks & Libraries": {
      skills: [
        { name: "Next.js", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "React", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Node.js", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Express", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: ".NET / ASP.NET", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Django", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Flask / FastAPI", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Angular", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Tailwind CSS", icon: <Layers className="w-3 h-3 sm:w-4 sm:h-4" /> },
      ],
      color: "bg-green-100",
      borderColor: "border-green-300",
    },
    "Databases": {
      skills: [
        { name: "PostgreSQL", icon: <Database className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "SQL Server", icon: <Database className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Oracle", icon: <Database className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "MySQL", icon: <Database className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Supabase", icon: <Database className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Redis", icon: <Database className="w-3 h-3 sm:w-4 sm:h-4" /> },
      ],
      color: "bg-orange-100",
      borderColor: "border-orange-300",
    },
    "Cloud & DevOps": {
      skills: [
        { name: "GCP", icon: <Cloud className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "AWS", icon: <Cloud className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Vercel", icon: <Cloud className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Docker", icon: <Wrench className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Kubernetes", icon: <Wrench className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "GitHub Actions", icon: <Settings className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Jenkins", icon: <Settings className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Nginx", icon: <Settings className="w-3 h-3 sm:w-4 sm:h-4" /> },
      ],
      color: "bg-purple-100",
      borderColor: "border-purple-300",
    },
    "Tools & Practices": {
      skills: [
        { name: "Git", icon: <Wrench className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "REST APIs", icon: <Link className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "GraphQL", icon: <Link className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Postman", icon: <Wrench className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Jira", icon: <Settings className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Agile / Scrum", icon: <Settings className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Stripe", icon: <Wrench className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { name: "Mapbox", icon: <Globe className="w-3 h-3 sm:w-4 sm:h-4" /> },
      ],
      color: "bg-pink-100",
      borderColor: "border-pink-300",
    },
  }

  return (
    <section ref={sectionRef} id="skills" className="py-12 lg:py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-6 lg:mb-10 text-center">
              <TextEffect per="char" preset="rise">Skills & Technologies</TextEffect>
            </h2>
          </ScrollReveal>
          </div>

          {/* Mobile Condensed View */}
          <div className="block lg:hidden">
            {!isMobileExpanded ? (
              <div
                className={`bg-gradient-to-r from-blue-100 to-purple-100 dark:from-zinc-800 dark:to-zinc-900 p-6 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
              >
                <div className="text-center space-y-4">
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                    Here's a byte-sized look at my stack—
                    <span className="font-bold text-black dark:text-white"> Python, JavaScript/TypeScript, .NET, Next.js</span>, and more. Want the full
                    gigabyte breakdown?
                  </p>

                  {/* Key Skills Preview */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {[
                      { name: "Python", color: "bg-pink-200 dark:bg-pink-400/60" },
                      { name: "JavaScript", color: "bg-yellow-200 dark:bg-yellow-400/60" },
                      { name: "TypeScript", color: "bg-blue-200 dark:bg-blue-400/60" },
                      { name: ".NET", color: "bg-green-200 dark:bg-green-400/60" },
                      { name: "React", color: "bg-blue-200 dark:bg-blue-400/60" },
                      { name: "Next.js", color: "bg-purple-200 dark:bg-purple-400/60" },
                    ].map((skill, index) => (
                      <span
                        key={skill.name}
                        className={`${skill.color} text-black dark:text-black px-3 py-2 text-sm font-bold border-2 border-black dark:border-white hover:scale-110 hover:rotate-2 transition-all duration-200 cursor-default`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: isVisible ? "fadeInUp 0.5s ease-out forwards" : "none",
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                    <span className="bg-gray-200 text-black px-3 py-2 text-sm font-bold border-2 border-black">
                      +15 more
                    </span>
                  </div>

                  <button
                    onClick={() => setIsMobileExpanded(true)}
                    className="bg-green-400 text-black font-bold px-6 py-3 text-base border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 hover:scale-105"
                  >
                    🚀 Expand & Load All Skills!
                  </button>
                </div>
              </div>
            ) : (
              /* Mobile Expanded View */
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <button
                    onClick={() => setIsMobileExpanded(false)}
                    className="bg-red-400 text-black font-bold px-4 py-2 text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                  >
                    ← Collapse Skills
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(skillsData).map(([categoryName, categoryData], categoryIndex) => (
                    <div
                      key={categoryName}
                      className={`${categoryData.color} dark:bg-zinc-900 p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group`}
                      style={{
                        animationDelay: `${categoryIndex * 100}ms`,
                        animation: "fadeInUp 0.4s ease-out forwards",
                      }}
                    >
                      <h3 className="text-base font-bold text-black dark:text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                        {categoryName}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {categoryData.skills.map((skill, skillIndex) => (
                          <span
                            key={skill.name}
                            className={`bg-white dark:bg-zinc-900 text-black dark:text-white px-2 py-1 text-xs font-semibold border-2 ${categoryData.borderColor} dark:border-white hover:scale-105 hover:rotate-1 transition-all duration-200 cursor-default flex items-center gap-1`}
                            style={{
                              animationDelay: `${categoryIndex * 100 + skillIndex * 50}ms`,
                              animation: "fadeInUp 0.3s ease-out forwards",
                            }}
                          >
                            {skill.icon}
                            <span>{skill.name.length > 10 ? skill.name.substring(0, 10) + "..." : skill.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop View - Always Expanded */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {Object.entries(skillsData).map(([categoryName, categoryData], categoryIndex) => (
              <div
                key={categoryName}
                className={`${categoryData.color} dark:bg-zinc-900 p-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${categoryIndex * 150}ms` }}
              >
                <h3 className="text-xl font-bold text-black dark:text-white mb-4 group-hover:scale-105 transition-transform duration-300">
                  {categoryName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoryData.skills.map((skill, skillIndex) => (
                    <span
                      key={skill.name}
                      className={`bg-white dark:bg-zinc-900 text-black dark:text-white px-3 py-1 text-sm font-semibold border-2 ${categoryData.borderColor} dark:border-white hover:scale-105 hover:rotate-1 transition-all duration-200 cursor-default flex items-center gap-1`}
                      style={{
                        animationDelay: `${categoryIndex * 150 + skillIndex * 50}ms`,
                        animation: isVisible ? "fadeInUp 0.4s ease-out forwards" : "none",
                      }}
                    >
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
