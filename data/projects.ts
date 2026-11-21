export interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  org: string;
  period: string;
  domain: string;
  angle: string;
  context: string;
  role: string;
  problem: string;
  architecture: string[];
  outcomes: string[];
  proof: string[];
  evidenceNote: string;
  stack: string[];
  featured: boolean;
}

// Figures below are either counted from local source repositories or carried
// from the current CV/delivery record. Copy calls out the difference instead
// of presenting business outcomes as source-code counts.
export const caseStudies: CaseStudy[] = [
  {
    id: "ygo-console-mcp",
    name: "YGO Console MCP",
    tagline:
      "An agent reads a customer's hotels and leaves feedback, and sees where it is writing first",
    org: "YGO",
    period: "Oct 2026 — Present",
    domain: "B2B travel / agent-facing API",
    angle:
      "A remote MCP server on a Go backend, with feedback tools that preview before they write",
    context:
      "YGO licenses an AI travel platform to tour operators. Their staff already use Claude and ChatGPT, and they wanted those assistants to answer questions about their own projects and hotels, and to send a hotel comment to the review team, without a new UI.",
    role: "AI Product Engineer. A colleague created the read-only prototype. I took it to a product customers use: the write tools, request_capability, feedback listing and replies, logging and monitoring, and the threaded-feedback backend and UI under it. I plan and verify each change; agents write much of the code.",
    problem:
      "An agent calling a write endpoint on someone else's behalf needs three things the REST API did not give it: a sign-in it can complete on its own, a way to see where a write will land before it commits, and a record of what it asked for and could not get.",
    architecture: [
      "A remote Model Context Protocol server with OAuth sign-in on the platform's existing Google login. Claude, ChatGPT, Cursor and Claude Code add it by URL. Every tool is scoped to the projects the signed-in account can already open",
      "Seven tools: list_projects, list_hotels, list_my_feedback, list_hotel_requests, send_hotel_feedback, reply_to_feedback and request_capability. Each is marked read-only or not",
      "Write tools run in two steps. The first call returns a preview that names the hotel and project the comment will land on; the second call, with a confirm token, writes. A refusal gives the slot back before any insert",
      "request_capability records what a user asked for that the server cannot do yet and passes it to the product team",
      "Threaded customer feedback underneath: a schema migration, one write core shared by the REST API and the MCP tools, reply and thread endpoints, OpenAPI docs and the SvelteKit UI",
      "Monitoring: one structured log line per tool call, signals for tool panics and sign-in failures, a BetterStack dashboard with monitors, and a Slack mirror of the calls during the beta",
    ],
    outcomes: [
      "A customer can connect their assistant to YGO Console in four steps and ask about their hotels in plain language",
      "A hotel comment sent by an agent names its destination before it is written, and a wrong destination costs nothing",
      "The server tells the team what agents want next, in their own words",
    ],
    proof: [
      "Source evidence: the live server at mcp.ygo.ai exposes the tools listed above",
      "Source count: 21 of the service's 34 commits and about 70% of its code are mine; 34 pull requests merged in about five weeks",
      "Source evidence: the customer install guide covers claude.ai, ChatGPT, Claude Code and Cursor",
      "Source evidence: the threaded-feedback migration, endpoints and UI are in the ygocloud repository",
    ],
    evidenceNote:
      "Tool names and the sign-in flow verified against the live server and the customer install guide. Commit counts are from the ygocloud repository history.",
    stack: [
      "Go",
      "PostgreSQL",
      "MCP",
      "OAuth",
      "Redis / Asynq",
      "Slack API",
      "OpenAPI",
      "DigitalOcean",
    ],
    featured: true,
  },
  {
    id: "evolve",
    name: "Evolve",
    tagline:
      "I wrote the Session Authority records and built it with a second engineer",
    org: "Evolve (via Honeycomb Software)",
    period: "Sep 2026 — Nov 2026",
    domain: "Clinical VR / cloud",
    angle:
      "Session authority moved from the headset into the cloud, with the database connection secured",
    context:
      "Cloud platform for a clinical VR headset with biosensing. An operator at a partner site runs a session, the headset streams sensor samples, and the recording has to stay inside the organization that owns the device and the participant.",
    role: "Staff engineer. I joined through an architecture case study. It proposed PostgreSQL with row-level security and the organisation as the tenant key, when the design had no relational store, and the team adopted it within two weeks. I worked with the second engineer on the first tables, then built the session, device and consent tables. I wrote the four architecture decision records for Session Authority, which moves control of a live session from the headset to the cloud, and built it with the second engineer. I planned the full-stack work for the two of us. The team had five people.",
    problem:
      "The platform had ingest but no trust layer: no application database, no tenant boundary, and the session state lived on the headset. Partner-site staff had to share a session with a device without one organization reading another's participants, devices, or recordings, and the rules had to hold even when a query forgets its filter.",
    architecture: [
      "PostgreSQL is the application store. TypeORM migrations define the schema, with the organization as the tenant key on every row. Sensor samples stay in InfluxDB",
      "Row-level security is keyed on the organization: 46 policies. My part was the connection: RDS IAM token sign-in behind a switch, TLS that verifies the certificate and refuses plaintext, and services that sign in as a least-privilege role that does not own the tables, because a table owner bypasses those policies without an error",
      "Cognito identifies operators and devices. The token decides the organization, and a device credential resolves to the organization that owns the headset",
      "Session Authority in NestJS: session state is a journal plus a projected row, operator control is a lease reconciled under a row lock, timers are claimed from PostgreSQL with SKIP LOCKED, and commands and refusals to the headset are typed messages over Socket.IO. Each release has to work with the one before it",
      "The cloud layer is Terraform across five environments. My part: KMS encryption at rest per environment (with its decision record), Redis TLS, a content security policy for the Cognito sign-in pages, and the applies on the dev environment. Seven GitHub Actions workflows cover CI, deploys, and Terraform static checks",
      "React 18 operator app on Vite for a live headset session. I built about a third of it: create and start, live view, check-ins and consent, signal quality, EEG spectra. I also built the session-report queue and worker on Kafka",
    ],
    outcomes: [
      "Tenant isolation sits in the schema and in row-level security, and the end-to-end tests run two organisations on virtual headsets to check it",
      "The session is a cloud record with one authority. The headset and the operator app both follow it",
      "Every environment encrypts its data at rest under its own key, and an operator can run a session and get a report out the other end",
    ],
    proof: [
      "Source count: 90 TypeORM migrations and 46 row-level security policies in the local monorepo",
      "Source count: 201 pull requests merged across 183 tickets in 11 weeks. I split the Session Authority epic into 26 tickets with a dependency graph and re-planned the board when scope changed",
      "Source count: five Terraform environments and seven GitHub Actions workflows",
      "Source evidence: 9 ADRs and an RFC on the end-to-end test approach under my name, including the four for Session Authority",
      "Source evidence: Session Authority design records and code in the evolve-cloud monorepo",
    ],
    evidenceNote:
      "Schema, policies, environments and ADRs verified from the local evolve-cloud monorepo and shared-docs. The schema and policy counts describe the platform, which a team of five built; they are not all my work.",
    stack: [
      "TypeScript",
      "NestJS",
      "React 18",
      "PostgreSQL",
      "TypeORM",
      "AWS Cognito",
      "KMS",
      "Kafka",
      "InfluxDB",
      "Terraform",
      "LocalStack",
    ],
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
    role: "The only engineer on CardMedic from 2023, directing an intern. I owned the whole platform: the backend services, the React admin, the Flutter app and production translation operations. I scaled and ran the content-translation pipeline.",
    problem:
      "Translate and maintain a clinical content library across many languages without throttling third-party APIs, losing jobs, or overwriting human-verified clinical wording.",
    architecture: [
      "9 independently deployable Node.js/TypeScript serverless services and 244 REST endpoints on AWS Lambda, API Gateway, DynamoDB, SQS/SNS, S3, and Cognito, across dev, UAT and production",
      "Translation work is sharded over 22 SQS queues, with batching, a dead-letter queue, and CloudWatch → SNS → Slack alerting",
      "In-app calls through Twilio, with call transcripts encrypted with AES-256 and kept for 8 years under NHS retention rules, and single sign-on through Cognito and Microsoft Entra ID",
      "Feature-flagged vendor migration path (SSM-driven routing) that let the platform swap translation providers without forking the codebase. An AI agent runs each language rollout from a written runbook",
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
      "Backend source: 22 SQS translation queues with DLQ alerting, and 244 REST endpoints",
      "CV/delivery record: 20+ NHS trusts and 100k+ jobs/month",
    ],
    evidenceNote:
      "Backend verified from local `cardmedic-cms`; mobile stack verified from local Flutter repo. Business rollout and monthly throughput are carried from the current CV.",
    stack: [
      "TypeScript",
      "Node.js",
      "AWS Lambda",
      "DynamoDB",
      "SQS/SNS",
      "Cognito",
      "Flutter",
      "React",
      "GitHub Actions",
    ],
    featured: true,
  },
  {
    id: "ai-sight",
    name: "AI Sight Suite",
    tagline: "Clinical imaging AI, built like it's regulated — because it is",
    org: "Blum Health",
    period: "Nov 2023 — Jun 2025",
    domain: "Medical imaging / AI",
    angle: "Cross-cloud AI inference inside a strict clinical domain model",
    context:
      "Diabetic retinopathy screening platform: clinicians upload retinal images, AI models grade them in real time, and every action lands in a clinical audit trail.",
    role: "About a third of the commits on the backend. I built the Xero billing integration alone: an admin connects an organisation over OAuth, the system counts the images screened in a billing period, prices them and creates a draft invoice in Xero. I extended licensing, and worked on the pipeline that sends retinal images to two trained models on AWS SageMaker. I did not build that pipeline.",
    problem:
      "Combine ML inference, DICOM imaging, multi-tenant licensing, and clinical audit obligations in one system — without letting compliance concerns leak into every layer of the code.",
    architecture: [
      ".NET 10 Clean Architecture backend: 108 HTTP attributes across 23 controllers, PostgreSQL via EF Core with 67 migration files",
      "LanguageExt Either/Option appears broadly in the backend for explicit, functional-style error handling instead of exception-driven flow",
      "Cross-cloud: Azure for hosting, AD B2C identity, and blob storage; AWS SageMaker for dual-model inference, with primary and secondary models called concurrently with Signature V4 auth. I worked on this pipeline but did not build it",
      "Tiered clinical audit: automated cleanup jobs enforce 5-year retention for non-clinical and 10-year for clinical logs",
      "DICOM ingestion pipelines, multi-encounter batch workflows, Xero B2B billing, and a licensing domain module: features such as instant grading, bulk upload and AI thresholds are switched per licence tier, and each organisation's licence keeps a snapshot of its configuration",
      "React 18 + Vite SPA with SignalR pushing AI grading results live; Konva-based image interaction; Testcontainers + SonarQube + dotCover in Bitbucket Pipelines",
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
      "Source verified from `ai-sight-suite`; screening volume is a CV-carried delivery metric.",
    stack: [
      ".NET 10",
      "C#",
      "PostgreSQL",
      "EF Core",
      "AWS SageMaker",
      "Azure AD B2C",
      "React 18",
      "Vite",
      "SignalR",
    ],
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
    role: "I built the PayPal integration (merchant onboarding, order creation and capture, refunds with idempotency keys, verified webhooks) and the online and QR payment pages. The Hasura and Fastify split, the auth bridge, and the Dojo, Deliverect and Xero integrations below were colleagues' work, not mine.",
    problem:
      "Keep GraphQL data access declarative while payments, delivery, and accounting integrations demand imperative business logic — and keep every tenant's data strictly isolated.",
    architecture: [
      "Hasura + Fastify split: 14 trigger-enabled Hasura tables route data changes into a Fastify service with integration/domain modules for payments, Deliverect, Xero, Cognito, ordering, and stock",
      "PostgreSQL schema-as-code backbone: 326 SQL migrations as the single source of truth",
      "Commerce flows end to end: create/capture payments, QR payment links with 10-minute expiry and automated expiry sweeps, served/takeaway/delivery order paths",
      "Custom Cognito → Hasura auth bridge: JWK fetch, key caching, JWT verification, and session variables enforcing row-level tenant isolation on nearly every table",
      "Runtime theming: the customer-facing QR storefront pulls per-venue colours from backend config",
      "React operations platform with Apollo split-link subscriptions (live order board over WebSocket), Material-UI, DevExpress Scheduler, drag-and-drop; Docker Compose + Traefik local dev",
    ],
    outcomes: [
      "Live across 30+ venues on one codebase (CV / delivery record)",
      "PayPal, Dojo, Deliverect, and Xero integrated behind one webhook architecture (I built the PayPal part)",
      "Tenant isolation enforced at the row level, not in application code",
    ],
    proof: [
      "Source count: 326 SQL migration versions",
      "Source count: 14 trigger-enabled Hasura tables",
      "Source evidence: Cognito → Hasura JWT bridge with row-level tenant isolation",
      "CV/delivery record: 30+ live venues",
    ],
    evidenceNote:
      "Core monorepo verified from local `apos-suite`. Architecture counts describe the platform; my own work is the feature list above. Venue count is CV-carried.",
    stack: [
      "Hasura",
      "GraphQL",
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "AWS Cognito",
      "React",
      "Apollo",
      "PayPal",
      "Xero",
    ],
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
      "Interactive campaign apps (Playtime) and a B2B insight product for consumer brands (Cosnova, Eurail, Bacardi), on a shared Go and GraphQL backend monorepo.",
    role: "Main author of Playtime (about two thirds of the commits) and of the insight front end (about three quarters of the commits). In my first year I worked in the Go and gqlgen monorepo: the rule editor UI, OAuth sign-in for the studio app, and small Go changes. Clients: Cosnova, Eurail, Bacardi.",
    problem:
      "Serve many branded consumer apps and a B2B analytics product from one platform — including mirroring live consumer sessions into the B2B tool in real time.",
    architecture: [
      "Playtime: one React codebase that renders each client's app from CMS JSON, with 56 template types loaded on demand: quizzes, swipe cards, a jump-and-run game, maps and adaptive video",
      "Insight front end: graph views of consumer, brand and product data, built with Cytoscape and D3",
      "LiveMind: a live session view where GraphQL subscriptions over WebSocket drive a D3 graph",
      "cosnova-mono: 49 Go command binaries and 714 Go files, including layered l1/l2/l3 services, with 6 gqlgen configurations",
      "Persistence and streaming references include Dgraph, PostgreSQL, Redis-compatible clients, and Kafka",
      "Rule-based inference engine that compiles a declarative rule book into generated Go code for consumer profiling",
      "Releases went through a Drone, Kaniko and Kubernetes pipeline with ArgoCD. That setup was a colleague's, not mine",
    ],
    outcomes: [
      "100k+ festival attendees reached through Playtime (CV / delivery record)",
      "LiveMind live session view shipped on GraphQL subscriptions over WebSocket",
      "One monorepo platform behind every consumer and B2B product",
    ],
    proof: [
      "Source count: 714 Go files and 49 Go command binaries",
      "Source count: 6 gqlgen configs",
      "Source evidence: GraphQL subscriptions driving the LiveMind D3 graph",
      "CV/delivery record: 100k+ festival attendees",
    ],
    evidenceNote:
      "Source verified from `cosnova-mono`, `playtime-festival-quiz`, and `target-group-frontend`. Attendee reach is CV-carried.",
    stack: [
      "React",
      "TypeScript",
      "Go",
      "gqlgen",
      "Apollo",
      "Dgraph",
      "Kafka",
      "Redis",
      "Kubernetes",
      "ArgoCD",
    ],
    featured: true,
  },
];

export const getCaseStudy = (id: string) =>
  caseStudies.find((c) => c.id === id);
