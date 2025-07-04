"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]"
          : "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
    >
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl lg:text-2xl font-black text-black hover:scale-105 transition-transform cursor-pointer">
            PORTFOLIO
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {["about", "skills", "experience", "projects", "contact"].map((item) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item)}
                variant="ghost"
                className="text-black font-bold hover:bg-black hover:text-white transition-all duration-200 uppercase hover:scale-105 text-sm lg:text-base border-2 border-transparent hover:border-black"
              >
                {item}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            className="md:hidden text-black hover:bg-black hover:text-white transition-all duration-200 z-[110] border-2 border-black"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation - Fixed positioning to avoid content overlap */}
        <div
          className={`md:hidden fixed left-0 right-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-b-4 border-black transition-all duration-300 z-[105] ${isMenuOpen ? "top-[70px] opacity-100 visible" : "top-[-300px] opacity-0 invisible"
            }`}
        >
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {["about", "skills", "experience", "projects", "contact"].map((item, index) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item)}
                variant="ghost"
                className="w-full text-black font-bold hover:bg-black hover:text-white uppercase justify-start transition-all duration-200 text-left border-2 border-transparent hover:border-black"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </Button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-[90]" onClick={() => setIsMenuOpen(false)} />
        )}
      </div>
    </header>
  )
}
