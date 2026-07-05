import { ArrowUpRight } from "lucide-react"

const links = [
  { href: "https://www.linkedin.com/in/yuryi-piontkovskyi-240a74131", label: "LinkedIn" },
  { href: "https://github.com/yurapion", label: "GitHub" },
  { href: "/newportfolio/cv/Yurii_Piontkovskyi_CV.pdf", label: "CV (PDF)" },
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
        href="mailto:yurapion@gmail.com"
        className="link-slide mt-8 inline-block font-mono text-lg text-fg sm:text-2xl"
      >
        yurapion@gmail.com
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
          Remote — open to UK / EU / Global · English · Ukrainian
        </p>
      </div>
      <p className="mt-8 font-mono text-xs leading-relaxed text-muted">
        Every metric on this page is traceable to source code or delivery records. Built with Next.js.
      </p>
    </footer>
  )
}
