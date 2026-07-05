import { compliance, skillGroups } from "@/data/skills"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function SkillsSection() {
  return (
    <section id="skills" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-page px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading index="06" title="Stack" />
        <dl className="divide-y divide-line border-y border-line">
          {skillGroups.map((group) => (
            <Reveal key={group.id}>
              <div className="grid gap-2 py-5 md:grid-cols-[260px,1fr] md:gap-16">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted md:pt-1">{group.label}</dt>
                <dd className="text-sm leading-relaxed">{group.items.join(" · ")}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <Reveal>
          <div className="mt-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Security &amp; compliance</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {compliance.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
