"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Camera, Music, Code } from "lucide-react"

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
      className="py-16 lg:py-20 relative overflow-hidden"
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
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-12 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            About Me
          </h2>

          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="bg-white/90 dark:bg-black/30 backdrop-blur-sm p-6 sm:p-8 lg:p-12 border-4 border-black dark:border-white glitch-shadow hover:glitch-shadow-active transition-all duration-300 group">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-white group-hover:scale-105 transition-transform duration-300">
                  Creative Developer & Problem Solver
                </h3>
                <div className="space-y-4 text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    I write code because I enjoy untangling tricky problems and turning ideas into real, working things. 
                    Clean, readable code matters to me and I’m always excited to dive into something new.
                  </p>
                  <p>
                    For over four years, I’ve worked in with PL/SQL and . NET, building secure web services, authoring complex stored procedures, and keeping production systems running smoothly. 
                    Now I’m exploring full-stack development with React and Next.js, learning as I build.
                  </p>
                  <p>
                    Off the clock, you’ll find me diving into new tech, exploring new places, or just designing for fun!
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
        </div>
      </div>
    </section>
  )
}
