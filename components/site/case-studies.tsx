import { ArrowUpRight } from "lucide-react"
import { caseStudies } from "@/data/projects"
import { getArchitecture } from "@/data/architecture"
import { getNoteForProject } from "@/data/notes"
import { routes } from "@/data/site"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function CaseStudies() {
  return (
    <section id="work" className="mx-auto max-w-page px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        index="01"
        title="Selected work"
        lede="Four systems, four different problems. Open a case study for architecture, decisions, and the evidence behind each claim."
      />
      <div className="space-y-8">
        {caseStudies.map((caseStudy, index) => {
          const architecture = getArchitecture(caseStudy.id)
          const note = getNoteForProject(caseStudy.id)

          return (
            <Reveal key={caseStudy.id}>
              <article className="rounded-lg border border-line bg-surface p-6 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[180px,1fr]">
                  <aside>
                    <p className="font-display text-5xl text-line">{String(index + 1).padStart(2, "0")}</p>
                    <dl className="mt-5 space-y-3 font-mono text-xs">
                      <div>
                        <dt className="uppercase tracking-[0.18em] text-muted">Org</dt>
                        <dd className="mt-1 text-fg">{caseStudy.org}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.18em] text-muted">Period</dt>
                        <dd className="mt-1 text-fg">{caseStudy.period}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.18em] text-muted">Domain</dt>
                        <dd className="mt-1 text-fg">{caseStudy.domain}</dd>
                      </div>
                    </dl>
                  </aside>

                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl">{caseStudy.name}</h3>
                    <p className="mt-2 font-display text-lg italic text-accent">{caseStudy.tagline}</p>
                    <p className="mt-5 max-w-3xl leading-relaxed text-muted">{caseStudy.context}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Angle</span>{" "}
                      {caseStudy.angle}
                    </p>

                    {architecture && (
                      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
                        {architecture.stats.map((stat) => (
                          <div key={stat.label} className="bg-bg p-4">
                            <dt className="font-display text-3xl leading-none text-fg sm:text-4xl">{stat.value}</dt>
                            <dd className="mt-2 font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-muted">
                              {stat.label}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <ul className="mt-6 space-y-2">
                      {caseStudy.outcomes.slice(0, 2).map((outcome) => (
                        <li key={outcome} className="flex gap-3 text-sm leading-relaxed">
                          <span className="text-accent">→</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={`${routes.work}${caseStudy.id}/`}
                        className="rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-fg transition-colors hover:border-accent hover:text-accent"
                      >
                        Full case study
                      </a>
                      {note && (
                        <a
                          href={`${routes.notes}${note.slug}/`}
                          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-accent"
                        >
                          Design note
                          <ArrowUpRight
                            size={13}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </a>
                      )}
                      <p className="font-mono text-xs leading-relaxed text-muted">
                        {caseStudy.stack.slice(0, 6).join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
