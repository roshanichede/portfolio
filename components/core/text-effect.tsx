"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"

type TextEffectProps = {
  children: string
  per?: "char" | "word"
  preset?: "fade" | "rise"
  delay?: number
  duration?: number
  className?: string
  start?: boolean
}

export function TextEffect({
  children,
  per = "char",
  preset = "fade",
  delay = 0,
  duration = 0.5,
  className,
}: TextEffectProps) {
  const { start = true } = arguments[0] as TextEffectProps
  const items = per === "word" ? children.split(/(\s+)/) : [...children]
  const getInitial = () => (preset === "rise" ? { opacity: 0, y: 12 } : { opacity: 0 })
  const getAnimate = () => ({ opacity: 1, y: 0 })

  if (!start) {
    return <span className={className}>{children}</span>
  }

  return (
    <span className={className} aria-label={children}>
      {items.map((ch, index) => (
        <Fragment key={index}>
          {ch === " " ? (
            " "
          ) : (
            <motion.span
              initial={getInitial()}
              animate={getAnimate()}
              transition={{ delay: delay + index * 0.03, duration, ease: "easeOut" }}
              style={{ display: "inline-block" }}
            >
              {ch}
            </motion.span>
          )}
        </Fragment>
      ))}
    </span>
  )
}

export default TextEffect


