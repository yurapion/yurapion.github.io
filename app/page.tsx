import { ArrowUpRight } from "lucide-react"
import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"
import { EvidencePolicy } from "@/components/site/evidence-policy"
import { caseStudies } from "@/data/projects"
import { aiEngineering } from "@/data/ai-engineering"
import { lookingFor, routes, siteProfile } from "@/data/site"

const entryPoints = [
  {
    href: routes.work,
    label: "Selected work",
    title: "Production systems with proof",
    body: "CardMedic, AI Sight Suite, AccentPOS, and Wunder AI/cosnova. Depth lives on the case-study pages.",
  },
  {
    href: routes.practice,
    label: "Practice",
    title: "The work around the code",
    body: "Architecture, DevOps, planning, client decisions, and leading a small engineering team through delivery.",
  },
  {
    href: routes.ai,
    label: "AI engineering",
    title: "Agents as a delivery multiplier",
    body: "Production runbooks, multi-agent workflows, codebase graphs, and AI-first product work with verification built in.",
  },
  {
    href: routes.experience,
    label: "Experience",
    title: "CV without the noise",
    body: "A concise timeline across Blum Health, Wunder AI, and independent client-direct delivery.",
  },
]

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div className="hero-grid absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-page px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-44">
            <p className="rise mb-6 font-mono text-sm text-muted" style={{ animationDelay: "0.05s" }}>
              {siteProfile.name} · {siteProfile.role}
            </p>
            <h1
              className="rise max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl"
              style={{ animationDelay: "0.15s" }}
            >
              {siteProfile.headline}
            </h1>
            <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: "0.3s" }}>
              {siteProfile.summary}
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
              <a
                href={routes.work}
                className="rounded-full bg-accent px-6 py-3 font-mono text-sm text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                View work
              </a>
              <a
                href={routes.ai}
                className="rounded-full border border-line px-6 py-3 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                AI engineering
              </a>
              <a
                href={routes.cv}
                className="rounded-full border border-line px-6 py-3 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                Download CV
              </a>
              <a
                href={`mailto:${siteProfile.email}`}
                className="link-slide px-2 py-3 font-mono text-sm text-muted transition-colors hover:text-fg"
              >
                {siteProfile.email}
              </a>
            </div>
            <dl
              className="rise mt-16 grid gap-6 border-t border-line pt-8 sm:grid-cols-3"
              style={{ animationDelay: "0.6s" }}
            >
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Current</dt>
                <dd className="mt-2 text-sm text-fg">Senior Full-Stack Engineer, Blum Health</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Focus</dt>
                <dd className="mt-2 text-sm text-fg">Distributed systems · clinical AI · agentic delivery</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Location</dt>
                <dd className="mt-2 text-sm text-fg">{siteProfile.location}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-20">
          <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{lookingFor.title}</p>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Roles</p>
                <ul className="mt-3 space-y-2">
                  {lookingFor.roles.map((role) => (
                    <li key={role} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Contexts</p>
                <ul className="mt-3 space-y-2">
                  {lookingFor.contexts.map((context) => (
                    <li key={context} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{context}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">{lookingFor.note}</p>
          </div>
        </section>

        <section className="mx-auto max-w-page px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-4 lg:grid-cols-4">
            {entryPoints.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex min-h-64 flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent/60"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{item.label}</p>
                <h2 className="mt-4 font-display text-2xl leading-tight">{item.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                <span className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors group-hover:text-accent">
                  Open
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-page gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr,1.1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Selected work</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Real projects, real constraints.</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">
                Four systems with different hard problems: clinical translation at scale, regulated imaging AI,
                multi-tenant commerce, and a shared consumer/B2B platform.
              </p>
            </div>
            <div className="grid gap-3">
              {caseStudies.map((project) => (
                <a
                  key={project.id}
                  href={`${routes.work}${project.id}/`}
                  className="group rounded-lg border border-line bg-bg p-5 transition-colors hover:border-accent/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-2xl">{project.name}</h3>
                    <span className="font-mono text-xs text-muted">{project.domain}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.angle}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">AI engineering</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight">
                Agents where the work can be checked.
              </h2>
            </div>
            <a
              href={routes.ai}
              className="inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors hover:text-accent"
            >
              Full AI page
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {aiEngineering.slice(0, 2).map((item) => (
              <article key={item.id} className="rounded-lg border border-line bg-surface p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{item.kind}</p>
                <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <EvidencePolicy />
      </main>
      <Footer />
    </>
  )
}
