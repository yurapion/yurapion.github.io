import { evidencePolicy } from "@/data/evidence"

export function EvidencePolicy({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "border-y border-line bg-surface"}>
      <div className={compact ? "" : "mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-20"}>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{evidencePolicy.title}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{evidencePolicy.summary}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {evidencePolicy.rules.map((rule) => (
            <article key={rule.label} className="rounded-lg border border-line bg-bg p-5">
              <h3 className="font-display text-xl">{rule.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{rule.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
