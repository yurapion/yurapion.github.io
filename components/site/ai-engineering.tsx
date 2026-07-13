import { aiEngineering } from "@/data/ai-engineering"
import { Reveal } from "./reveal"

export function AIEngineering() {
  return (
    <section id="ai" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {aiEngineering.map((work, i) => (
            <Reveal key={work.id} delay={(i % 2) * 90}>
              <article className="flex h-full flex-col rounded-lg border border-line bg-bg p-7">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{work.kind}</p>
                <h3 className="mt-3 font-display text-2xl">{work.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{work.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {work.details.map((d, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-line pt-4 text-sm leading-relaxed text-muted">
                  <span className="mr-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">Guardrail</span>
                  {work.guardrail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
