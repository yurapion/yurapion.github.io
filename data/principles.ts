export interface Principle {
  title: string
  body: string
  evidence: string
}

// Evidence lines are drawn from real git history and project artifacts:
// migration counts and commit style from authored history, the verification
// gate and cost work from the agentic dev workflow.
export const principles: Principle[] = [
  {
    title: "Make failure explicit",
    body: "Errors belong in a type signature or a queue topology, where you can't miss them, long before a 3am page. I map the failure modes before the happy path.",
    evidence: "Either/Option error types in AI Sight · DLQ → Slack on every CardMedic queue · a fail-closed validation gate in DevPrep",
  },
  {
    title: "Change behaviour with data, not forks",
    body: "The variation worth having lives in config and schema, not in branches that quietly drift apart. I author migrations as part of the feature, so the schema stays the current truth.",
    evidence: "A 326-migration schema in AccentPOS, 68 in AI Sight · SSM-flagged vendor swap · 20 brands from one SPA",
  },
  {
    title: "Right tool for each boundary",
    body: "Boundaries are a design decision. Each service, cloud, and layer does the one thing it's best at, and I spend the time on the seams between them.",
    evidence: "Azure identity + AWS SageMaker inference in AI Sight · l1/l2/l3 service tiers across 44 Go services in cosnova",
  },
  {
    title: "Ship it observable and tested",
    body: "If it runs in production I can see it, and I can show it works before it gets there. Monitoring and real integration tests ship with the feature, not in a follow-up ticket.",
    evidence: "Testcontainers against real Postgres · Prometheus / Grafana / Loki · recent commits cite their test count and build status",
  },
  {
    title: "Maker ≠ checker — now with agents",
    body: "AI raised the stakes on verification rather than lowering them. Agents plan and build; a separate agent checks the result against named, provable conditions before it ships. A task with no way to prove it's done is a spec problem, and I stop and fix the spec.",
    evidence: "An independent checker runs a Playwright regression and a database write-audit before changes land · spec-driven goal / done / loop",
  },
]
