"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Coffee,
  Sparkles,
  Zap,
  Download,
} from "lucide-react"
import { MagneticButton } from "@/components/motion/MagneticButton"
import { Marquee } from "@/components/motion/Marquee"

const EASE = [0.16, 1, 0.3, 1] as const

const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
}

const charRise: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
}

const wordRise: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
}

const fadeUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

function KineticText({
  text,
  className,
  letterClassName,
}: {
  text: string
  className?: string
  letterClassName?: string
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          aria-hidden
        >
          <motion.span
            variants={charRise}
            className={`inline-block will-change-transform ${letterClassName ?? ""}`}
            whileHover={{ y: -8, rotate: -6, transition: { duration: 0.35, ease: EASE } }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function WordReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={wordRise} className="inline-block will-change-transform">
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  // Photo tilt on mouse move
  const photoRef = useRef<HTMLDivElement>(null)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const sTiltX = useSpring(tiltX, { stiffness: 140, damping: 14 })
  const sTiltY = useSpring(tiltY, { stiffness: 140, damping: 14 })
  const rotX = useTransform(sTiltY, [-1, 1], [8, -8])
  const rotY = useTransform(sTiltX, [-1, 1], [-8, 8])

  const onPhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    tiltX.set(((e.clientX - r.left) / r.width) * 2 - 1)
    tiltY.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const resetTilt = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-[92vh] flex items-center justify-center pt-20 pb-10 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-slate-900"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute -top-16 -left-12 h-72 w-72 rounded-full bg-fuchsia-300/25 dark:bg-fuchsia-400/18 blur-3xl animate-chaos-a"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
          className="absolute top-20 right-0 h-80 w-80 rounded-full bg-cyan-300/25 dark:bg-cyan-400/18 blur-3xl animate-chaos-b"
        />
        <div className="absolute -top-20 right-1/4 h-72 w-72 border-4 border-black/15 dark:border-white/20 rounded-full animate-spin-warp" />
        <div
          className="absolute bottom-[-120px] right-[-80px] h-96 w-96 border-2 border-black/10 dark:border-white/15 rounded-full animate-spin-warp"
          style={{ animationDuration: "28s" }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px, 28px 28px",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto"
        >
          {/* Welcome badge */}
          <motion.div variants={fadeUp} className="text-center mb-8">
            <div className="inline-flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 text-black/70 dark:text-white/70" />
              </motion.span>
              <span className="text-base sm:text-lg font-bold tracking-[0.18em] uppercase text-black dark:text-white">
                Welcome to my world
              </span>
              <motion.span
                animate={{ rotate: [0, -20, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 text-black/70 dark:text-white/70" />
              </motion.span>
            </div>
            <div className="mx-auto mt-3 h-[2px] w-40 bg-gradient-to-r from-transparent via-black/50 to-transparent dark:via-white/50" />
          </motion.div>

          {/* Desktop: photo left, content right */}
          <motion.div
            style={{ y: yText }}
            className="hidden lg:grid lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)] lg:gap-12 xl:gap-16 lg:items-center"
          >
            {/* Photo */}
            <motion.div
              style={{ y: yPhoto }}
              className="flex justify-center lg:justify-start"
            >
              <motion.div
                ref={photoRef}
                onMouseMove={onPhotoMove}
                onMouseLeave={resetTilt}
                style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
                initial={{ opacity: 0, x: 80, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
                className="relative group"
              >
                <div className="w-80 h-80 bg-white dark:bg-zinc-900 border-[6px] border-black dark:border-white shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] dark:shadow-[14px_14px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-[18px_18px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[18px_18px_0px_0px_rgba(255,255,255,1)] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">
                  <img
                    src="/profilepicture.JPG?height=500&width=500"
                    alt="Roshani — Profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating decor */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [12, 18, 12] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-5 -left-5 w-14 h-14 bg-blue-400 border-4 border-black dark:border-white flex items-center justify-center"
                >
                  <Coffee className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-5 -right-5 w-12 h-12 bg-green-400 border-4 border-black dark:border-white rounded-full flex items-center justify-center"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Name + description + CTAs */}
            <div className="space-y-7">
              <div>
                <motion.span
                  variants={fadeUp}
                  className="block text-2xl xl:text-3xl font-bold text-black/55 dark:text-white/55 mb-1 tracking-tight"
                >
                  Hello, I'm
                </motion.span>
                <h1 className="text-7xl xl:text-8xl 2xl:text-9xl font-black text-black dark:text-white leading-[0.95] tracking-tight">
                  <KineticText text="Roshani" className="block" />
                </h1>
              </div>

              <motion.p
                variants={containerStagger}
                className="text-lg xl:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium max-w-2xl"
              >
                <WordReveal text="A passionate Developer and Software Engineer who loves turning complex problems into elegant solutions with code and creativity." />
              </motion.p>

              {/* Socials + CTAs — left-aligned inside right column */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
                <MagneticButton strength={0.3}>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-6 py-3 text-base border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-200"
                  >
                    Let's Create Something Amazing!
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowDown size={20} />
                    </motion.span>
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.3}>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white font-bold px-6 py-3 text-base border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-200"
                  >
                    <Download size={20} />
                    Resume
                  </a>
                </MagneticButton>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com/roshanichede" },
                  { icon: Linkedin, href: "https://linkedin.com/in/roshanichede" },
                  { icon: Mail, href: "mailto:chederoshani@gmail.com" },
                ].map(({ icon: Icon, href }) => (
                  <MagneticButton key={href} strength={0.45}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black p-3 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-300"
                    >
                      <Icon size={22} />
                    </a>
                  </MagneticButton>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white leading-tight mb-6">
              <motion.span variants={fadeUp} className="block text-2xl font-bold text-black/60 dark:text-white/60 mb-2">
                Hello, I'm
              </motion.span>
              <KineticText text="Roshani" />
              <span className="inline-block ml-3 text-5xl animate-wave">🙋🏻‍♀️</span>
            </h1>

            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <div className="relative group">
                <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white dark:bg-zinc-900 border-[6px] border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
                  <img
                    src="/profilepicture.JPG?height=500&width=500"
                    alt="Roshani — Profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={containerStagger}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto"
            >
              <WordReveal text="A passionate Developer and Software Engineer who loves turning complex problems into elegant solutions." />
            </motion.p>
          </div>

          {/* Social + CTA — mobile only (desktop version is inside right column above) */}
          <motion.div variants={fadeUp} className="lg:hidden text-center space-y-5">
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: Github, href: "https://github.com/roshanichede" },
                { icon: Linkedin, href: "https://linkedin.com/in/roshanichede" },
                { icon: Mail, href: "mailto:chederoshani@gmail.com" },
              ].map(({ icon: Icon, href }) => (
                <MagneticButton key={href} strength={0.45}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-300"
                  >
                    <Icon size={26} />
                  </a>
                </MagneticButton>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton strength={0.3}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-6 py-3 text-base border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-200"
                >
                  Let's Create Something Amazing!
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowDown size={20} />
                  </motion.span>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.3}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white font-bold px-6 py-3 text-base border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-200"
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-3 left-0 right-0 z-0">
        <Marquee speed={40} className="py-1">
          {["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", ".NET", "PL/SQL", "Python"].map((t) => (
            <span key={t} className="text-xs font-semibold tracking-widest uppercase text-black/60 dark:text-white/60">
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
