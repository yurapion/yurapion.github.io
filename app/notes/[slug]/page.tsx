import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getNote, notes } from "@/data/notes"

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  return {
    title: note ? `${note.title} — Yurii Piontkovskyi` : "Design note",
    description: note?.dek,
  }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)

  if (!note) {
    return (
      <main className="mx-auto max-w-page px-5 py-32 sm:px-8">
        <p className="font-mono text-sm text-muted">Note not found.</p>
        <Link href="/" className="link-slide mt-4 inline-block font-mono text-sm text-accent">
          ← Back home
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <a
        href="/newportfolio/#work"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
        Selected work
      </a>

      <header className="mt-10 border-b border-line pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Design note · {note.project} · {note.readingTime}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{note.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{note.dek}</p>
      </header>

      <article className="mt-10 space-y-10">
        {note.sections.map((section, i) => (
          <section key={i}>
            {section.heading && <h2 className="mb-4 font-display text-2xl">{section.heading}</h2>}
            <div className="space-y-4">
              {section.paras.map((p, j) => (
                <p key={j} className="text-[17px] leading-relaxed text-fg/90">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <footer className="mt-16 border-t border-line pt-8">
        <a
          href="mailto:yurapion@gmail.com"
          className="link-slide font-mono text-sm text-fg"
        >
          yurapion@gmail.com
        </a>
        <Link href="/" className="ml-6 font-mono text-sm text-muted transition-colors hover:text-accent">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}
