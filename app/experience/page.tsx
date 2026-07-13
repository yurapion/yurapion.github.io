import type { Metadata } from "next"
import { ExperienceSection } from "@/components/site/experience-section"
import { Footer } from "@/components/site/footer"
import { Nav } from "@/components/site/nav"
import { routes, siteProfile } from "@/data/site"

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional timeline for Yurii Piontkovskyi, senior full-stack engineer.",
}

export default function ExperiencePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-page px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Experience</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">
            Senior full-stack delivery across client-facing production systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            The timeline stays close to the current CV: Blum Health, Wunder AI, and independent contract delivery.
            Project depth lives in the work pages.
          </p>
          <a
            href={routes.cv}
            className="mt-8 inline-block rounded-full border border-line px-6 py-3 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Download CV
          </a>
          <p className="mt-4 font-mono text-xs text-muted">{siteProfile.location}</p>
        </section>
        <ExperienceSection />
      </main>
      <Footer />
    </>
  )
}
