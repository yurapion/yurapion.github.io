import { ArrowUpRight } from "lucide-react"
import { Nav } from "@/components/site/nav"
import { Footer } from "@/components/site/footer"
import { caseStudies } from "@/data/projects"
import { aiEngineering } from "@/data/ai-engineering"
import { routes, siteProfile } from "@/data/site"

const entryPoints = [
  {
    href: routes.work,
    label: "Selected work",
    title: "Production systems with proof",
    body: "CardMedic, AI Sight Suite, AccentPOS, and Wunder AI/cosnova. Each case study separates source-counted facts from CV-carried delivery metrics.",
  },
  {
    href: routes.ai,
    label: "AI engineering",
    title: "Agents where failure matters",
    body: "How I use agents for production operations, codebase graphing, multi-agent development, and AI-first product delivery.",
  },
  {
    href: routes.experience,
    label: "Experience",
    title: "CV without the noise",
    body: "A concise timeline across Blum Health, Wunder AI, and independent client-direct delivery.",
  },
  {
    href: routes.stack,
    label: "Stack",
    title: "Tools by job, not a badge wall",
    body: "Languages, frontend, backend, cloud, data, quality, compliance, and AI engineering grouped by use.",
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
              {siteProfile.name}
            </p>
            <h1
              className="rise max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl"
              style={{ animationDelay: "0.15s" }}
            >
              Senior engineer for clinical, cloud, and AI-agent systems that have to work in production.
            </h1>
            <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: "0.3s" }}>
              8+ years across healthcare, medical imaging AI, consumer media, and SaaS. I build the systems, the
              delivery paths, and the agent workflows that keep them understandable after launch.
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
              <a
                href={routes.work}
                className="rounded-full bg-accent px-6 py-3 font-mono text-sm text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                View work
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
                <dd className="mt-2 text-sm text-fg">Distributed systems, clinical AI, agentic delivery</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Location</dt>
                <dd className="mt-2 text-sm text-fg">{siteProfile.location}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
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
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Proof first</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Real projects, real constraints.</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">
                The portfolio is now split like a senior engineer's review: quick overview first, then evidence when a
                recruiter or technical lead wants depth.
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">AI engineering</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {aiEngineering.slice(0, 2).map((item) => (
              <article key={item.id} className="rounded-lg border border-line bg-surface p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{item.kind}</p>
                <h2 className="mt-3 font-display text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
              </article>
            ))}
          </div>
          <a
            href={routes.ai}
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors hover:text-accent"
          >
            Read the AI engineering page
            <ArrowUpRight size={14} />
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
