import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/site/footer"
import { Nav } from "@/components/site/nav"
import { practiceAreas } from "@/data/practice"
import { routes } from "@/data/site"

export const metadata: Metadata = {
  title: "Practice",
  description:
    "How Yurii Piontkovskyi works across architecture, DevOps, planning, client decisions, and engineering leadership.",
}

export default function PracticePage() {
  return (
    <>
      <Nav />
      <main>
        <header className="mx-auto max-w-page px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Practice</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">
            My role spans architecture, delivery, production operations, and client decisions.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            I take products end to end when the work needs independence. When a small team shares the delivery, I
            set ownership, review the work, and keep the route from business need to production clear.
          </p>
          <nav aria-label="Practice sections" className="mt-10 flex flex-wrap gap-2">
            {practiceAreas.map((area) => (
              <a
                key={area.id}
                href={`#${area.id}`}
                className="rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {area.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="border-t border-line">
          {practiceAreas.map((area, index) => (
            <section
              key={area.id}
              id={area.id}
              className={index % 2 === 1 ? "border-b border-line bg-surface" : "border-b border-line"}
            >
              <div className="mx-auto grid max-w-page gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[220px,1fr] lg:gap-16">
                <aside className="lg:sticky lg:top-24 lg:self-start">
                  <p className="font-display text-5xl text-line">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">{area.label}</p>
                </aside>

                <div>
                  <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl">{area.title}</h2>
                  <p className="mt-5 max-w-3xl leading-relaxed text-muted">{area.summary}</p>

                  <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Evidence</p>
                      <ul className="mt-4 space-y-3">
                        {area.evidence.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <article className="rounded-lg border border-line bg-bg p-6 sm:p-7">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Example</p>
                      <h3 className="mt-3 font-display text-2xl leading-tight">{area.example.title}</h3>
                      <dl className="mt-6 space-y-5">
                        <div>
                          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Situation</dt>
                          <dd className="mt-2 text-sm leading-relaxed">{area.example.context}</dd>
                        </div>
                        <div>
                          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">What I did</dt>
                          <dd className="mt-2 text-sm leading-relaxed">{area.example.action}</dd>
                        </div>
                        <div>
                          <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Result</dt>
                          <dd className="mt-2 text-sm leading-relaxed">{area.example.result}</dd>
                        </div>
                      </dl>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 rounded-lg border border-line bg-surface p-7 sm:p-10 md:grid-cols-[1fr,auto] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Technical range</p>
              <h2 className="mt-3 font-display text-3xl">See the tools behind the work.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                Languages and platforms matter in context. The stack page groups them by the work they support.
              </p>
            </div>
            <a
              href={routes.stack}
              className="inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors hover:text-accent"
            >
              View stack
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
