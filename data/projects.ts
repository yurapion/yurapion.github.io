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
    id: "cardmedic",
    name: "CardMedic",
    tagline: "Healthcare communication at NHS scale",
    org: "Blum Health",
    period: "2023 — Present",
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
    period: "2024 — Present",
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
    period: "2023 — Present",
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
