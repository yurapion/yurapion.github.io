import { ArrowDown } from "lucide-react"

const meta = [
  ["Location", "Remote — UK / EU / Global"],
  ["Currently", "Senior Full-Stack Engineer, Blum Health"],
  ["Focus", "Distributed systems · AI in production"],
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-page px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <p className="rise mb-6 font-mono text-sm text-muted" style={{ animationDelay: "0.05s" }}>
          Yurii Piontkovskyi
        </p>
        <h1
          className="rise max-w-4xl font-display text-5xl leading-[1.05] sm:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          Production systems that hold up under <em className="text-accent">compliance</em>, <em className="text-accent">scale</em>, and the <em className="text-accent">AI</em> now running them.
        </h1>
        <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: "0.3s" }}>
          Senior full-stack engineer with 8+ years building cloud-native platforms in healthcare, medical imaging AI,
          consumer media, and SaaS — end to end, from architecture to NHS-grade compliance. These days I also engineer
          the AI agents that build and operate them.
        </p>
        <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
          <a
            href="mailto:yurapion@gmail.com"
            className="rounded-full bg-accent px-6 py-3 font-mono text-sm text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            yurapion@gmail.com
          </a>
          <a
            href="/newportfolio/cv/Yurii_Piontkovskyi_CV.pdf"
            className="rounded-full border border-line px-6 py-3 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Download CV
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-2 py-3 font-mono text-sm text-muted transition-colors hover:text-fg"
          >
            Selected work
            <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
        <dl
          className="rise mt-20 grid gap-6 border-t border-line pt-8 sm:grid-cols-3"
          style={{ animationDelay: "0.6s" }}
        >
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{k}</dt>
              <dd className="mt-2 text-sm text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
