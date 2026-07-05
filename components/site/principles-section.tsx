import { principles } from "@/data/principles"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function PrinciplesSection() {
  return (
    <section id="approach" className="mx-auto max-w-page px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        index="02"
        title="How I build"
        lede="The judgment underneath the projects above — the defaults I reach for before the first line of code."
      />
      <div className="border-t border-line">
        {principles.map((p, i) => (
          <Reveal key={p.title}>
            <div className="grid gap-4 border-b border-line py-8 md:grid-cols-[80px,1fr] md:gap-10">
              <p className="font-display text-4xl text-line">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{p.body}</p>
                <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-wide text-accent">{p.evidence}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
