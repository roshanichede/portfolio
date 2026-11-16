import posthog from "posthog-js";

try {
  posthog.init("phc_y3Gwb6e9Vup3QoMZVW8agGFJYfaMgCs4CUg8hebVN2Sy", {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    capture_pageview: true,
    capture_pageleave: true, // gives time spent on the site
    person_profiles: "always", // every visitor gets a profile with their full journey
  });

  // Where did they come from? Tag links like ?ref=resume or ?ref=linkedin
  const params = new URLSearchParams(window.location.search);
  const source = params.get("ref") || params.get("utm_source");
  if (source) {
    posthog.register({ source }); // this visit
    posthog.register_once({ first_source: source }); // first visit ever
    posthog.setPersonProperties({ last_source: source }, { first_source: source });
    // Remove the tag from the address bar so visitors see a clean URL
    params.delete("ref");
    for (const k of [...params.keys()]) if (k.startsWith("utm_")) params.delete(k);
    const q = params.toString();
    window.history.replaceState(window.history.state, "", window.location.pathname + (q ? `?${q}` : "") + window.location.hash);
  }

  // Which sections did they actually look at, and for how long?
  const seen = new Set<string>();
  const enteredAt = new Map<string, number>();
  const watch = () => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting) {
            enteredAt.set(id, Date.now());
            if (!seen.has(id)) {
              seen.add(id);
              posthog.capture("section_viewed", { section: id });
            }
          } else if (enteredAt.has(id)) {
            const secs = Math.round((Date.now() - enteredAt.get(id)!) / 1000);
            enteredAt.delete(id);
            if (secs >= 2) posthog.capture("section_time", { section: id, seconds: secs });
          }
        }
      },
      { threshold: 0.35 },
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch);
  else setTimeout(watch, 0);

  // Key actions: CV, contact links, case studies
  document.addEventListener(
    "click",
    (ev) => {
      const el = ev.target as HTMLElement | null;
      const card = el?.closest(".pcard");
      if (card) {
        posthog.capture("case_study_opened", { project: card.querySelector("b")?.textContent?.trim() });
        return;
      }
      const a = el?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.endsWith(".pdf")) posthog.capture("cv_opened");
      else if (href.startsWith("mailto:")) posthog.capture("email_clicked");
      else if (href.includes("linkedin.com")) posthog.capture("linkedin_clicked");
      else if (href.includes("github.com")) posthog.capture("github_clicked");
      else if (/^https?:/.test(href)) posthog.capture("outbound_link_clicked", { href });
    },
    true,
  );
} catch {
  // analytics must never break the site
}
