import { ArrowUpRight } from "lucide-react"
import { routes, siteProfile } from "@/data/site"

const links = [
  { href: siteProfile.linkedin, label: "LinkedIn" },
  { href: siteProfile.github, label: "GitHub" },
  { href: routes.cv, label: "CV (PDF)" },
]

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-page px-5 py-24 sm:px-8 sm:py-32">
      <p className="font-mono text-xs tracking-[0.2em] text-accent">
        07 <span className="text-muted">/</span>
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
        Let&apos;s build something that holds up.
      </h2>
      <a
        href={`mailto:${siteProfile.email}`}
        className="link-slide mt-8 inline-block font-mono text-lg text-fg sm:text-2xl"
      >
        {siteProfile.email}
      </a>
      <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            {l.label}
            <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
        <p className="ml-auto font-mono text-xs text-muted">
          {siteProfile.location} · English · Ukrainian
        </p>
      </div>
      <p className="mt-8 font-mono text-xs leading-relaxed text-muted">
        Metrics are either counted from local source or carried from the current CV/delivery record. Built with Next.js.
      </p>
    </footer>
  )
}
