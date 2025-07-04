"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowDown, Code, Coffee, Sparkles, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-8 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Subtle background dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-black rounded-full animate-ping opacity-20"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto">
            {/* Welcome badge - centered on mobile, left-aligned on desktop */}
            <div className="text-center  mb-8">
              <div className="inline-flex items-center gap-3 bg-yellow-200 px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:rotate-1 transition-transform duration-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wide">Welcome to my world</span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Desktop Layout: Photo left, Content right */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:mb-12">
              {/* Left: Profile Photo */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="w-80 h-80 bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    <img
                      src="/profilepicture.JPG?height=500&width=500"
                      alt="Roshani - Profile Photo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Decorative elements around photo */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-400 border-4 border-black transform rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-green-400 border-4 border-black rounded-full group-hover:scale-125 group-hover:rotate-180 transition-all duration-300 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-8 bg-pink-400 border-4 border-black transform -rotate-12 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-purple-400 border-4 border-black transform rotate-45 group-hover:-rotate-45 group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Right: Name and Description */}
              <div className="space-y-6">
                {/* Name */}
                <h1 className="text-5xl xl:text-7xl font-black text-black leading-tight">
                  <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">
                    Hello, I'm
                  </span>
                  <br />
                  <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
                    Roshani
                  </span>
                  <span className="inline-block ml-4 text-5xl">🙋🏻‍♀️</span>
                </h1>

                {/* Description */}
                <div className="max-w-xl">
                  <p className="text-lg xl:text-xl text-gray-700 leading-relaxed font-medium">
                    A passionate <strong className="text-black">Developer</strong> and{" "}
                    <strong className="text-black">Software Engineer</strong> who loves turning complex problems into
                    elegant solutions with code and creativity
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Layout: Centered */}
            <div className="lg:hidden text-center mb-8">
              {/* Name */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black leading-tight mb-6">
                <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">
                  Hello, I'm
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
                  Roshani
                </span>
                <span className="inline-block ml-4 text-5xl animate-wave">🙋🏻‍♀️</span>
              </h1>

              {/* Photo */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    <img
                      src="/profilepicture.JPG?height=500&width=500"
                      alt="Roshani - Profile Photo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Decorative elements around photo */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-400 border-4 border-black transform rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-green-400 border-4 border-black rounded-full group-hover:scale-125 group-hover:rotate-180 transition-all duration-300 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-8 bg-pink-400 border-4 border-black transform -rotate-12 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-purple-400 border-4 border-black transform rotate-45 group-hover:-rotate-45 group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-2xl mx-auto mb-8">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  A passionate <strong className="text-black">Developer</strong> and{" "}
                  <strong className="text-black">Software Engineer</strong> who loves turning complex problems into
                  elegant solutions with code and creativity
                </p>
              </div>
            </div>

            {/* Social links and CTA - centered for both layouts */}
            <div className="text-center space-y-6">
              {/* Social buttons */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-white text-black hover:bg-black hover:text-white p-4 border-4 border-black hover:scale-110 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  onClick={() => window.open("https://github.com/yourusername", "_blank")}
                >
                  <Github size={28} />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-white text-black hover:bg-black hover:text-white p-4 border-4 border-black hover:scale-110 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  onClick={() => window.open("https://linkedin.com/in/yourusername", "_blank")}
                >
                  <Linkedin size={28} />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-white text-black hover:bg-black hover:text-white p-4 border-4 border-black hover:scale-110 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  onClick={() => window.open("mailto:your.email@example.com", "_blank")}
                >
                  <Mail size={28} />
                </Button>
              </div>

              {/* CTA button */}
              <div>
                <Button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-8 py-4 text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    Let's Create Something Amazing!
                    <ArrowDown className="animate-bounce" size={20} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
