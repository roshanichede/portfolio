"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollReveal } from "@/components/motion/ScrollReveal"
import { TextEffect } from "@/components/core/text-effect"
import { MapPin, Camera, Music, Code, Sparkles, BadgeCheck, Lightbulb, Rocket, FileText, Trophy, Wrench, CalendarClock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
      className="py-20 lg:py-24 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
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
                  {/* <div className="mt-16 max-w-3xl mx-auto">
                    <h3 className="text-3xl font-bold mb-6 text-center">Beyond the Code</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <MapPin className="w-8 h-8 mb-2" />
                        <span className="font-semibold">Travel & Explore</span>
                        <p className="text-sm text-gray-600">Hunting for hidden gems in every city.</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <Camera className="w-8 h-8 mb-2" />
                        <span className="font-semibold">Photography</span>
                        <p className="text-sm text-gray-600">Capturing moments, one frame at a time.</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <Music className="w-8 h-8 mb-2" />
                        <span className="font-semibold">Music Lover</span>
                        <p className="text-sm text-gray-600">Vinyl collector & live‐gig enthusiast.</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <Code className="w-8 h-8 mb-2" />
                        <span className="font-semibold">Side Projects</span>
                        <p className="text-sm text-gray-600">Building fun little apps in my spare time.</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* Popup actions */}
          <div className="max-w-4xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 justify-items-center">
            {/* How I Solve Problems */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <button className="w-full bg-white/80 dark:bg-zinc-900/60 border-2 border-black dark:border-white text-sm font-semibold px-4 py-2.5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-gradient-to-b from-transparent to-transparent hover:from-black/5 dark:hover:from-white/10">
                  <Wrench className="w-4 h-4" /> How I Solve Problems
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl border-4 border-black dark:border-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Wrench className="w-5 h-5" /> My approach</DialogTitle>
                  <DialogDescription>
                    Understand business context → break down into deliverables → pick the simplest reliable solution. I lean on metrics, logs, and clear PRs; prefer readable code over cleverness and ship iteratively.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}

            {/* Currently Exploring */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <button className="w-full bg-white/80 dark:bg-zinc-900/60 border-2 border-black dark:border-white text-sm font-semibold px-4 py-2.5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg.white dark:hover:text-black bg-gradient-to-b from-transparent to-transparent hover:from-black/5 dark:hover:from-white/10">
                  <Rocket className="w-4 h-4" /> Currently Exploring
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl border-4 border-black dark:border-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Rocket className="w-5 h-5" /> On my radar</DialogTitle>
                  <DialogDescription>
                    Advanced TypeScript patterns, React Server Components, performance budgets, Playwright testing, and a deeper dive into Postgres + Prisma.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}

            {/* Something Fun About Me */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <button className="w-full bg-white/80 dark:bg-zinc-900/60 border-2 border-black dark:border-white text-sm font-semibold px-4 py-2.5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-gradient-to-b from-transparent to-transparent hover:from-black/5 dark:hover:from-white/10">
                  <Sparkles className="w-4 h-4" /> Something Fun About Me
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl border-4 border-black dark:border-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5" /> Fun bit</DialogTitle>
                  <DialogDescription>
                    I love exploring new places and design for fun; that curiosity often inspires UI ideas I bring back to projects.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}

            {/* What Inspires Me */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <button className="w-full bg-white/80 dark:bg-zinc-900/60 border-2 border-black dark:border-white text-sm font-semibold px-4 py-2.5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-gradient-to-b from-transparent to-transparent hover:from-black/5 dark:hover:from-white/10">
                  <Lightbulb className="w-4 h-4" /> What Inspires Me
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl border-4 border-black dark:border-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Inspiration</DialogTitle>
                  <DialogDescription>
                    Clean product storytelling, thoughtful motion, and teams who value clarity over complexity. I enjoy shipping small, useful improvements consistently.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}

            {/* Outside Work */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <button className="w-full bg-white/80 dark:bg-zinc-900/60 border-2 border-black dark:border-white text-sm font-semibold px-4 py-2.5 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-gradient-to-b from-transparent to-transparent hover:from-black/5 dark:hover:from-white/10">
                  <MapPin className="w-4 h-4" /> Outside Work
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl border-4 border-black dark:border-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Off-hours</DialogTitle>
                  <DialogDescription>
                    Traveling, photography, and learning by building small interfaces—these keep me energized and creative.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
          </div>
        </div>
      </div>
    </section>
  )
}
