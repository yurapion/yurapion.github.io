import { experience } from "@/data/experience"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-page px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading index="05" title="Experience" />
      <div className="space-y-16">
        {experience.map((exp) => (
          <Reveal key={exp.id}>
            <article className="grid gap-6 border-t border-line pt-8 md:grid-cols-[260px,1fr] md:gap-16">
              <div>
                <p className="font-mono text-xs text-accent">{exp.period}</p>
                <h3 className="mt-2 font-display text-2xl">{exp.company}</h3>
                <p className="mt-1 text-sm text-muted">
                  {exp.role} · {exp.location}
                </p>
              </div>
              <div>
                <p className="leading-relaxed text-muted">{exp.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-xs leading-relaxed text-muted">{exp.stack.join(" · ")}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
