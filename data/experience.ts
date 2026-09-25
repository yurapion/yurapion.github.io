export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    id: "evolve",
    company: "Evolve",
    role: "Staff Engineer",
    period: "Sep 2026 — Present",
    location: "Remote",
    summary:
      "Staff engineer on the cloud platform for a clinical VR headset. I own the architecture across identity, the application database, and the operator product, and I direct another engineer on that platform.",
    highlights: [
      "PostgreSQL holds the application data: 19 tables and 33 TypeORM migrations. A session cannot point at a participant or device from another organization, and row-level security still applies when a query forgets its filter",
      "The service connects as a role that does not own the tables. A table owner bypasses row-level security without an error, so that connection would make the tenant rules look present and do nothing",
      "Operator and device identity sit in Cognito. The token decides the organization, and a device credential resolves to the organization that owns the headset",
      "I ship the operator application against a live headset: create and start a session, signal quality, live sensor traces, and a CSV export that returns an error when it fails",
      "Export jobs travel on the Kafka cluster already running in every environment. The data_exports row is the source of truth for status. I own that decision",
    ],
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "TypeORM", "AWS Cognito", "Kafka", "Terraform"],
  },
  {
    id: "blumhealth",
    company: "Blum Health",
    role: "Senior Full-Stack Engineer",
    period: "Jul 2023 — Present",
    location: "Remote",
    summary:
      "Lead engineer across three concurrent client products spanning NHS healthcare communications, clinical imaging AI, and restaurant SaaS — owning architecture, delivery, and client communication on each.",
    highlights: [
      "Architected CardMedic's Node.js/TypeScript microservices on AWS serverless, deployed across NHS trusts",
      "Built AI Sight Suite's .NET Clean Architecture backend with cross-cloud Azure + AWS SageMaker inference",
      "Designed AccentPOS's Hasura + Fastify platform with PostgreSQL schema-as-code (326 migrations)",
      "Direct client communication on priorities, trade-offs, and delivery timelines; mentored juniors through code-level guidance and PR reviews",
    ],
    stack: ["TypeScript", "Node.js", "C# / .NET", "React", "Flutter", "AWS", "Azure", "PostgreSQL", "Terraform"],
  },
  {
    id: "wunder",
    company: "Wunder AI",
    role: "Senior Full-Stack Engineer",
    period: "Mar 2020 — Sep 2023",
    location: "Remote",
    summary:
      "Connected product ecosystem for cosnova Beauty: consumer festival experiences, B2B insight dashboards, and a shared Go/GraphQL backend monorepo.",
    highlights: [
      "Built React frontends on a shared Apollo GraphQL + WebSocket layer — Playtime (multi-brand festival SPA) and Target Group (Cytoscape/D3 graph visualisations)",
      "Delivered LiveMind realtime session mirroring: the B2B app embeds the consumer SPA via iframe and mirrors participant activity through shared GraphQL subscriptions",
      "Contributed to a Go + gqlgen monorepo with 49 command binaries, Dgraph/PostgreSQL/Kafka references, and a rule-book-to-Go code generator for consumer profiling",
      "Worked in a Drone → Kaniko → Kubernetes delivery flow with GitOps and Prometheus-style observability patterns",
    ],
    stack: ["React", "TypeScript", "Go", "gqlgen", "GraphQL", "Kubernetes", "Kafka", "Dgraph", "Apollo"],
  },
  {
    id: "freelance",
    company: "Freelance / Contract",
    role: "Full-Stack Engineer",
    period: "Mar 2017 — Mar 2020",
    location: "Remote",
    summary:
      "Independent contracts across web and mobile delivery for early-stage clients — React/Node.js SPAs, REST/GraphQL APIs, and CI/CD setups.",
    highlights: [
      "Delivered multi-tenant React dashboards and admin panels integrated with REST and GraphQL backends",
      "Built Node.js/Express APIs on PostgreSQL and MongoDB with JWT auth, role-based access, and Stripe integrations",
      "Containerised services with Docker; set up GitHub Actions / GitLab CI pipelines deploying to AWS",
      "Worked directly with founders on scoping, estimates, and iterative delivery",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "AWS"],
  },
]
