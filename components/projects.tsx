"use client"

import { ScrollReveal } from "@/components/motion/ScrollReveal"
import { TextEffect } from "@/components/core/text-effect"

export function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-10">
              <TextEffect per="char" preset="rise">Projects</TextEffect>
            </h2>
          </ScrollReveal>
          
          <div className="bg-white/90 dark:bg-black/30 backdrop-blur-sm p-8 md:p-10 lg:p-12 border-[3px] border-black dark:border-white glitch-shadow hover:glitch-shadow-active transition-all duration-300">
            <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-white mb-6">
              Working on amazing stuff
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Coming soon...
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
