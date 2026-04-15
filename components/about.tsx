"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollReveal } from "@/components/motion/ScrollReveal"
import { TextEffect } from "@/components/core/text-effect"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-24 relative overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:20px_20px]"
    >
      {/* Graph Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 2px, transparent 2px),
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 dark:opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 2px, transparent 2px),
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
        }}
      />
      <div
        className="absolute inset-0 opacity-10 dark:opacity-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.16) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 dark:opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <ScrollReveal>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-10 text-center`}>
                <TextEffect per="char" preset="rise">About Me</TextEffect>
              </h2>
            </ScrollReveal>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="bg-white/90 dark:bg-black/30 backdrop-blur-sm p-8 md:p-10 lg:p-12 border-[3px] border-black dark:border-white glitch-shadow hover:glitch-shadow-active transition-all duration-300 group">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-white group-hover:scale-105 transition-transform duration-300 text-center">
                  Creative Developer & Problem Solver
                </h3>
                <div className="space-y-5 text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-[1.75] max-w-3xl mx-auto text-center">
                  <p>
                    I build software because I enjoy solving complex problems and turning ideas into dependable, real-world solutions. 
                    Clean, readable code is important to me, and I'm always motivated by the challenge of learning something new.
                  </p>
                  <p>
                    I bring 4+ years of experience in 
                    <span className="font-semibold text-black dark:text-white"> PL/SQL</span> and 
                    <span className="font-semibold text-black dark:text-white"> .NET</span>, where I've developed secure web services, written complex stored procedures, and supported production systems to ensure stability and performance. 
                    Currently, I'm expanding my skill set by working extensively with 
                    <span className="font-semibold text-black dark:text-white"> Python</span>—building projects, experimenting with frameworks, and strengthening my problem-solving approach across different domains.
                  </p>
                  <p>
                    Beyond code, I love exploring new technologies, discovering new places, and designing purely for the joy of creativity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
