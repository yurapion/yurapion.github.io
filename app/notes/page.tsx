import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/site/footer"
import { Nav } from "@/components/site/nav"
import { notes } from "@/data/notes"
import { routes } from "@/data/site"

export const metadata: Metadata = {
  title: "Engineering Notes",
  description: "Technical notes about decisions made in production systems.",
}

export default function NotesPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-page px-5 py-32 sm:px-8 sm:py-40">
        <header>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Engineering notes</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">
            One difficult decision at a time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Longer explanations of production failures, architecture choices, and the trade-offs behind them.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {notes.map((note) => (
            <a
              key={note.slug}
              href={`${routes.notes}${note.slug}/`}
              className="group flex min-h-72 flex-col rounded-lg border border-line bg-surface p-7 transition-colors hover:border-accent/60"
            >
              <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em]">
                <span className="text-accent">{note.project}</span>
                <span className="text-muted">{note.readingTime}</span>
              </div>
              <h2 className="mt-5 font-display text-3xl leading-tight">{note.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{note.dek}</p>
              <span className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors group-hover:text-accent">
                Read note
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
