import { ArrowUpRight } from "lucide-react"
import { caseStudies } from "@/data/projects"
import { getArchitecture } from "@/data/architecture"
import { getNoteForProject } from "@/data/notes"
import { ArchitectureDiagram } from "./architecture-diagram"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function CaseStudies() {
  return (
    <section id="work" className="mx-auto max-w-page px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        index="01"
        title="Selected work"
        lede="Four systems, four different problems. Each one leads with its real numbers and its architecture — every figure is counted from the source code or carried from delivery records, nothing estimated."
      />
      <div className="space-y-24 sm:space-y-36">
        {caseStudies.map((cs, i) => {
          const arch = getArchitecture(cs.id)
          const note = getNoteForProject(cs.id)
          return (
            <Reveal key={cs.id}>
              <article className="grid gap-10 lg:grid-cols-[240px,1fr] lg:gap-14">
                {/* Meta rail */}
                <aside className="lg:sticky lg:top-24 lg:self-start">
                  <p className="font-display text-6xl text-line">{String(i + 1).padStart(2, "0")}</p>
                  <dl className="mt-6 space-y-4 font-mono text-xs">
                    <div>
                      <dt className="uppercase tracking-[0.18em] text-muted">Org</dt>
                      <dd className="mt-1 text-fg">{cs.org}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.18em] text-muted">Period</dt>
                      <dd className="mt-1 text-fg">{cs.period}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.18em] text-muted">Domain</dt>
                      <dd className="mt-1 text-fg">{cs.domain}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.18em] text-muted">Stack</dt>
                      <dd className="mt-1 leading-relaxed text-muted">{cs.stack.join(" · ")}</dd>
                    </div>
                  </dl>
                </aside>

                {/* Body */}
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl">{cs.name}</h3>
                  <p className="mt-2 font-display text-lg italic text-accent">{cs.tagline}</p>
                  <p className="mt-6 leading-relaxed text-muted">{cs.context}</p>

                  {note && (
                    <a
                      href={`/newportfolio/notes/${note.slug}/`}
                      className="group mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-accent"
                    >
                      Design note: {note.title}
                      <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}

                  <div className="mt-8 border-l-2 border-accent pl-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">The problem</p>
                    <p className="mt-2 leading-relaxed">{cs.problem}</p>
                  </div>

                  {/* Metric band */}
                  {arch && (
                    <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
                      {arch.stats.map((s) => (
                        <div key={s.label} className="bg-surface p-4">
                          <dt className="font-display text-3xl leading-none text-fg sm:text-4xl">{s.value}</dt>
                          <dd className="mt-2 font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-muted">
                            {s.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {/* Architecture diagram */}
                  {arch && (
                    <div className="mt-8">
                      <ArchitectureDiagram arch={arch} />
                    </div>
                  )}

                  {/* Key decisions */}
                  {arch && (
                    <div className="mt-10">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Key decisions</p>
                      <div className="mt-4 space-y-5">
                        {arch.decisions.map((d) => (
                          <div key={d.title} className="border-l border-line pl-5">
                            <p className="font-display text-lg">{d.title}</p>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Outcomes */}
                  <div className="mt-10 rounded-lg border border-line bg-surface p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Where it landed</p>
                    <ul className="mt-3 space-y-2">
                      {cs.outcomes.map((o, j) => (
                        <li key={j} className="flex gap-3 font-mono text-sm">
                          <span className="text-accent">→</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What I optimized for */}
                  {arch && (
                    <div className="mt-8 flex flex-wrap items-center gap-2">
                      <span className="mr-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">Optimized for</span>
                      {arch.optimizedFor.map((o) => (
                        <span key={o} className="rounded-full border border-line px-3 py-1 text-xs text-fg">
                          {o}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* What I'd revisit */}
                  {arch && (
                    <div className="mt-6 flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-0.5 shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                        Revisit
                      </span>
                      <p>{arch.retro}</p>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
