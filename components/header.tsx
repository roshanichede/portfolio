"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, Feather, Shapes } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/motion/ScrollReveal"
import { useTheme } from "next-themes"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [styleMode, setStyleMode] = useState<"brutal" | "simple">("brutal")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("style-mode")) as
      | "brutal"
      | "simple"
      | null
    const mode = saved === "simple" ? "simple" : "brutal"
    setStyleMode(mode)
    document.documentElement.dataset.style = mode
  }, [])

  const toggleStyleMode = () => {
    const next = styleMode === "simple" ? "brutal" : "simple"
    setStyleMode(next)
    document.documentElement.dataset.style = next
    try {
      localStorage.setItem("style-mode", next)
    } catch {}
  }

  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "experience", "projects", "contact"]
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Determine which section is currently near the top
      let current: string = "hero"
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const isInView = rect.top <= 120 && rect.bottom >= 120
        if (isInView) {
          current = id
          break
        }
      }
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
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
        <div className="flex items-center">
          <button className="text-xl dark:text-white lg:text-2xl font-black text-black hover:scale-105 transition-transform cursor-pointer" onClick={() => scrollToSection("hero")}>
            PORTFOLIO
          </button>

          {/* Desktop Navigation centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-1 lg:space-x-2">
              {["about", "skills", "experience", "projects", "contact"].map((item, idx) => (
                <ScrollReveal key={item} delay={idx * 0.05}>
                  <Button
                    onClick={() => scrollToSection(item)}
                    variant="ghost"
                    aria-current={activeSection === item ? "page" : undefined}
                    className={`text-black dark:text-white transition-all duration-200 uppercase hover:scale-105 text-sm lg:text-base border-2 border-black dark:border-white rounded-xl hover:border-white dark:hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] font-[family-name:var(--font-yusei)] ${
                      activeSection === item
                        ? "bg-white text-black dark:bg-zinc-900 dark:text-white ring-2 ring-black dark:ring-white"
                        : "hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                    }`}
                  >
                    {item}
                  </Button>
                </ScrollReveal>
              ))}
            </nav>
          </div>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-2">
            {isMounted && (
              <>
                <Button
                  variant="ghost"
                  onClick={toggleStyleMode}
                  aria-label={styleMode === "simple" ? "Switch to bold style" : "Love simplicity?"}
                  title={styleMode === "simple" ? "Back to bold" : "Love simplicity?"}
                  className="hidden md:inline-flex items-center gap-2 text-black dark:text-white border-2 border-black dark:border-white rounded-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  {styleMode === "simple" ? <Shapes size={18} /> : <Feather size={18} />}
                  <span className="text-xs font-semibold hidden lg:inline">
                    {styleMode === "simple" ? "Bold" : "Simple"}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="hidden md:inline-flex text-black dark:text-white border-2 border-black dark:border-white rounded-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              </>
            )}
          </div>
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
              <ScrollReveal key={item} delay={index * 0.05}>
                <Button
                  onClick={() => scrollToSection(item)}
                  variant="ghost"
                  aria-current={activeSection === item ? "page" : undefined}
                  className={`w-full text-black dark:text-white uppercase justify-start transition-all duration-200 text-left border-2 border-transparent hover:border-black dark:hover:border-white font-[family-name:var(--font-yusei)] ${
                    activeSection === item
                      ? "bg-white text-black dark:bg-zinc-900 dark:text-white ring-2 ring-black dark:ring-white"
                      : "hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                  }`}
                >
                  {item}
                </Button>
              </ScrollReveal>
            ))}

            {/* Style Toggle (Mobile) */}
            {isMounted && (
              <Button
                variant="ghost"
                onClick={toggleStyleMode}
                aria-label="Toggle style"
                className="w-full text-black dark:text-white font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black uppercase justify-start transition-all duration-200 text-left border-2 border-transparent hover:border-black dark:hover:border-white"
              >
                {styleMode === "simple" ? (
                  <div className="flex items-center gap-2"><Shapes size={18} /> Bold mode</div>
                ) : (
                  <div className="flex items-center gap-2"><Feather size={18} /> Love simplicity?</div>
                )}
              </Button>
            )}

            {/* Theme Toggle (Mobile) */}
            {isMounted && (
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="w-full text-black dark:text-white font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black uppercase justify-start transition-all duration-200 text-left border-2 border-transparent hover:border-black dark:hover:border-white"
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
