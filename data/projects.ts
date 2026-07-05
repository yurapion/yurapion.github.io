export interface CaseStudy {
  id: string
  name: string
  tagline: string
  org: string
  period: string
  domain: string
  angle: string
  context: string
  problem: string
  architecture: string[]
  outcomes: string[]
  stack: string[]
  featured: boolean
}

// Every figure below is either counted directly from the source repositories
// (endpoints, queues, migrations, locales, services) or is an operational
// metric carried over from the verified CV. No estimated or invented numbers.
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
    problem:
      "Translate and maintain a full clinical content library across 55 languages without throttling third-party APIs, losing jobs, or ever overwriting human-verified clinical translations.",
    architecture: [
      "9 independently deployable Node.js/TypeScript microservices on AWS Lambda, API Gateway, DynamoDB, SQS/SNS, S3, and Cognito — 244 REST endpoints across dev, UAT, and production",
      "Translation pipeline sharded across 21 SQS queues (27 total) with batching, dead-letter queues, and CloudWatch → SNS → Slack alerting — sustaining 100k+ translation jobs per month",
      "NHS data compliance: AES-256-GCM encryption at rest for transcripts, 8-year retention, HMAC-SHA256 verification on Xero webhooks",
      "Feature-flagged vendor migration path (SSM-driven routing) that let the platform swap translation providers without forking the codebase",
      "Flutter app with 55 locales, three-layer RTL detection (Bidi heuristics → API-driven codes → curated fallbacks); backend deployed via multi-region GitHub Actions CI/CD",
    ],
    outcomes: [
      "Deployed across NHS trusts in three environments",
      "100k+ translation jobs/month without API throttling",
      "Human-verified translations protected by design — machine re-runs can never overwrite them",
    ],
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
    problem:
      "Combine ML inference, DICOM imaging, multi-tenant licensing, and clinical audit obligations in one system — without letting compliance concerns leak into every layer of the code.",
    architecture: [
      ".NET 10 Clean Architecture backend — 108 REST endpoints across 23 controllers, ~80 domain types, PostgreSQL via EF Core with 68 migrations",
      "LanguageExt Either/Option throughout (170 files) for explicit, functional-style error handling instead of exception-driven flow",
      "Cross-cloud by design: Azure for hosting, AD B2C identity, and blob storage; AWS SageMaker for dual-model inference — primary and secondary models called concurrently with Signature V4 auth",
      "Tiered clinical audit: automated cleanup jobs enforce 5-year retention for non-clinical and 10-year for clinical logs",
      "DICOM ingestion pipelines, multi-encounter batch workflows, Xero B2B billing, and a licensing domain module gating features per tenant",
      "React 18 + Vite SPA with SignalR pushing AI grading results live; Konva-based image interaction; Testcontainers + SonarQube + dotCover in Bitbucket Pipelines; Terraform-managed Azure infra",
    ],
    outcomes: [
      "5,000+ retinal screenings processed across pilot clinics",
      "Realtime grading UX — clinicians see AI results as they land, over SignalR",
      "Integration-tested against real PostgreSQL containers, not mocks",
    ],
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
    problem:
      "Keep GraphQL data access declarative while payments, delivery, and accounting integrations demand imperative business logic — and keep every tenant's data strictly isolated.",
    architecture: [
      "Hasura + Fastify split: 14 tables wired to 40 event-trigger webhooks route data changes into a Fastify service with 19 integration/domain modules (payments, Deliverect, Xero, Cognito, ordering, stock…)",
      "PostgreSQL schema-as-code backbone: 326 SQL migrations as the single source of truth",
      "Commerce flows end to end: create/capture payments, QR payment links with 10-minute expiry and automated expiry sweeps, served/takeaway/delivery order paths",
      "Custom Cognito → Hasura auth bridge built from scratch: JWK fetch, key caching, JWT verification, and session variables enforcing row-level tenant isolation on nearly every table",
      "Runtime theming: the customer-facing QR storefront pulls per-venue colours from backend config",
      "React operations platform with Apollo split-link subscriptions (live order board over WebSocket), Material-UI, DevExpress Scheduler, drag-and-drop; Docker Compose + Traefik local dev",
    ],
    outcomes: [
      "Live across 30+ venues on one codebase",
      "PayPal, Dojo, Deliverect, and Xero integrated behind one webhook architecture",
      "Tenant isolation enforced at the row level, not in application code",
    ],
    stack: ["Hasura", "GraphQL", "Fastify", "Node.js", "PostgreSQL", "AWS Cognito", "React", "Apollo", "PayPal", "Xero"],
    featured: true,
  },
  {
    id: "wunder",
    name: "Wunder AI / cosnova",
    tagline: "One platform, twenty brand experiences, festival-scale traffic",
    org: "Wunder AI",
    period: "2020 — 2023",
    domain: "Consumer media & insights",
    angle: "Multi-brand consumer products on a shared Go/GraphQL platform",
    context:
      "Connected product ecosystem for cosnova Beauty: consumer festival experiences (Playtime), B2B insight dashboards (Target Group), and a shared Go/GraphQL backend monorepo.",
    problem:
      "Serve many branded consumer apps and a B2B analytics product from one platform — including mirroring live consumer sessions into the B2B tool in real time.",
    architecture: [
      "Playtime: one React SPA driving 20 branded app configurations — 70 template types including adaptive video, maps, and Scandit barcode scanning — reaching 100k+ festival attendees",
      "Target Group: Cytoscape and D3 graph visualisations over consumer insight data",
      "LiveMind session mirroring: the B2B app embeds the consumer SPA via iframe and mirrors participant activity through shared GraphQL subscriptions",
      "cosnova-mono: 44 Go services (710 Go files) in a layered l1/l2/l3 architecture, 5 gqlgen GraphQL schemas, polyglot persistence across Dgraph, PostgreSQL, KeyDB, and Kafka",
      "Rule-based inference engine that compiles a declarative rule book into generated Go code for consumer profiling",
      "Drone → Kaniko → ACR → Kubernetes delivery with Flux/ArgoCD GitOps, Helm, Prometheus/Grafana/Loki, and a Backstage service catalogue",
    ],
    outcomes: [
      "100k+ festival attendees reached through Playtime experiences",
      "Realtime consumer-to-B2B session mirroring shipped on shared GraphQL subscriptions",
      "One monorepo platform behind every consumer and B2B product",
    ],
    stack: ["React", "TypeScript", "Go", "gqlgen", "Apollo", "Dgraph", "Kafka", "KeyDB", "Kubernetes", "ArgoCD"],
    featured: true,
  },
]

export const getCaseStudy = (id: string) => caseStudies.find((c) => c.id === id)
