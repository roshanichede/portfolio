"use client"

import { ReactNode } from "react"

type MarqueeProps = {
  children: ReactNode
  speed?: number // pixels per second
  className?: string
}

export function Marquee({ children, speed = 60, className }: MarqueeProps) {
  const duration = 1000 * (1000 / speed) // rough conversion for tailwind-free inline animation
  return (
    <div className={`relative overflow-hidden marquee-mask gpu ${className || ""}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${duration}ms linear infinite`,
          willChange: "transform",
        }}
      >
        <div className="flex items-center gap-6 pr-6">{children}</div>
        <div className="flex items-center gap-6 pr-6" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Marquee


