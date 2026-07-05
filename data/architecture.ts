// System-architecture data per case study. Layers flow top → bottom.
// Every node label and number is drawn from the verified source repositories.

export interface ArchNode {
  label: string
  note?: string
  accent?: boolean
}

export interface ArchLayer {
  tier: string
  nodes: ArchNode[]
}

export interface Stat {
  value: string
  label: string
}

export interface Decision {
  title: string
  body: string
}

export interface ProjectArchitecture {
  id: string
  pattern: string
  stats: Stat[]
  layers: ArchLayer[]
  decisions: Decision[]
  optimizedFor: string[]
  retro: string
}

export const architectures: ProjectArchitecture[] = [
  {
    id: "cardmedic",
    pattern: "Event-driven serverless · AWS",
    stats: [
      { value: "9", label: "microservices" },
      { value: "244", label: "REST endpoints" },
      { value: "21", label: "sharded SQS queues" },
      { value: "55", label: "locales" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [
          { label: "Flutter app", note: "55 locales · 3-layer RTL" },
          { label: "React admin platform" },
        ],
      },
      {
        tier: "API & edge",
        nodes: [
          { label: "API Gateway", note: "244 REST endpoints" },
          { label: "Cognito", note: "auth" },
        ],
      },
      {
        tier: "Compute",
        nodes: [
          { label: "9 Lambda microservices", note: "auth · account · user · bookmark · analytics · content · speech · translation-admin ×2", accent: true },
        ],
      },
      {
        tier: "Async pipeline",
        nodes: [
          { label: "21 sharded TranslateQueues", note: "batched per language", accent: true },
          { label: "Polly · BSL · Recording queues" },
          { label: "DLQ → CloudWatch → SNS → Slack" },
        ],
      },
      {
        tier: "External",
        nodes: [{ label: "Smartcat MT", note: "3-tier routing: instant · human-review · batch" }],
      },
      {
        tier: "Data",
        nodes: [
          { label: "DynamoDB", note: "AES-256-GCM · 8-yr retention" },
          { label: "S3" },
        ],
      },
    ],
    decisions: [
      {
        title: "Shard the translation queue by language",
        body: "A single translate queue would have hot-spotted and throttled the vendor API at 100k+ jobs/month. 21 language shards each batch independently, so one busy language never starves the rest.",
      },
      {
        title: "Feature-flag the vendor, don't fork the code",
        body: "An SSM-driven router selects the translation provider at runtime. Swapping vendors (or migrating off Smartcat) is a config change, not a rewrite — vendor risk stops being code risk.",
      },
      {
        title: "Make human-verified content un-overwritable",
        body: "The pipeline skips anything a clinician has marked verified. A mass machine re-translation of the whole card set physically cannot clobber approved clinical wording.",
      },
    ],
    optimizedFor: ["Never overwrite verified clinical content", "Throughput without vendor throttling", "Swap vendors without a rewrite"],
    retro:
      "Signature verification currently covers the Xero webhook; I'd extend HMAC checks to every inbound integration rather than lean on the network boundary for the rest — and make the 21 shards a dynamic count so throughput scales without a redeploy.",
  },
  {
    id: "ai-sight",
    pattern: "Cross-cloud · Clean Architecture · .NET 10",
    stats: [
      { value: "108", label: "REST endpoints" },
      { value: "~80", label: "domain types" },
      { value: "68", label: "EF migrations" },
      { value: "2×", label: "concurrent AI models" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [
          { label: "React 18 + Vite SPA" },
          { label: "SignalR", note: "live grading updates" },
          { label: "Konva", note: "image canvas" },
        ],
      },
      {
        tier: "Identity",
        nodes: [{ label: "Azure AD B2C" }],
      },
      {
        tier: "Backend",
        nodes: [
          { label: ".NET 10 Clean Architecture", note: "108 endpoints · 23 controllers · ~80 domain types", accent: true },
          { label: "LanguageExt", note: "Either / Option — 170 files" },
        ],
      },
      {
        tier: "AI inference",
        nodes: [{ label: "AWS SageMaker — dual model", note: "primary + secondary, concurrent · SigV4", accent: true }],
      },
      {
        tier: "Data",
        nodes: [
          { label: "PostgreSQL / EF Core", note: "68 migrations" },
          { label: "Azure Blob" },
        ],
      },
      {
        tier: "Integrations & audit",
        nodes: [
          { label: "DICOM pipelines" },
          { label: "Xero billing" },
          { label: "Tiered audit", note: "5 / 10-yr retention" },
        ],
      },
      {
        tier: "Infra & CI",
        nodes: [
          { label: "Terraform (Azure)" },
          { label: "Testcontainers" },
          { label: "SonarQube + dotCover" },
        ],
      },
    ],
    decisions: [
      {
        title: "Errors as values, not exceptions",
        body: "LanguageExt Either/Option puts failure in the type signature. The compiler forces every clinical path to handle its error cases instead of trusting an exception to be caught somewhere upstream.",
      },
      {
        title: "Cross-cloud on purpose",
        body: "Azure runs identity, hosting, and blob storage; AWS does nothing but SageMaker inference, reached over SigV4-signed calls. Each cloud does what it's strongest at rather than forcing one to do everything.",
      },
      {
        title: "Two models, one grade",
        body: "Primary and secondary models run concurrently, so every grading result carries a second opinion by construction rather than riding on one model for a clinical decision.",
      },
    ],
    optimizedFor: ["Explicit failure over silent exceptions", "Auditability the regulator can check", "Real-time feedback to the clinician"],
    retro:
      "The cross-cloud split earns best-of-both but adds a network hop and two IAM models to reason about; next time I'd invest earlier in unified secrets and observability spanning Azure and AWS, so the seam costs less to operate.",
  },
  {
    id: "accentpos",
    pattern: "Declarative GraphQL core · event-driven writes",
    stats: [
      { value: "326", label: "SQL migrations" },
      { value: "40", label: "event triggers" },
      { value: "19", label: "webhook modules" },
      { value: "30+", label: "live venues" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [
          { label: "React ops platform", note: "Apollo subscriptions · MUI · DevExpress Scheduler" },
          { label: "QR storefront", note: "per-venue runtime theming" },
        ],
      },
      {
        tier: "Data & API",
        nodes: [{ label: "Hasura GraphQL + PostgreSQL", note: "326 migrations — schema as source of truth", accent: true }],
      },
      {
        tier: "Event layer",
        nodes: [{ label: "14 tables → 40 event triggers", accent: true }],
      },
      {
        tier: "Business logic",
        nodes: [{ label: "Fastify webhook service", note: "19 domain modules" }],
      },
      {
        tier: "Auth",
        nodes: [{ label: "Cognito → Hasura JWT bridge", note: "JWK · row-level tenant isolation" }],
      },
      {
        tier: "External",
        nodes: [
          { label: "PayPal" },
          { label: "Dojo" },
          { label: "Deliverect" },
          { label: "Xero" },
        ],
      },
    ],
    decisions: [
      {
        title: "The schema is the contract",
        body: "326 migrations are the single backbone. The GraphQL API, permission rules, and event triggers are all derived from the schema — there's no second source of truth to drift out of sync.",
      },
      {
        title: "Declarative reads, imperative writes",
        body: "Hasura serves data declaratively; anything with side effects — payments, delivery, accounting — fires an event trigger into Fastify. Business logic never leaks into the data-access layer.",
      },
      {
        title: "Isolate tenants in the database, not the app",
        body: "A hand-built Cognito→Hasura bridge injects session variables so row-level filters enforce tenant isolation on nearly every table. Safety doesn't depend on app code remembering to filter.",
      },
    ],
    optimizedFor: ["One schema as the contract", "Side effects isolated from data access", "Multi-tenant safety enforced by the DB"],
    retro:
      "Per-venue theming is config-driven on the customer storefront but still hardcoded in the internal ops app — I'd bring both under one runtime-config path, and budget the Material-UI v4 → v5 migration before it becomes a wall.",
  },
  {
    id: "wunder",
    pattern: "Layered Go platform · GraphQL · GitOps",
    stats: [
      { value: "44", label: "Go services" },
      { value: "710", label: "Go files" },
      { value: "5", label: "GraphQL schemas" },
      { value: "20", label: "brand configs" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [
          { label: "Playtime SPA", note: "20 brands · 70 templates · Scandit scan" },
          { label: "Target Group", note: "Cytoscape / D3" },
          { label: "LiveMind", note: "iframe + subscription mirror" },
        ],
      },
      {
        tier: "GraphQL",
        nodes: [{ label: "5 gqlgen schemas", note: "Apollo + WebSocket" }],
      },
      {
        tier: "Services",
        nodes: [{ label: "44 Go services", note: "l1 edge · l2 domain · l3 decision", accent: true }],
      },
      {
        tier: "Inference",
        nodes: [{ label: "Rule-book → generated Go", note: "declarative rules, native speed", accent: true }],
      },
      {
        tier: "Data pipeline",
        nodes: [
          { label: "KeyDB → Kafka → Dgraph", note: "Benthos jobs" },
          { label: "PostgreSQL" },
        ],
      },
      {
        tier: "Platform",
        nodes: [
          { label: "Drone → Kaniko → K8s" },
          { label: "Flux / ArgoCD" },
          { label: "Prometheus / Grafana / Loki" },
          { label: "Backstage" },
        ],
      },
    ],
    decisions: [
      {
        title: "Tier the services, don't mesh them",
        body: "44 services split into l1 edge / l2 domain / l3 decision layers. A request flows down through clear responsibility boundaries instead of a free-for-all where any service can call any other.",
      },
      {
        title: "Compile the rules, don't interpret them",
        body: "Consumer-profiling rules are authored as a declarative rule book that compiles to generated Go. Non-engineers can read the rules; the runtime pays no interpreter tax.",
      },
      {
        title: "One SPA, twenty brands",
        body: "Playtime pulls brand config at runtime, so 20 festival brands and 70 template types ship from a single codebase — not 20 forks drifting apart.",
      },
    ],
    optimizedFor: ["Clear boundaries at 44 services", "Rules readable by humans, native at runtime", "One codebase across 20 brands"],
    retro:
      "Brand setup is split between runtime config and release branches; I'd consolidate to a single config-driven path so onboarding a new brand never needs a branch — and add schema linting across the 5 GraphQL schemas as they diverge.",
  },
]

export const getArchitecture = (id: string) => architectures.find((a) => a.id === id)
