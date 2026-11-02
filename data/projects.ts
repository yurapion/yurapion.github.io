export interface CaseStudy {
  id: string
  name: string
  tagline: string
  org: string
  period: string
  domain: string
  angle: string
  context: string
  role: string
  problem: string
  architecture: string[]
  outcomes: string[]
  proof: string[]
  evidenceNote: string
  stack: string[]
  featured: boolean
}

// Figures below are either counted from local source repositories or carried
// from the current CV/delivery record. Copy calls out the difference instead
// of presenting business outcomes as source-code counts.
export const caseStudies: CaseStudy[] = [
  {
    id: "ygo-console-mcp",
    name: "YGO Console MCP",
    tagline: "An agent reads a customer's hotels and leaves feedback, and sees where it is writing first",
    org: "YGO",
    period: "Oct 2026 — Present",
    domain: "B2B travel / agent-facing API",
    angle: "A remote MCP server on a Go backend, with write tools that preview before they write",
    context:
      "YGO licenses an AI travel platform to tour operators. Their staff already use Claude and ChatGPT, and they wanted those assistants to answer questions about their own projects and hotels, and to send a hotel comment to the review team, without a new UI.",
    role:
      "AI Product Engineer. I wrote the design doc, ran the spike, and own the server and its tools. Agents write the code through the team's agent chain; I plan, review, and verify each change in production.",
    problem:
      "An agent calling a write endpoint on someone else's behalf needs three things the REST API did not give it: a sign-in it can complete on its own, a way to see where a write will land before it commits, and a record of what it asked for and could not get.",
    architecture: [
      "A remote Model Context Protocol server with OAuth sign-in on the platform's existing Google login. Claude, ChatGPT, Cursor and Claude Code add it by URL. Every tool is scoped to the projects the signed-in account can already open",
      "Four tools live: list_projects, list_hotels, send_hotel_feedback, request_capability. Two more built and in review: list_my_feedback and reply_to_feedback",
      "Write tools run in two steps. The first call returns a preview that names the hotel and project the comment will land on; the second call, with a confirm token, writes. A refusal gives the slot back before any insert",
      "request_capability records what an agent asked for that the server cannot do yet. The roadmap for the next tools comes from that table rather than from guesswork",
      "Threaded customer feedback underneath: a migration, one write core shared by the REST API and the MCP, reply endpoints on two API surfaces, and OpenAPI specs. A reply drafted by a model carries an AI-generated marker through every read surface",
      "Every tool call mirrors one line to a Slack channel: who, which tool, the outcome. The team watches agent traffic without opening logs",
    ],
    outcomes: [
      "A customer can connect their assistant to YGO Console in four steps and ask about their hotels in plain language",
      "A hotel comment sent by an agent names its destination before it is written, and a wrong destination costs nothing",
      "The server tells the team what agents want next, in their own words",
    ],
    proof: [
      "Source evidence: the live server at mcp.ygo.ai exposes list_projects, list_hotels, send_hotel_feedback and request_capability",
      "Source count: 48 commits on main under my name in ygocloud since 7 Oct 2026, across 8 merged pull requests",
      "Source evidence: the customer install guide covers claude.ai, ChatGPT, Claude Code and Cursor",
      "Built and in review at the time of writing: list_my_feedback and reply_to_feedback, plus the threaded-reply migration and endpoints",
    ],
    evidenceNote:
      "Tool names and the sign-in flow verified against the live server and the customer install guide. Commit and PR counts are from the ygocloud repository on main. The threaded-reply work is counted as built, not shipped, until it merges.",
    stack: ["Go", "PostgreSQL", "MCP", "OAuth", "Redis / Asynq", "Slack API", "OpenAPI", "DigitalOcean"],
    featured: true,
  },
  {
    id: "evolve",
    name: "Evolve",
    tagline: "A case study became the platform plan, then I shipped it",
    org: "Evolve (via Honeycomb Software)",
    period: "Sep 2026 — Nov 2026",
    domain: "Clinical VR / cloud",
    angle: "PostgreSQL, the cloud layer, and session authority moved from the headset into the cloud",
    context:
      "Cloud platform for a clinical VR headset with biosensing. An operator at a partner site runs a session, the headset streams sensor samples, and the recording has to stay inside the organization that owns the device and the participant.",
    role:
      "Staff engineer. Before I joined I wrote a case study that proposed the cloud as the trust and session-orchestration plane, PostgreSQL as the application database, and session authority in the cloud. That became the plan. I owned the cloud layer, the database, and the session backend, delivered them with one other engineer, and held code-owner approval on their changes.",
    problem:
      "The platform had ingest but no trust layer: no application database, no tenant boundary, and the session state lived on the headset. Partner-site staff had to share a session with a device without one organization reading another's participants, devices, or recordings, and the rules had to hold even when a query forgets its filter.",
    architecture: [
      "PostgreSQL is the application store, introduced by this plan. TypeORM migrations define the schema, with the organization as the tenant key on every row. Sensor samples stay in InfluxDB",
      "Row-level security is keyed on the organization: 46 policies. Each service connects as its own least-privilege role that does not own the tables, because a table owner bypasses those policies without an error. RDS IAM token sign-in sits behind a switch",
      "Cognito identifies operators and devices. The token decides the organization, and a device credential resolves to the organization that owns the headset",
      "Session Authority in NestJS: the session state machine, operator takeover under a row lock, presence reconciliation, timers claimed from Postgres with SKIP LOCKED, and a typed command and refusal contract to the headset over Socket.IO",
      "The cloud layer in Terraform across five environments: a KMS key per environment for RDS, S3, Redis, MSK and DynamoDB, CloudFront security headers, SES. Seven GitHub Actions workflows for CI, deploys, and Terraform static checks. A LocalStack, Kafka, Redis and InfluxDB stack for local work",
      "React 18 operator app on Vite for a live headset session: run lifecycle, check-ins, consent, signal quality, live EEG spectra. A reports pipeline behind it: Kafka-backed export and report queues, a report worker, and a conformance-checked contract for the data-science code",
    ],
    outcomes: [
      "Tenant isolation sits in the schema and in row-level security, so a missed filter does not become a cross-organization read",
      "The session is a cloud record with one authority. The headset and the operator app both follow it",
      "Every environment encrypts its data under its own key, checked live in production, and an operator can run a session and get a report out the other end",
    ],
    proof: [
      "Source count: 90 TypeORM migrations and 46 row-level security policies in the local monorepo",
      "Source count: 270 commits on main under my name, 3 Sep 2026 to 1 Nov 2026",
      "Source count: five Terraform environments and seven GitHub Actions workflows",
      "Source evidence: ADRs under my name for the Kafka export queue, signal quality, and per-environment encryption",
      "Source evidence: the pre-hire case study names PostgreSQL, Cognito identity with Postgres membership, and the session state machine that the repo now contains",
    ],
    evidenceNote:
      "Schema, policies, environments and ADRs verified from the local evolve-cloud monorepo and shared-docs. I worked with one other engineer on this platform, and some of my database-layer commits landed under their account, so the count on main under my name is a floor.",
    stack: ["TypeScript", "NestJS", "React 18", "PostgreSQL", "TypeORM", "AWS Cognito", "KMS", "Kafka", "InfluxDB", "Terraform", "LocalStack"],
    featured: true,
  },
  {
    id: "cardmedic",
    name: "CardMedic",
    tagline: "Healthcare communication at NHS scale",
    org: "Blum Health",
    period: "2023 — 2026",
    domain: "Healthcare / NHS",
    angle: "Event-driven scale under clinical compliance",
    context:
      "Clinical communication platform used in NHS settings — multilingual content, machine + human translation, and speech, delivered to patients and staff at the bedside.",
    role:
      "Lead engineer across the backend services, admin surfaces, delivery coordination, and production translation operations.",
    problem:
      "Translate and maintain a clinical content library across many languages without throttling third-party APIs, losing jobs, or overwriting human-verified clinical wording.",
    architecture: [
      "9 independently deployable Node.js/TypeScript serverless services on AWS Lambda, API Gateway, DynamoDB, SQS/SNS, S3, and Cognito",
      "Translation rollout model uses language-specific queues, batching, dead-letter handling, and CloudWatch → SNS → Slack alerting",
      "NHS data compliance work includes encrypted transcript storage, multi-year retention, and HMAC verification on Xero webhooks",
      "Feature-flagged vendor migration path (SSM-driven routing) that let the platform swap translation providers without forking the codebase",
      "Flutter mobile app source includes 55 locale files, Cognito/AWS SDK integration, Azure speech, and i18n support",
    ],
    outcomes: [
      "Deployed across 20+ NHS trusts (CV / delivery record)",
      "100k+ translation jobs/month without API throttling (CV / delivery record)",
      "Human-verified translations protected by design — machine re-runs can never overwrite them",
    ],
    proof: [
      "Backend source: 9 top-level serverless services",
      "Mobile source: 55 locale JSON files",
      "Backend source: language-sharded SQS translation lanes with DLQ alerting",
      "CV/delivery record: 20+ NHS trusts and 100k+ jobs/month",
    ],
    evidenceNote:
      "Backend verified from local `cardmedic-cms`; mobile stack verified from local Flutter repo. Business rollout and monthly throughput are carried from the current CV.",
    stack: ["TypeScript", "Node.js", "AWS Lambda", "DynamoDB", "SQS/SNS", "Cognito", "Flutter", "React", "GitHub Actions"],
    featured: true,
  },
  {
    id: "ai-sight",
    name: "AI Sight Suite",
    tagline: "Clinical imaging AI, built like it's regulated — because it is",
    org: "Blum Health",
    period: "2024 — 2026",
    domain: "Medical imaging / AI",
    angle: "Cross-cloud AI inference inside a strict clinical domain model",
    context:
      "Diabetic retinopathy screening platform: clinicians upload retinal images, AI models grade them in real time, and every action lands in a clinical audit trail.",
    role:
      "Built backend domain and infrastructure pieces, integrated AI inference, and delivered the realtime clinical frontend experience.",
    problem:
      "Combine ML inference, DICOM imaging, multi-tenant licensing, and clinical audit obligations in one system — without letting compliance concerns leak into every layer of the code.",
    architecture: [
      ".NET 10 Clean Architecture backend — 108 HTTP attributes across 23 controllers, ~80 domain files, PostgreSQL via EF Core with 67 migration files",
      "LanguageExt Either/Option appears broadly in the backend for explicit, functional-style error handling instead of exception-driven flow",
      "Cross-cloud by design: Azure for hosting, AD B2C identity, and blob storage; AWS SageMaker for dual-model inference — primary and secondary models called concurrently with Signature V4 auth",
      "Tiered clinical audit: automated cleanup jobs enforce 5-year retention for non-clinical and 10-year for clinical logs",
      "DICOM ingestion pipelines, multi-encounter batch workflows, Xero B2B billing, and a licensing domain module gating features per tenant",
      "React 18 + Vite SPA with SignalR pushing AI grading results live; Konva-based image interaction; Testcontainers + SonarQube + dotCover in Bitbucket Pipelines; Terraform-managed Azure infra",
    ],
    outcomes: [
      "5,000+ retinal screenings across pilot clinics (CV / delivery record)",
      "Realtime grading UX — clinicians see AI results as they land, over SignalR",
      "Integration-tested against real PostgreSQL containers, not mocks",
    ],
    proof: [
      "Source count: 108 HTTP attributes across 23 controllers",
      "Source count: 67 EF migration files",
      "Source evidence: concurrent primary and secondary SageMaker calls",
      "CV/delivery record: 5,000+ screenings across pilot clinics",
    ],
    evidenceNote:
      "Source verified from `ai-sight-suite` and `ai-sight-infrastructure`; screening volume is a CV-carried delivery metric.",
    stack: [".NET 10", "C#", "PostgreSQL", "EF Core", "AWS SageMaker", "Azure AD B2C", "React 18", "Vite", "SignalR", "Terraform"],
    featured: true,
  },
  {
    id: "accentpos",
    name: "AccentPOS",
    tagline: "Restaurant commerce where the schema is the source of truth",
    org: "Blum Health",
    period: "2023 — 2026",
    domain: "Hospitality SaaS",
    angle: "Integration-heavy commerce on a declarative GraphQL core",
    context:
      "Multi-site restaurant and venue platform — ordering, stock, payments, delivery aggregation, and finance — live across 30+ venues.",
    role:
      "Designed the Hasura/Fastify split, payment and integration flows, Cognito-to-Hasura auth, and React operations surfaces.",
    problem:
      "Keep GraphQL data access declarative while payments, delivery, and accounting integrations demand imperative business logic — and keep every tenant's data strictly isolated.",
    architecture: [
      "Hasura + Fastify split: 14 trigger-enabled Hasura tables route data changes into a Fastify service with integration/domain modules for payments, Deliverect, Xero, Cognito, ordering, and stock",
      "PostgreSQL schema-as-code backbone: 326 SQL migrations as the single source of truth",
      "Commerce flows end to end: create/capture payments, QR payment links with 10-minute expiry and automated expiry sweeps, served/takeaway/delivery order paths",
      "Custom Cognito → Hasura auth bridge built from scratch: JWK fetch, key caching, JWT verification, and session variables enforcing row-level tenant isolation on nearly every table",
      "Runtime theming: the customer-facing QR storefront pulls per-venue colours from backend config",
      "React operations platform with Apollo split-link subscriptions (live order board over WebSocket), Material-UI, DevExpress Scheduler, drag-and-drop; Docker Compose + Traefik local dev",
    ],
    outcomes: [
      "Live across 30+ venues on one codebase (CV / delivery record)",
      "PayPal, Dojo, Deliverect, and Xero integrated behind one webhook architecture",
      "Tenant isolation enforced at the row level, not in application code",
    ],
    proof: [
      "Source count: 326 SQL migration versions",
      "Source count: 14 trigger-enabled Hasura tables",
      "Source evidence: Cognito → Hasura JWT bridge with row-level tenant isolation",
      "CV/delivery record: 30+ live venues",
    ],
    evidenceNote:
      "Core monorepo verified from local `apos-suite`; Flutter client and Terraform infra are in adjacent local repos. Venue count is CV-carried.",
    stack: ["Hasura", "GraphQL", "Fastify", "Node.js", "PostgreSQL", "AWS Cognito", "React", "Apollo", "PayPal", "Xero"],
    featured: true,
  },
  {
    id: "wunder",
    name: "Wunder AI / cosnova",
    tagline: "One platform behind festival apps and B2B insight tools",
    org: "Wunder AI",
    period: "2020 — 2023",
    domain: "Consumer media & insights",
    angle: "Multi-brand consumer products on a shared Go/GraphQL platform",
    context:
      "Connected product ecosystem for cosnova Beauty: consumer festival experiences (Playtime), B2B insight dashboards (Target Group), and a shared Go/GraphQL backend monorepo.",
    role:
      "Built React/Apollo frontends, realtime session mirroring, graph visualisations, and contributed to the shared Go/gqlgen platform.",
    problem:
      "Serve many branded consumer apps and a B2B analytics product from one platform — including mirroring live consumer sessions into the B2B tool in real time.",
    architecture: [
      "Playtime: one React SPA with Apollo GraphQL, Scandit barcode scanning, adaptive video, maps, and a large feature/template surface for branded festival experiences",
      "Target Group: Cytoscape and D3 graph visualisations over consumer insight data",
      "LiveMind session mirroring: the B2B app embeds the consumer SPA via iframe and mirrors participant activity through shared GraphQL subscriptions",
      "cosnova-mono: 49 Go command binaries and 714 Go files, including layered l1/l2/l3 services, with 6 gqlgen configurations",
      "Persistence and streaming references include Dgraph, PostgreSQL, Redis-compatible clients, and Kafka",
      "Rule-based inference engine that compiles a declarative rule book into generated Go code for consumer profiling",
      "Drone → Kaniko → ACR delivery and Kubernetes/GitOps patterns are present in the platform history; Prometheus metrics are visible in GraphQL layers",
    ],
    outcomes: [
      "100k+ festival attendees reached through Playtime (CV / delivery record)",
      "Realtime consumer-to-B2B session mirroring shipped on shared GraphQL subscriptions",
      "One monorepo platform behind every consumer and B2B product",
    ],
    proof: [
      "Source count: 714 Go files and 49 Go command binaries",
      "Source count: 6 gqlgen configs",
      "Source evidence: Apollo subscriptions and LiveMind iframe mirroring",
      "CV/delivery record: 100k+ festival attendees",
    ],
    evidenceNote:
      "Source verified from `cosnova-mono`, `playtime-festival-quiz`, and `target-group-frontend`. Attendee reach is CV-carried.",
    stack: ["React", "TypeScript", "Go", "gqlgen", "Apollo", "Dgraph", "Kafka", "Redis", "Kubernetes", "ArgoCD"],
    featured: true,
  },
]

export const getCaseStudy = (id: string) => caseStudies.find((c) => c.id === id)
