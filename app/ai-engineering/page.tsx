import type { Metadata } from "next"
import { Footer } from "@/components/site/footer"
import { Nav } from "@/components/site/nav"
import { ArchitectureDiagram, DecisionList } from "@/components/site/architecture-diagram"
import { AIEngineering } from "@/components/site/ai-engineering"
import { agentWorkflow } from "@/data/ai-engineering"
import { getArchitecture } from "@/data/architecture"
import { principles } from "@/data/principles"

export const metadata: Metadata = {
  title: "AI Engineering",
  description: "Production agent workflows, multi-agent development, codebase knowledge graphs, and AI-first product work.",
}

export default function AIEngineeringPage() {
  const workflow = getArchitecture("agent-workflow")
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-page px-5 pb-12 pt-32 sm:px-8 sm:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">AI engineering</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">
            I use agents where the work can be checked.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            My AI work is practical: production runbooks, independent verification, codebase graphs, deterministic
            cores, and clear failure paths. The model helps, but the system still has to prove itself.
          </p>
        </section>
        <AIEngineering />
        <section id="how-i-work" className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{agentWorkflow.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">{agentWorkflow.title}</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">{agentWorkflow.intro}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {agentWorkflow.practices.map((practice) => (
              <article key={practice.id} className="rounded-lg border border-line bg-surface p-6">
                <h3 className="font-display text-2xl">{practice.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{practice.body}</p>
              </article>
            ))}
          </div>
          {workflow && (
            <>
              <div className="mt-10">
                <ArchitectureDiagram arch={workflow} />
              </div>
              <div className="mt-10 max-w-3xl">
                <DecisionList decisions={workflow.decisions} />
              </div>
              <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">{workflow.retro}</p>
            </>
          )}
        </section>
        <section className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Operating rules</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {principles.slice(0, 3).map((principle) => (
              <article key={principle.title} className="rounded-lg border border-line bg-surface p-6">
                <h2 className="font-display text-2xl">{principle.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{principle.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
