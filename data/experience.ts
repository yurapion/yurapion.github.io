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
    id: "ygo",
    company: "YGO",
    role: "AI Product Engineer",
    period: "Oct 2026 — Present",
    location: "Remote",
    summary:
      "B2B AI travel platform, licensed to tour operators and airlines: a Go and PostgreSQL backend, SvelteKit apps, and a multi-agent LLM layer that the core team built. I work on the part customers and their AI assistants use.",
    highlights: [
      "Took the YGO Console MCP server (remote Model Context Protocol, OAuth sign-in) from a read-only prototype a colleague created to a product customers use. 21 of the service's 34 commits and about 70% of its code are mine. Claude and ChatGPT can list a customer's projects and hotels, send hotel feedback and reply in a thread",
      "Designed the feedback and reply tools to preview before they write: the first call shows the text and where it will go, and it is stored only after the user confirms. Each tool is marked read-only or not. request_capability records what a user asked for that the server cannot do yet and passes it to the product team",
      "Built threaded feedback under it: the schema migration, one write core shared by the REST API and the MCP tools, reply and thread endpoints, OpenAPI docs and the SvelteKit UI",
      "Added the monitoring: one structured log line per tool call, signals for tool panics and sign-in failures, a BetterStack dashboard with monitors, and a Slack mirror of the calls during the beta. 34 pull requests merged in about five weeks",
    ],
    stack: ["Go", "PostgreSQL", "MCP", "OAuth", "SvelteKit", "Redis / Asynq", "DigitalOcean", "Claude Code"],
  },
  {
    id: "evolve",
    company: "Evolve (via Honeycomb Software)",
    role: "Staff Engineer",
    period: "Sep 2026 — Nov 2026",
    location: "Remote",
    summary:
      "Cloud platform for a clinical VR headset with biosensing: NestJS services, PostgreSQL, Kafka, a React operator app, and AWS in Terraform. Team of five. I planned the full-stack work for myself and a second engineer.",
    highlights: [
      "My hiring case study proposed PostgreSQL with row-level security and the organisation as the tenant key, when the design had no relational store. The team adopted it within two weeks. I worked with the second engineer on the first tables, then built the session, device and consent tables on the same pattern",
      "Wrote the four architecture decision records for Session Authority and built it with the second engineer. Session state is a journal plus a projected row, operator control is a lease reconciled under a row lock, timers are claimed from PostgreSQL with SKIP LOCKED, and commands and refusals to the headset are typed messages over Socket.IO",
      "Secured the database connection: RDS IAM token sign-in behind a switch, TLS that verifies the certificate and refuses plaintext, services that sign in as a least-privilege application role, and integration specs that run against PostgreSQL 16 in CI",
      "Added KMS encryption at rest per environment in Terraform, with its decision record, plus Redis TLS and a content security policy for the Cognito sign-in pages. I ran the applies on the dev environment",
      "Built about a third of the React 18 operator app for a live session create and start, live view, check-ins and consent, signal quality, EEG spectra. Also built the session-report queue and worker on Kafka",
      "Split the Session Authority epic into 26 tickets with a dependency graph so both of us could pick up in parallel, and re-planned the board when scope changed. Delivered 201 pull requests across 183 tickets in 11 weeks. Wrote 9 ADRs and an RFC on the end-to-end test approach, which includes tenant isolation with two organisations running on virtual headsets",
    ],
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "TypeORM", "AWS Cognito", "KMS", "Kafka", "InfluxDB", "Terraform"],
  },
  {
    id: "blumhealth",
    company: "Blum Health (via Honeycomb Software)",
    role: "Senior Full-Stack Engineer",
    period: "Jul 2023 — Nov 2026",
    location: "Remote",
    summary:
      "UK digital-health consultancy. I was the only engineer on CardMedic and directed an intern there, and I worked on four more client products: clinical communication for NHS hospitals, AI retinal screening, a youth-services platform, restaurant point of sale, and a burns-aftercare service.",
    highlights: [
      "CardMedic: owned the whole platform from 2023: 9 Node.js/TypeScript serverless services on AWS (244 REST endpoints), the React admin, and the Flutter app in 55 locales. Scaled the translation pipeline over 22 SQS queues and moved it to a new vendor behind a feature flag, with an AI agent running each rollout from a written runbook. Added in-app calls (Twilio), call transcripts encrypted and kept for 8 years, and single sign-on through Cognito and Microsoft Entra ID",
      "AI Sight (Nov 2023 to Jun 2025): about a third of the commits on a .NET Clean Architecture backend on Azure. Built the Xero billing integration alone (OAuth connect, count images per billing period, price, create a draft invoice) and extended licensing (features per licence tier, a configuration snapshot per licence). Worked on, but did not build, the SageMaker two-model pipeline",
      "AccentPOS: built the PayPal integration (merchant onboarding, order creation and capture, refunds with idempotency keys, verified webhooks) and the online and QR payment pages, on a Hasura and Fastify platform with 326 SQL migrations. Mersey Burns: a web questionnaire and scheduled SMS follow-ups",
      "Orbit (May to Oct 2026): about 200 commits on a .NET 10 and React youth-services platform, including account erasure for all roles, the audit log, and a technical review with 95 findings. Direct client communication on priorities, trade-offs, and delivery timelines",
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
      "Interactive campaign apps and a B2B insight product for consumer brands (Cosnova, Eurail, Bacardi), on a shared Go and GraphQL backend.",
    highlights: [
      "Main author of Playtime (about two thirds of the commits): one React codebase that renders each client's app from CMS JSON, with 56 template types loaded on demand: quizzes, swipe cards, a jump-and-run game, maps and adaptive video",
      "Main author of the insight front end (about three quarters of the commits): graph views of consumer, brand and product data, and LiveMind, a live session view where GraphQL subscriptions over WebSocket drive a D3 graph",
      "In the first year, worked in the Go and gqlgen monorepo: the rule editor UI, OAuth sign-in for the studio app, and small Go changes. Releases went through Drone, Kaniko and Kubernetes with ArgoCD",
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
