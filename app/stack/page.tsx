import type { Metadata } from "next"
import { Footer } from "@/components/site/footer"
import { Nav } from "@/components/site/nav"
import { SkillsSection } from "@/components/site/skills-section"

export const metadata: Metadata = {
  title: "Stack",
  description: "Technical stack grouped by use case: languages, frontend, backend, cloud, data, DevOps, and AI engineering.",
}

export default function StackPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-page px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Stack</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">
            Tools grouped by the kind of problem they solve.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            No icon wall. The useful signal is where each tool has been used: frontend, backend, cloud, data,
            quality, compliance, and AI engineering.
          </p>
        </section>
        <SkillsSection />
      </main>
      <Footer />
    </>
  )
}
