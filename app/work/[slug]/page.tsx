import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ArchitectureDiagram } from "@/components/site/architecture-diagram"
import { Footer } from "@/components/site/footer"
import { Nav } from "@/components/site/nav"
import { getArchitecture } from "@/data/architecture"
import { getNoteForProject } from "@/data/notes"
import { caseStudies, getCaseStudy } from "@/data/projects"
import { routes } from "@/data/site"

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getCaseStudy(slug)

  return {
    title: project ? `${project.name} - Case Study` : "Case Study",
    description: project?.context,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getCaseStudy(slug)

  if (!project) {
    notFound()
  }

  const architecture = getArchitecture(project.id)
  const note = getNoteForProject(project.id)

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-page px-5 py-28 sm:px-8 sm:py-36">
        <a
          href={routes.work}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
          Selected work
        </a>

        <header className="mt-10 grid gap-10 border-b border-line pb-12 lg:grid-cols-[1fr,320px]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {project.org} · {project.period}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">{project.name}</h1>
            <p className="mt-4 font-display text-2xl italic text-accent">{project.tagline}</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{project.context}</p>
          </div>
          <aside className="rounded-lg border border-line bg-surface p-6">
            <dl className="space-y-5 font-mono text-xs">
              <div>
                <dt className="uppercase tracking-[0.18em] text-muted">Domain</dt>
                <dd className="mt-1 text-fg">{project.domain}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-muted">Angle</dt>
                <dd className="mt-1 leading-relaxed text-fg">{project.angle}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-muted">Stack</dt>
                <dd className="mt-1 leading-relaxed text-muted">{project.stack.join(" · ")}</dd>
              </div>
            </dl>
          </aside>
        </header>

        <section className="grid gap-10 border-b border-line py-12 lg:grid-cols-[320px,1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">My role</p>
            <p className="mt-4 leading-relaxed text-muted">{project.role}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Problem</p>
            <p className="mt-4 text-xl leading-relaxed">{project.problem}</p>
          </div>
        </section>

        {architecture && (
          <section className="border-b border-line py-12">
            <div className="grid gap-6 sm:grid-cols-4">
              {architecture.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-line bg-surface p-5">
                  <p className="font-display text-4xl leading-none">{stat.value}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase leading-tight tracking-[0.14em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ArchitectureDiagram arch={architecture} />
            </div>
          </section>
        )}

        <section className="grid gap-10 border-b border-line py-12 lg:grid-cols-[320px,1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Architecture</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{project.evidenceNote}</p>
          </div>
          <ul className="space-y-4">
            {project.architecture.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 border-b border-line py-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Where it landed</p>
            <ul className="mt-5 space-y-3">
              {project.outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Evidence</p>
            <ul className="mt-5 space-y-3">
              {project.proof.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {architecture && (
          <section className="grid gap-10 border-b border-line py-12 lg:grid-cols-[320px,1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Decisions</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                The interesting part is not the stack list. It is where the system puts risk.
              </p>
            </div>
            <div className="space-y-6">
              {architecture.decisions.map((decision) => (
                <article key={decision.title} className="border-l border-line pl-5">
                  <h2 className="font-display text-2xl">{decision.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{decision.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {architecture && (
          <section className="py-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Revisit</p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{architecture.retro}</p>
            {note && (
              <a
                href={`${routes.notes}${note.slug}/`}
                className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                Read design note
                <ArrowUpRight size={13} />
              </a>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
