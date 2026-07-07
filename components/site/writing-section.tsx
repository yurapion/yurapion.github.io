import { ArrowUpRight } from "lucide-react"
import { notes } from "@/data/notes"
import { routes } from "@/data/site"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function WritingSection() {
  return (
    <section id="writing" className="mx-auto max-w-page px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        index="04"
        title="Design notes"
        lede="Longer-form write-ups of a single hard decision in one of the systems above — the kind of thinking that doesn't fit in a case-study bullet."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {notes.map((note) => (
          <Reveal key={note.slug}>
            <a
              href={`${routes.home}notes/${note.slug}/`}
              className="group flex h-full flex-col rounded-lg border border-line bg-surface p-7 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-muted">
                <span className="text-accent">{note.project}</span>
                <span>{note.readingTime}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight">{note.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{note.dek}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors group-hover:text-accent">
                Read the note
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
