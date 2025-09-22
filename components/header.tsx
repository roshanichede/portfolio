"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    console.log("Scrolling to section:", sectionId, element)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-black/70 backdrop-blur-sm border-b-4 border-black dark:border-white"
          : "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border-b-4 border-black dark:border-white"
      }`}
    >
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <button className="text-xl dark:text-white lg:text-2xl font-black text-black hover:scale-105 transition-transform cursor-pointer" onClick={() => scrollToSection("hero")}>
            PORTFOLIO
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {["about", "skills", "experience", "projects", "contact"].map((item) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item)}
                variant="ghost"
                className="text-black dark:text-white font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 uppercase hover:scale-105 text-sm lg:text-base border-2 border-black dark:border-white rounded-xl hover:border-white dark:hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                {item}
              </Button>
            ))}

            {/* Theme Toggle (Desktop) */}
            {isMounted && (
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="ml-2 text-black dark:text-white border-2 border-black dark:border-white rounded-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            className="md:hidden text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 z-[110] border-2 border-black dark:border-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation - Fixed positioning to avoid content overlap */}
        <div
          className={`md:hidden fixed left-0 right-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border-b-4 border-black dark:border-white transition-all duration-300 z-[105] ${
            isMenuOpen ? "top-[70px] opacity-100 visible" : "top-[-300px] opacity-0 invisible"
          }`}
        >
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {["about", "skills", "experience", "projects", "contact"].map((item, index) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item)}
                variant="ghost"
                className="w-full text-black dark:text-white font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black uppercase justify-start transition-all duration-200 text-left border-2 border-transparent hover:border-black dark:hover:border-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </Button>
            ))}

            {/* Theme Toggle (Mobile) */}
            {isMounted && (
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="w-full text-black dark:text-white font-bold hover:bg-black dark:hover:bg.White hover:text-white dark:hover:text-black uppercase justify-start transition-all duration-200 text-left border-2 border-transparent hover:border-black dark:hover:border-white"
              >
                {theme === "dark" ? (
                  <div className="flex items-center gap-2"><Sun size={18} /> Light mode</div>
                ) : (
                  <div className="flex items-center gap-2"><Moon size={18} /> Dark mode</div>
                )}
              </Button>
            )}
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
