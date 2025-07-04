"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowDown, Code, Coffee, Heart } from "lucide-react"
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
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-4 md:left-10 w-12 h-12 md:w-16 md:h-16 bg-blue-300 border-4 border-black animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-40 right-4 md:right-20 w-8 h-8 md:w-12 md:h-12 bg-pink-300 border-4 border-black rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-4 md:left-20 w-6 h-6 md:w-8 md:h-8 bg-yellow-300 border-2 border-black transform rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-20 right-4 md:right-10 w-16 h-4 md:w-20 md:h-6 bg-green-300 border-4 border-black animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto">
            {/* Main content grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 lg:mb-12">
              {/* Left side - Text content */}
              <div className="space-y-4 lg:space-y-6 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-2 lg:space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-tight">
                    Hello, I'm{" "}
                    <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default">
                      Roshani
                    </span>
                    <span className="inline-block animate-wave ml-2">👋</span>
                  </h1>
                </div>

                <div className="bg-white p-4 sm:p-6 lg:p-8 border-4 border-black glitch-shadow animate-glitch-shadow shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    A passionate <strong>Developer</strong> and <strong>Software Engineer</strong> who loves turning
                    complex problems into elegant solutions with code and creativity
                  </p>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-4 lg:space-x-6">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-black hover:bg-black hover:text-white p-2 lg:p-3 border-2 border-black hover:scale-110 transition-all duration-200"
                    onClick={() => window.open("https://github.com/roshanichede", "_blank")}
                  >
                    <Github size={24} className="lg:w-7 lg:h-7" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-black hover:bg-black hover:text-white p-2 lg:p-3 border-2 border-black hover:scale-110 transition-all duration-200"
                    onClick={() => window.open("https://linkedin.com/in/roshanichede", "_blank")}
                  >
                    <Linkedin size={24} className="lg:w-7 lg:h-7" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-black hover:bg-black hover:text-white p-2 lg:p-3 border-2 border-black hover:scale-110 transition-all duration-200"
                    onClick={() => window.open("mailto:chederoshani@gmail.com", "_blank")}
                  >
                    <Mail size={24} className="lg:w-7 lg:h-7" />
                  </Button>
                </div>
              </div>

              {/* Right side - Photo */}
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="relative group">
                  {/* Main photo container */}
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <img
                      src="/profilepicture.JPG?height=500&width=500"
                      alt="Roshani - Profile Photo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Cool icons around the photo */}
                  <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-10 h-10 lg:w-12 lg:h-12 bg-yellow-300 border-4 border-black transform rotate-12 group-hover:rotate-45 transition-transform duration-300 flex items-center justify-center">
                    <Code size={16} className="lg:w-5 lg:h-5" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 w-8 h-8 bg-pink-300 border-4 border-black rounded-full group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
                    <Heart size={12} className="lg:w-4 lg:h-4" />
                  </div>
                  <div className="absolute top-1/2 -left-4 lg:-left-6 w-5 h-12 lg:w-6 lg:h-16 bg-blue-300 border-4 border-black transform -rotate-12 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
                    <Coffee size={12} className="lg:w-4 lg:h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action button - centered below */}
            <div className="text-center">
              <Button
                onClick={scrollToContact}
                className="bg-green-400 text-black font-bold px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 hover:scale-105"
              >
                Let's Connect!
                <ArrowDown className="ml-2 animate-bounce lg:w-5 lg:h-5" size={18}/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
