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
      "B2B AI travel platform: a Go and PostgreSQL backend, SvelteKit apps, and a multi-agent LLM layer that tour operators license. I plan, specify and verify. Agents write the code through the team's agent chain, and I check every change in production.",
    highlights: [
      "Designed and shipped the YGO Console MCP server: a remote Model Context Protocol server with OAuth sign-in, so Claude, ChatGPT, Cursor and Claude Code can read a customer's projects and hotels and leave hotel feedback",
      "Write tools preview before they write. The feedback tools show where the comment will land and ask for a confirm, and request_capability records what the server cannot do yet, so the roadmap comes from what agents ask for",
      "Built threaded customer feedback in the Go backend: a migration, one write core shared by the API and the MCP, reply endpoints on two API surfaces, and OpenAPI specs. A reply drafted by a model stays marked as AI-generated on every read",
      "Every tool call mirrors one audit line to a Slack channel, so the team can watch what agents do with the API",
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
      "Cloud platform for a clinical VR headset with biosensing. I was hired on a case study that became the platform plan: the cloud as the trust and session-orchestration plane, PostgreSQL as the application database, and session authority moved from the headset into the cloud. I delivered that plan with one other engineer and held code-owner approval.",
    highlights: [
      "Introduced PostgreSQL and shipped the database layer: TypeORM schema-as-code, the organization as tenant key on every row, 46 row-level security policies, and least-privilege roles per service that do not own the tables, because a table owner bypasses those policies without an error",
      "Owned the AWS cloud layer in Terraform across five environments: a KMS key per environment for RDS, S3, Redis, MSK and DynamoDB, checked live in production, CloudFront security headers, SES, and Cognito identity for operators and devices. I ran every dev and production apply",
      "Designed and built Session Authority in NestJS with the second engineer: the session state machine, operator takeover under a row lock, presence reconciliation, timers claimed from Postgres with SKIP LOCKED, and a typed command and refusal contract to the headset over Socket.IO",
      "Shipped the React 18 operator app for a live headset session (run lifecycle, check-ins, consent, signal quality, live EEG spectra) and the reports pipeline: Kafka-backed export and report queues, a report worker, and a conformance-checked contract for the data-science code",
      "Wrote the ADRs for the Kafka export queue, signal quality, and per-environment encryption, and reviewed the other engineer's changes as code owner",
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
