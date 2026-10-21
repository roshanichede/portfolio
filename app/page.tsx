"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const OUT = [0.22, 1, 0.36, 1] as const;

const EMAIL = "chederoshani@gmail.com";
const GITHUB = "https://github.com/roshanichede";
const LINKEDIN = "https://www.linkedin.com/in/roshanichede/";
const CV = "/resume.pdf";

type Project = {
  name: string;
  kind: string;
  year: string;
  short: string;
  why: string;
  who: string;
  what: string;
  decisions: string[];
  outcome?: string;
  later?: string[];
  tech: string[];
  live?: string;
  code?: string;
  video?: string;
  // screenshots: the first is the tile cover, the rest show in the case study
  shots?: string[];
  art: "money" | "slides" | "terminal" | "gesture";
};

const projects: Project[] = [
  {
    name: "MoneyMap",
    kind: "Personal finance app",
    year: "2026",
    short: "See where your money went, without linking your bank",
    why: "Lloyds doesn’t email transaction alerts, has no personal API and caps its CSV export at 150 rows. Meanwhile, UK budgeting apps that depend on bank linking keep shutting down: Yolt in 2021, Money Dashboard in 2023, Moneyhub’s consumer app in 2026. People who want to understand their spending are left with spreadsheets.",
    who: "UK bank customers, starting with Lloyds, Halifax and Bank of Scotland, who don’t want to hand their bank login to a third party.",
    what: "Upload the CSV exports or PDF statements you already have, from one account or several. MoneyMap sorts every payment, keeps transfers between your own accounts out of your spending, finds your regular bills and answers questions in plain English.",
    decisions: [
      "Numbers come from SQL, words from the model. Claude only explains figures that were already calculated, and if its reply contains a £ amount or % that isn’t in those facts, the answer is thrown out. A wrong total is worse than no answer.",
      "Files instead of bank linking. No open-banking dependency means no shutdown risk. Statements are read in memory and discarded, and only the last four digits of an account number are kept.",
      "Earn trust by reconciling. Every file is checked to the penny (opening balance + transactions = closing balance), and overlapping uploads are counted once.",
      "Learn from the user. 200+ UK merchant keywords cover the common cases. For the personal rest, it asks about unsure payments biggest first and previews every rule before saving it.",
      "Read earnings honestly. A flatmate’s share of the rent is taken off your rent, not counted as income.",
    ],
    outcome: "Live demo with sample data, backed by 78 automated tests covering the parsers, reconciliation, transfer matching and the chat guardrail.",
    later: ["Open-banking sync", "Budgets and alerts", "Mobile app", "Shared households"],
    tech: ["Next.js", "FastAPI", "Postgres", "Auth.js", "Claude API"],
    live: "https://money-map-ruddy.vercel.app",
    shots: ["/shots/moneymap.jpg"],
    code: "https://github.com/roshanichede/money-map",
    art: "money",
  },
  {
    name: "AI Slide Enhancer",
    kind: "MSc dissertation",
    year: "2025",
    short: "Upload a deck, get a better one back",
    why: "Most people can tell a slide is weak but don’t know how to fix it, and polishing a deck by hand takes hours.",
    who: "Students and professionals who present often but aren’t designers.",
    what: "You upload a PowerPoint or PDF and it rewrites the weak slides, shows you a before and after, and can read the new version out loud.",
    decisions: [
      "Always show something. Slide previews come from Google Drive’s API in under a second, fall back to LibreOffice (about 30 seconds), then to a basic render. Users are never left with a blank screen.",
      "No single point of failure. It uses OpenAI and switches to Gemini on its own if OpenAI is down or rate limited.",
      "Before and after, side by side, so people judge the change themselves instead of trusting the AI blindly.",
      "User testing changed the priorities. People were waiting too long for results, so I added caching before adding any more features.",
    ],
    outcome: "Graded Distinction as my MSc dissertation at the University of Leicester.",
    tech: ["Next.js", "Python", "Flask", "Supabase", "OpenAI", "Gemini"],
    shots: ["/shots/slides-grid.jpg", "/shots/slides-home.jpg", "/shots/slides-enhance.jpg"],
    code: "https://github.com/roshanichede/slide-enhancer",
    art: "slides",
  },
  {
    name: "PyCoder",
    kind: "AI coding agent",
    year: "2026",
    short: "A coding agent for your terminal that never acts without asking",
    why: "Developers don’t trust AI agents that change code behind their back, so they either avoid them or babysit every step.",
    who: "Developers who want AI help in the terminal but need to stay in control, and anyone who wants to learn how coding agents work inside.",
    what: "You describe a task in plain English, like “add type hints to utils.py” or “why is this test failing?”, and PyCoder works through it: reading files, searching the code, making edits and running your tests until it’s done.",
    decisions: [
      "Nothing changes without your OK. Every edit shows up as a coloured diff, and every command is shown before it runs.",
      "Everything is undoable. /undo puts back every file the last request touched.",
      "You see everything as it happens. Replies stream in word by word and every tool call is printed as it runs.",
      "Readable over clever. No framework: one loop, eight tools and about 1,100 lines of Python you can read in an afternoon.",
    ],
    outcome: "I use it as a daily helper. Trust turned out to be the product: approval before every change and one-step undo make it safe to hand over real tasks.",
    tech: ["Python", "Claude API", "CLI"],
    code: "https://github.com/roshanichede/pycoder-agent",
    art: "terminal",
  },
  {
    name: "Gesture Workspace",
    kind: "Mac app",
    year: "2025",
    short: "Control your Mac with hand gestures",
    why: "Switching your Mac between work modes means digging through menus and shortcuts, which breaks your focus.",
    who: "Mac users who want hands-free control of their workspace.",
    what: "A menu bar app that watches for hand gestures through the webcam. A peace sign toggles dark mode, an open palm toggles Focus, a fist toggles Do Not Disturb, and a one-finger swipe changes brightness.",
    decisions: [
      "Test the riskiest part first. It started as a browser prototype to prove gesture detection worked, and only became a menu bar app once it did.",
      "No accidental triggers. A gesture has to be held for a moment, and a release lock makes it fire once until you relax your hand.",
      "Extend without code. Gestures map to macOS Shortcuts in a JSON file, so adding a new action doesn’t need a developer.",
      "Respect the laptop. Camera tracking uses noticeable CPU, so monitoring can be paused from the menu bar.",
    ],
    outcome: "A working MVP that I use day to day. The video shows it in action.",
    later: ["Package as a proper .app", "Brightness without helper tools"],
    tech: ["Electron", "MediaPipe", "AppleScript"],
    code: "https://github.com/roshanichede/gesture-workspace-controls",
    video: "/gesture-workspace.mp4",
    art: "gesture",
  },
];

// smaller things, listed without a case study
const sideProjects = [
  { name: "Style It", line: "An AI stylist that builds outfits from your own wardrobe", href: "https://style-it.vercel.app" },
  { name: "Shangri-La Petitions", line: "A petition platform with separate dashboards for citizens and the committee", href: "https://slpp-dashboard.vercel.app" },
];

const jobs = [
  {
    when: "Apr 2026 to now",
    org: "EcoQuick",
    role: "Freelance product engineer",
    tags: ["0 to 1 launch", "Two-sided marketplace", "Feature proposals"],
    line: "An eco-courier startup. I took their delivery marketplace from idea to a live product with the founder.",
    points: [
      "Took a two-sided delivery marketplace from idea to a live product with the founder, replacing a fully manual booking and dispatch process with online booking, Stripe payments and self-serve job claiming. Now onboarding the first customers and drivers.",
      "Proposed upfront dynamic pricing, live order tracking and a driver job-claim system, so customers knew the cost and status of every order and drivers could choose their own jobs. The founder adopted all three as core features.",
      "Modelled the order lifecycle as one shared state model (pending → assigned → picked up → in transit → delivered) to end confusion between the founder, drivers and code over what each status meant, giving every feature a single reference.",
      "Spotted that two drivers could accept the same job and made job claims atomic before launch, removing a double-booking risk that would have hurt customer trust.",
    ],
  },
  {
    when: "Feb to Mar 2026",
    org: "Samko Holdings",
    role: "Product and data consultant, freelance",
    tags: ["User interviews", "Process automation", "KPI dashboards"],
    line: "Leadership interviews showed month-end reporting was always late. I automated it and gave them one place to track operations.",
    points: [
      "Replaced five people’s manual month-end reporting with automated syncs across QuickBooks, Coupler.io, Excel and Power Automate, after leadership interviews showed the process was always late.",
      "Shipped a live KPI dashboard, validated with its users, so leadership could track operations in one place.",
    ],
  },
  {
    when: "Oct 2020 to Aug 2024",
    org: "Tata Consultancy Services",
    role: "Systems engineer, insurance (BFSI)",
    tags: ["Requirements and grooming", "Prioritisation", "Stakeholder coordination"],
    awards: [
      { name: "Star of the Month, twice", href: "#media" },
      { name: "Star Team Award", href: "/media/tcs-star-team.pdf" },
      { name: "On the Spot Team Award", href: "/media/tcs-on-the-spot-team.pdf" },
      { name: "Special Initiative Award, twice", href: "#media" },
    ] as Award[],
    line: "Four years on an insurance platform managing 30M+ policies, owning a module end to end and leading a browser migration.",
    points: [
      "Owned the Accounts module end to end on an insurance platform managing 30M+ policies, turning business-analyst documents into development tasks and refining requirements in grooming so releases matched business needs. Cut query time by 60% and defect recurrence by 70% at 99.9% uptime.",
      "Led the IE-to-Chrome migration with a core team of three, coordinating 10+ engineers and triaging 400+ defects by user impact to move users off a retiring browser. Closed nearly all defects and earned the On the Spot Team Award.",
      "Diagnosed a policy-PDF bug that had blocked users for a year and a half, fixing it within a week and unblocking go-live.",
      "Stepped into the Corporate Policies team during personnel changes, supporting new product development and costing change requests with business analysts to keep delivery on track. Recognised with Star of the Month.",
    ],
  },
];

const ukJobs = [
  {
    lesson: "Understanding customers",
    role: "Retail Assistant",
    org: "Primark",
    quote: "The first question is rarely the real need.",
    points: [
      "Helped shoppers in a busy, high-volume store, asking one more question to find what they were really looking for.",
      "Noticed what people kept asking for and couldn't find, and saw how stock and layout shape their experience.",
    ],
  },
  {
    lesson: "Getting requirements right",
    role: "Crew Member",
    org: "McDonald's",
    quote: "Every order is a requirement. Get it exactly right.",
    points: [
      "Took and delivered orders at peak hours, where small details mattered as much as speed.",
      "Saw how a clear process turns what a customer asks for into what they get, quickly and correctly.",
    ],
  },
  {
    lesson: "Needs within constraints",
    role: "Relief Supervisor",
    org: "Admiral Slots",
    quote: "Listen first, then fix within the rules.",
    points: [
      "Handled customer escalations by finding out what the customer expected before deciding what to do.",
      "Balanced what customers wanted with rules that couldn't bend, like age checks and cash procedures, while leading teams across different venues.",
    ],
  },
];

const education = [
  { title: "MSc Advanced Computer Science", place: "University of Leicester", when: "Sept 2024 to Jan 2026", note: "Distinction" },
  { title: "BE Computer Engineering", place: "Goa University", when: "Aug 2016 to Aug 2020", note: "Gold medallist" },
];

// media section: files live in public/media. `thumb` is an image preview (for a PDF, its first page as a .jpg)
type MediaItem = { kind: "award" | "cert" | "photo"; title: string; caption?: string; src: string; thumb: string };
const media: MediaItem[] = [
  { kind: "photo", title: "MSc graduation, University of Leicester", caption: "Advanced Computer Science · Distinction", src: "/media/leicester-graduation.jpg", thumb: "/media/leicester-graduation.jpg" },
  { kind: "photo", title: "#LeicesterGrad", caption: "University of Leicester campus, graduation day", src: "/media/leicester-graduation-campus.jpg", thumb: "/media/leicester-graduation-campus.jpg" },
  { kind: "photo", title: "Gold Medal, Computer Engineering", caption: "Goa University Convocation · batch of 2020", src: "/media/goa-university-gold-medal.jpg", thumb: "/media/goa-university-gold-medal.jpg" },
  { kind: "award", title: "Star of the Month", caption: "TCS · for taking on the Corporate team role through personnel changes", src: "/media/tcs-star-of-the-month-corporate.pdf", thumb: "/media/tcs-star-of-the-month-corporate.jpg" },
  { kind: "award", title: "On the Spot Team Award", caption: "TCS · for closing almost a year of Chrome compatibility issues", src: "/media/tcs-on-the-spot-team.pdf", thumb: "/media/tcs-on-the-spot-team.jpg" },
  { kind: "award", title: "Star Team Award", caption: "TCS · nominated by Sachin Kale", src: "/media/tcs-star-team.pdf", thumb: "/media/tcs-star-team.jpg" },
  { kind: "award", title: "Star of the Month", caption: "TCS · farewell recognition from the Corporate team", src: "/media/tcs-star-of-the-month-farewell.pdf", thumb: "/media/tcs-star-of-the-month-farewell.jpg" },
  { kind: "award", title: "Special Initiative Award", caption: "TCS InfoSecurity Fest 2023 · winner, KBC Quiz 3", src: "/media/tcs-special-initiative-2023.pdf", thumb: "/media/tcs-special-initiative-2023.jpg" },
  { kind: "award", title: "Special Initiative Award", caption: "TCS InfoSecurity Fest 2022 · winner, Guess Me", src: "/media/tcs-special-initiative-2022.pdf", thumb: "/media/tcs-special-initiative-2022.jpg" },
  { kind: "cert", title: "Internship certificate", caption: "Creative Capsule, 2018 · student form in AngularJS", src: "/media/creative-capsule-internship.jpg", thumb: "/media/creative-capsule-internship.jpg" },
];

const mediaTabs = [
  { id: "all", label: "All" },
  { id: "award", label: "Awards" },
  { id: "cert", label: "Certificates" },
  { id: "photo", label: "Photos" },
] as const;

type Award = { name: string; href?: string };

const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C#", "SQL"] },
  { group: "Web", items: ["React", "Next.js", "Angular", "Tailwind"] },
  { group: "Backend", items: [".NET", "Node.js", "Flask", "Django"] },
  { group: "Data", items: ["PostgreSQL", "SQL Server", "Oracle", "Supabase"] },
  { group: "Cloud", items: ["AWS", "GCP", "Azure", "Docker", "Jenkins"] },
];

const stats = [
  { value: 4, suffix: "+", label: "Years shipping software" },
  { value: 30, suffix: "M+", label: "Policies on the platform where I owned a module" },
  { value: 400, suffix: "+", label: "Defects triaged by user impact in one migration" },
];

// how each project tile sits in the mosaic, in the same order as `projects`
const shapes = ["wide", "square", "square", "wide"] as const;

function SweepButton({ href, children, dark = true, external }: { href: string; children: React.ReactNode; dark?: boolean; external?: boolean }) {
  return (
    <a className={`sweep ${dark ? "sweep-dark" : "sweep-light"}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <span className="sweep-label">{children}</span>
    </a>
  );
}

function CopyEmail({ large = false }: { large?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <button className={`copy${large ? " copy-large" : ""}`} onClick={copy} aria-live="polite">
      <span className="copy-window">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={copied ? "y" : "n"} initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.4, ease: OUT }}>
            {copied ? "Copied to clipboard" : EMAIL}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="copy-hint">{copied ? "✓" : "Copy"}</span>
    </button>
  );
}

function Art({ kind, video, shot }: { kind: Project["art"]; video?: string; shot?: string }) {
  if (shot)
    return (
      <div className="art art-shot">
        <Image src={shot} alt="" fill sizes="(max-width: 760px) 100vw, 760px" />
      </div>
    );
  if (video)
    return (
      <div className="art art-video">
        <video src={video} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
      </div>
    );
  if (kind === "money")
    return (
      <div className="art art-money">
        <svg viewBox="0 0 300 160" preserveAspectRatio="none" aria-hidden="true">
          <path className="area" d="M0 130 C 40 120, 60 90, 100 96 S 160 60, 200 70 S 260 30, 300 24 L 300 160 L 0 160 Z" />
          <path d="M0 130 C 40 120, 60 90, 100 96 S 160 60, 200 70 S 260 30, 300 24" />
        </svg>
        <span className="chip a">Rent 38%</span>
        <span className="chip b">Food 21%</span>
      </div>
    );
  if (kind === "slides")
    return (
      <div className="art art-slides">
        <span className="slide back" />
        <span className="slide front">
          <i />
          <i />
          <i />
        </span>
        <b>✦</b>
      </div>
    );
  if (kind === "terminal")
    return (
      <div className="art art-terminal">
        <div className="term">
          <span className="term-dots">
            <i />
            <i />
            <i />
          </span>
          <code>
            <span className="t-you">You ❯</span> add type hints to utils.py
          </code>
          <code className="t-tool">● read_file utils.py</code>
          <code className="t-add">+ def total(items: list[float]) -&gt; float:</code>
          <code className="t-del">- def total(items):</code>
          <code>
            Apply this edit? <span className="t-you">[y/n]</span>
            <b className="caret" />
          </code>
        </div>
      </div>
    );
  return (
    <div className="art art-gesture">
      <span />
      <span />
      <span />
      <b>✋</b>
    </div>
  );
}

function Sheet({ index, onClose, onGo }: { index: number | null; onClose: () => void; onGo: (i: number) => void }) {
  const p = index !== null ? projects[index] : null;
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onGo((index + 1) % projects.length);
      if (e.key === "ArrowLeft") onGo((index - 1 + projects.length) % projects.length);
    };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [index, onClose, onGo]);

  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
  }, [index]);

  return (
    <AnimatePresence>
      {p && index !== null && (
        <>
          <motion.div className="backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={p.name}
            className="sheet"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 34 }}
          >
            <div className="sheet-top">
              <span className="kicker">
                0{index + 1} / 0{projects.length}
              </span>
              <button className="close" onClick={onClose} aria-label="Close">
                <span />
                <span />
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={index} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: OUT }}>
                <div className="sheet-art">
                  <Art kind={p.art} video={p.video} shot={p.shots?.[0]} />
                </div>
                <p className="kicker">
                  {p.kind} · {p.year}
                </p>
                <h3 className="sheet-title">{p.name}</h3>
                <p className="sheet-short">{p.short}</p>
                <div className="case-grid">
                  <div className="case">
                    <span className="case-label">Why it exists</span>
                    <p>{p.why}</p>
                  </div>
                  <div className="case">
                    <span className="case-label">Who it’s for</span>
                    <p>{p.who}</p>
                  </div>
                </div>
                <div className="case">
                  <span className="case-label">What it does</span>
                  <p>{p.what}</p>
                </div>
                {p.shots && p.shots.length > 1 && (
                  <div className="gallery">
                    {p.shots.slice(1).map((src) => (
                      <a key={src} href={src} target="_blank" rel="noreferrer" className="gallery-item">
                        <Image src={src} alt={`${p.name} screenshot`} fill sizes="300px" />
                      </a>
                    ))}
                  </div>
                )}
                <div className="case">
                  <span className="case-label">Key decisions and trade-offs</span>
                  <ol className="decisions">
                    {p.decisions.map((d, i) => (
                      <motion.li key={d} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: OUT }}>
                        {d}
                      </motion.li>
                    ))}
                  </ol>
                </div>
                {p.outcome && (
                  <div className="case case-outcome">
                    <span className="case-label">Outcome</span>
                    <p>{p.outcome}</p>
                  </div>
                )}
                {p.later && (
                  <div className="case">
                    <span className="case-label">Deliberately not yet</span>
                    <ul className="later">
                      {p.later.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <ul className="tags">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="sheet-links">
                  {p.live && (
                    <SweepButton href={p.live} external>
                      Try it live ↗
                    </SweepButton>
                  )}
                  {p.code && (
                    <SweepButton href={p.code} external dark={false}>
                      Read the code ↗
                    </SweepButton>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="sheet-nav">
              <button onClick={() => onGo((index - 1 + projects.length) % projects.length)}>← {projects[(index - 1 + projects.length) % projects.length].name}</button>
              <button onClick={() => onGo((index + 1) % projects.length)}>{projects[(index + 1) % projects.length].name} →</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Job({ job, i }: { job: (typeof jobs)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  const shown = job.points.slice(0, 2);
  const rest = job.points.slice(2);
  return (
    <motion.li className={`chrono${open ? " open" : ""}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.7, delay: i * 0.05, ease: OUT }}>
      <div className="chrono-top">
        <div>
          <h3>{job.role}</h3>
          <span className="chrono-org">{job.org}</span>
        </div>
        <span className="chrono-when">{job.when}</span>
      </div>
      <p className="chrono-line">{job.line}</p>
      {shown.length > 0 && (
        <ul className="impact">
          {shown.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="job-more" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: OUT }}>
            <ul className="impact">
              {rest.map((pt, k) => (
                <motion.li key={pt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 + k * 0.04, ease: OUT }}>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {"awards" in job && job.awards && (
        <div className="awards">
          {job.awards.map((a) =>
            a.href ? (
              <a key={a.name} href={a.href} {...(a.href.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" })}>
                ✦ {a.name} <i aria-hidden="true">↗</i>
              </a>
            ) : (
              <span key={a.name}>✦ {a.name}</span>
            ),
          )}
        </div>
      )}
      <div className="chrono-foot">
        <div className="skill-tags">
          {job.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {rest.length > 0 && (
          <button className="chrono-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Less" : `${rest.length} more`} <span className="plus" aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.li>
  );
}

const sections = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "uk", label: "Customers" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/* ───────────── small pieces ───────────── */

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.8, delay, ease: OUT }}>
      {children}
    </motion.div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((el) => io.observe(el));
    const top = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);
  return active;
}

// the theme is set before paint by the script in layout.tsx; this just mirrors and flips it
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };
  return { theme, toggle };
}

/* ───────────── dock ───────────── */

const ICONS: Record<string, React.ReactNode> = {
  top: <path d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4z" />,
  about: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  work: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="2" />
      <rect x="13" y="4" width="7" height="7" rx="2" />
      <rect x="4" y="13" width="7" height="7" rx="2" />
      <rect x="13" y="13" width="7" height="7" rx="2" />
    </>
  ),
  experience: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 13h17" />
    </>
  ),
  uk: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" />
      <path d="M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.6c1.6.6 2.7 2.1 3 4.4" />
    </>
  ),
  contact: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  moon: <path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z" />,
};

function DockItem({ mouseX, label, icon, href, onClick, on }: { mouseX: MotionValue<number>; label: string; icon: string; href?: string; onClick?: () => void; on?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const dist = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? x - b.x - b.width / 2 : Infinity;
  });
  const size = useSpring(useTransform(dist, [-130, 0, 130], [44, 64, 44]), { stiffness: 420, damping: 32 });
  const inner = (
    <>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {ICONS[icon]}
      </svg>
      <span className="dock-tip">{label}</span>
      {on && <motion.span layoutId="dock-dot" className="dock-dot" />}
    </>
  );
  const common = { className: "dock-item", style: { width: size, height: size }, "aria-label": label };
  return href ? (
    <motion.a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...common}>
      {inner}
    </motion.a>
  ) : (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} onClick={onClick} {...common}>
      {inner}
    </motion.button>
  );
}

function Dock() {
  const active = useActiveSection();
  const { theme, toggle } = useTheme();
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.nav className="dock-wrap" aria-label="Sections" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.8, ease: OUT }}>
      <div className="dock" onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)}>
        <DockItem mouseX={mouseX} label="Home" icon="top" href="#top" on={active === ""} />
        {sections.map((s) => (
          <DockItem key={s.id} mouseX={mouseX} label={s.label} icon={s.id} href={`#${s.id}`} on={active === s.id} />
        ))}
        <span className="dock-sep" aria-hidden="true" />
        <DockItem mouseX={mouseX} label={theme === "dark" ? "Light mode" : "Dark mode"} icon={theme === "dark" ? "sun" : "moon"} onClick={toggle} />
      </div>
    </motion.nav>
  );
}

/* ───────────── hero ───────────── */

// where each letter starts before it settles into the word
const SCATTER = [
  { x: -40, y: -90, r: -14 },
  { x: 0, y: 0, r: 0 },
  { x: 30, y: 110, r: 10 },
  { x: -20, y: -130, r: -8 },
  { x: 50, y: 80, r: 16 },
  { x: -30, y: -70, r: -12 },
  { x: 40, y: 120, r: 8 },
  { x: 20, y: -100, r: 0 },
];

// the word is drawn twice, each copy clipped to one half, so it can split apart on scroll
function Word({ half }: { half: "top" | "bottom" }) {
  const letter = (i: number) => ({
    initial: { opacity: 0, x: SCATTER[i].x, y: SCATTER[i].y, rotate: SCATTER[i].r },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    transition: { duration: 1.2, delay: 0.2 + i * 0.07, ease: OUT },
  });
  return (
    <span className={`word word-${half}`} aria-hidden="true">
      <motion.span className="glyph" style={{ "--i": 0 } as React.CSSProperties} {...letter(0)}>
        R
      </motion.span>
      <motion.span className="hero-photo" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: OUT }}>
        <span className="hero-photo-img">
          <Image src="/profilepicture.JPG" alt="" fill loading="eager" fetchPriority="high" sizes="260px" />
        </span>
      </motion.span>
      {"shani".split("").map((c, i) => (
        <motion.span key={i} className="glyph" style={{ "--i": i + 2 } as React.CSSProperties} {...letter(i + 2)}>
          {c}
        </motion.span>
      ))}
      <motion.span className="glyph dot" style={{ "--i": 7 } as React.CSSProperties} {...letter(7)}>
        .
      </motion.span>
    </span>
  );
}

function Hero() {
  const t = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: OUT } });
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const topY = useTransform(p, [0, 1], ["0vh", still ? "0vh" : "-30vh"]);
  const bottomY = useTransform(p, [0, 1], ["0vh", still ? "0vh" : "30vh"]);
  const fade = useTransform(p, [0, 0.25], [1, 0]);
  const wordFade = useTransform(p, [0.2, 0.7], [1, 0]);
  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-stick">
        <motion.div className="hero-meta" {...t(0.1)} style={{ opacity: fade }}>
          <span className="status">
            <i /> Open to APM &amp; PM roles
          </span>
          <span>Engineer → Product</span>
          <span>Based in London, UK</span>
        </motion.div>

        <div>
          <motion.p className="hero-hi" {...t(0.15)} style={{ opacity: fade }}>
            Hi, I’m
          </motion.p>
          <h1 className="hero-name" aria-label="Roshani Chede">
            <motion.span className="half" style={{ y: topY, opacity: wordFade }}>
              <Word half="top" />
            </motion.span>
            <motion.span className="half" style={{ y: bottomY, opacity: wordFade }}>
              <Word half="bottom" />
            </motion.span>
          </h1>
        </div>

        <motion.div className="hero-foot" {...t(0.9)} style={{ opacity: fade }}>
          <p className="hero-title two-tone">
            I’m Roshani Chede, an engineer moving into product <span>I start with the customer’s real need, then ship what solves it</span>
          </p>
          <nav className="hero-links" aria-label="Links">
            <a href={CV} target="_blank" rel="noreferrer">
              Download CV <span>↗</span>
            </a>
            <a href={`mailto:${EMAIL}`}>
              Email <span>↗</span>
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub <span>↗</span>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn <span>↗</span>
            </a>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── sections ───────────── */

function Head({ title, count, note }: { title: string; count?: string; note?: string }) {
  return (
    <Reveal className="head">
      <h2>
        {title}
        {count && <sup>{count}</sup>}
      </h2>
      {note && <span>{note}</span>}
    </Reveal>
  );
}

function Count({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, value, { duration: 1.6, ease: OUT, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [seen, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function About() {
  return (
    <section className="sec" id="about">
      <Head title="About" />
      <Reveal className="prose">
        <p>
          I studied computer engineering at Goa University and graduated as the gold medallist. After that I spent four years at TCS in Mumbai, mostly on systems where a bug meant someone’s
          insurance claim didn’t go through.
        </p>
        <p>In 2024 I moved to the UK for a master’s at Leicester. Since then I’ve been freelancing and building my own things, usually to scratch an itch, like the gesture app.</p>
      </Reveal>
      <Education />
      <Stack />
    </section>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (i: number) => void }) {
  return (
    <motion.button
      className={`pcard pcard-${shapes[i] ?? "square"}`}
      onClick={() => onOpen(i)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: OUT }}
    >
      <Art kind={p.art} video={p.video} shot={p.shots?.[0]} />
      <span className="pcard-label">
        <b>{p.name}</b>
        <span>{p.short}</span>
      </span>
      <span className="pcard-go" aria-hidden="true">
        ↗
      </span>
    </motion.button>
  );
}

function Work({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section className="sec" id="work">
      <Head title="Projects" count={`0${projects.length}`} note="Why, what and the trade-offs" />
      <div className="mosaic">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} onOpen={onOpen} />
        ))}
      </div>
      <Reveal className="side">
        <span className="side-title">Also built</span>
        <ul>
          {sideProjects.map((sp) => (
            <li key={sp.name}>
              <a href={sp.href} target="_blank" rel="noreferrer">
                <b>{sp.name}</b>
                <span>{sp.line}</span>
                <i aria-hidden="true">↗</i>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section className="sec" id="experience">
      <Head title="Experience" note="2020 to now" />
      <div className="stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} className="stat" delay={i * 0.08}>
            <b>
              <Count value={s.value} suffix={s.suffix} />
            </b>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>
      <ul className="chronos">
        {jobs.map((j, i) => (
          <Job key={j.org} job={j} i={i} />
        ))}
      </ul>
    </section>
  );
}

function UkChapter() {
  return (
    <section className="sec" id="uk">
      <Head title="My UK chapter" note="How I learned to understand customers" />
      <Reveal className="prose">
        <p>
          Moving to the UK for my master’s meant a new country, new customers and new ways of working. Alongside my studies I worked on the shop floor, behind the counter and eventually ran
          shifts. I had a lot to learn, and I learned it fast: how people here shop, what good service looks like, and how to lead a team I’d only just met. These jobs shaped how I understand
          customers and their needs more than any course did.
        </p>
      </Reveal>
      <div className="lessons">
        {ukJobs.map((j, i) => (
          <Reveal key={j.org} className="lesson" delay={i * 0.06}>
            <span className="lesson-tag">
              <b>0{i + 1}</b> What it taught me · {j.lesson}
            </span>
            <blockquote>“{j.quote}”</blockquote>
            <div className="lesson-who">
              <h3>{j.role}</h3>
              <span>{j.org}</span>
            </div>
            <ul>
              {j.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="takeaway">
        <p>
          I bring the same habit to product work: <span>start with the customer, find the real need, then write the requirement.</span>
        </p>
      </Reveal>
    </section>
  );
}

function Education() {
  return (
    <div className="chapter">
      <Reveal className="subhead">
        <h3>Education</h3>
      </Reveal>
      <ul className="chronos">
        {education.map((e, i) => (
          <Reveal key={e.title} className="chrono" delay={i * 0.05}>
            <div className="chrono-top">
              <div>
                <h3>{e.title}</h3>
                <span className="chrono-org">
                  {e.place} <a href="#media" className="badge-link">
                    <em>{e.note} ↓</em>
                  </a>
                </span>
              </div>
              <span className="chrono-when">{e.when}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee">
      <div className={`marquee-track${reverse ? " rev" : ""}`}>
        {[0, 1].map((copy) => (
          <div className="marquee-set" key={copy} aria-hidden={copy === 1 || undefined}>
            {items.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stack() {
  const all = skills.flatMap((s) => s.items);
  const half = Math.ceil(all.length / 2);
  return (
    <div className="chapter">
      <Reveal className="subhead">
        <h3>Toolkit</h3>
      </Reveal>
      <Reveal className="marquees">
        <Marquee items={all.slice(0, half)} />
        <Marquee items={all.slice(half)} reverse />
      </Reveal>
    </div>
  );
}

function Media() {
  const [tab, setTab] = useState<(typeof mediaTabs)[number]["id"]>("all");
  const [photo, setPhoto] = useState<MediaItem | null>(null);
  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPhoto(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo]);
  if (media.length === 0) return null;
  const tabs = mediaTabs.filter((t) => t.id === "all" || media.some((m) => m.kind === t.id));
  const shown = tab === "all" ? media : media.filter((m) => m.kind === tab);
  return (
    <section className="sec" id="media">
      <Head title="Media" count={String(media.length).padStart(2, "0")} note="Certificates and moments" />
      {tabs.length > 2 && (
        <div className="media-tabs" role="tablist">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
              {tab === t.id && <motion.span layoutId="media-tab" className="media-tab-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="media-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((m) => {
            const inner = (
              <>
                <span className="media-thumb">
                  <Image src={m.thumb} alt="" fill sizes="(max-width: 760px) 50vw, 250px" />
                </span>
                <span className="media-body">
                  <b>{m.title}</b>
                  {m.caption && <span>{m.caption}</span>}
                </span>
              </>
            );
            return (
              <motion.div key={m.src} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4, ease: OUT }}>
                {m.kind === "photo" ? (
                  <button className={`media-card media-${m.kind}`} onClick={() => setPhoto(m)}>
                    {inner}
                  </button>
                ) : (
                  <a className={`media-card media-${m.kind}`} href={m.src} target="_blank" rel="noreferrer">
                    {inner}
                  </a>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {photo && (
          <motion.div className="lightbox" onClick={() => setPhoto(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-label={photo.title}>
            <motion.figure initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }} transition={{ duration: 0.4, ease: OUT }}>
              <img src={photo.src} alt={photo.title} />
              <figcaption>
                <b>{photo.title}</b>
                {photo.caption && <span>{photo.caption}</span>}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  return (
    <section className="sec" id="contact">
      <Reveal className="contact-card">
        <span className="signal">
          <i /> Open to APM &amp; PM roles
        </span>
        <h2>Hiring an associate PM or product manager?</h2>
        <p>I’m looking for APM and PM roles in London, where my engineering background helps teams ship the right thing faster. Happy to talk about freelance product work too.</p>
        <CopyEmail />
        <div className="contact-links">
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={CV} target="_blank" rel="noreferrer">
            CV ↗
          </a>
        </div>
      </Reveal>
      <footer className="footer">
        <span>© 2026 Roshani Chede</span>
        <span>London, UK</span>
      </footer>
    </section>
  );
}

/* ───────────── page ───────────── */

export default function Home() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((i: number) => setOpen(i), []);
  return (
    <>
      <main className="page">
        <Hero />
        <div className="flow">
          <Experience />
          <Work onOpen={go} />
          <UkChapter />
          <About />
          <Media />
          <Contact />
        </div>
      </main>
      <Dock />
      <Sheet index={open} onClose={close} onGo={go} />
    </>
  );
}
