"use client"

import { ReactNode } from "react"
import { motion, Variants } from "framer-motion"

type ScrollRevealProps = {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
}

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function ScrollReveal({ children, delay = 0, duration = 0.45, y = 12 }: ScrollRevealProps) {
  return (
    <motion.div
      className="gpu"
      style={{ display: "inline-block" }}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      // allow per-instance y override while keeping variants clean
      custom={y}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal


