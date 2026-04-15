"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Linkedin, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)
    setSubmitError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage(data.message)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitError(data.error || "Something went wrong")
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section ref={sectionRef} id="contact" className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-12 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            Let's Work Together
          </h2>

          <div className="flex flex-col items-center space-y-8">
            {/* Contact Form */}
            <div
              className={`w-full max-w-2xl bg-white dark:bg-zinc-900 p-6 lg:p-8 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-2 border-black dark:border-white font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 focus:border-black dark:focus:border-white hover:scale-105 transition-transform duration-200 bg-white dark:bg-zinc-800 text-black dark:text-white"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-2 border-black dark:border-white font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 focus:border-black dark:focus:border-white hover:scale-105 transition-transform duration-200 bg-white dark:bg-zinc-800 text-black dark:text-white"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border-2 border-black dark:border-white font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 focus:border-black dark:focus:border-white resize-none hover:scale-105 transition-transform duration-200 bg-white dark:bg-zinc-800 text-black dark:text-white"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-400 text-black font-bold py-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2" size={20} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {submitMessage && (
              <div className="mt-4 p-4 bg-green-100 border-2 border-green-500 text-green-800 rounded">
                {submitMessage}
              </div>
            )}

            {submitError && (
              <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 text-red-800 rounded">{submitError}</div>
            )}

            {/* Social Links */}
            <div
              className={`flex items-center space-x-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Button
                variant="ghost"
                size="lg"
                className="text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black p-3 border-2 border-black dark:border-white hover:scale-110 transition-all duration-200"
                onClick={() => window.open("https://linkedin.com/in/roshanichede", "_blank")}
              >
                <Linkedin size={28} />
              </Button>
              {/* <Button
                variant="ghost"
                size="lg"
                className="text-black hover:bg-black hover:text-white p-3 border-2 border-black hover:scale-110 transition-all duration-200"
                onClick={() => window.open("https://github.com/yourusername", "_blank")}
              >
                <Github size={28} />
              </Button> */}
              <Button
                variant="ghost"
                size="lg"
                className="text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black p-3 border-2 border-black dark:border-white hover:scale-110 transition-all duration-200"
                onClick={() => window.open("mailto:chederoshani@gmail.com", "_blank")}
              >
                <Mail size={28} />
              </Button>
            </div>

            <div
              className={`text-center text-gray-600 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: "600ms" }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300">Got a vision? Let’s fuse code and creativity, Let's connect!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
