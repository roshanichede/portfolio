"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "ABCDEFGHIKLMNOPQRSTUVWXYZ1234567890!@#$%^&*".split("")

type TextScrambleProps = {
  text: string
  duration?: number
  className?: string
}

export function TextScramble({ text, duration = 800, className }: TextScrambleProps) {
  const [display, setDisplay] = useState(text)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef(text)

  useEffect(() => {
    fromRef.current = display
    startRef.current = null
    const step = (t: number) => {
      if (!startRef.current) startRef.current = t
      const p = Math.min(1, (t - startRef.current) / duration)
      const next = text
        .split("")
        .map((c, i) => (Math.random() < p ? c : CHARS[(Math.random() * CHARS.length) | 0]))
        .join("")
      setDisplay(next)
      if (p < 1) requestAnimationFrame(step)
      else setDisplay(text)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [text, duration])

  return <span className={className}>{display}</span>
}

export default TextScramble


