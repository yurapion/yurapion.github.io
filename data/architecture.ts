// System-architecture data per case study. Layers flow top to bottom.
// Source-counted numbers stay separate from CV-carried delivery metrics in copy.

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

export type DecisionOwner = "mine" | "shared" | "team"

export const decisionOwnerLabels: Record<DecisionOwner, string> = {
  mine: "My decision",
  shared: "Shared decision",
  team: "Team decision I worked within",
}

export interface Decision {
  title: string
  body: string
  owner?: DecisionOwner
}

export interface ProjectArchitecture {
  id: string
  /** Case-study id when it differs from the architecture id. */
  projectId?: string
  pattern: string
  stats: Stat[]
  layers: ArchLayer[]
  decisions: Decision[]
  optimizedFor: string[]
  retro: string
}

export const architectures: ProjectArchitecture[] = [
  {
    id: "evolve",
    pattern: "Multi-tenant clinical cloud · AWS",
    stats: [
      { value: "90", label: "TypeORM migrations" },
      { value: "46", label: "row-level security policies" },
      { value: "RLS", label: "tenant boundary" },
      { value: "Cognito", label: "operator and device identity" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [
          { label: "React operator app", note: "Vite · session, signal quality, live traces" },
          { label: "Headset", note: "device credential, resolved to an organization" },
        ],
      },
      {
        tier: "API",
        nodes: [
          { label: "NestJS REST", note: "sessions, exports, participants" },
          { label: "Socket.IO gateway", note: "headset and operator on one session", accent: true },
          { label: "Session Authority", note: "state machine · takeover under row lock · SKIP LOCKED timers" },
        ],
      },
      {
        tier: "Identity",
        nodes: [{ label: "Cognito", note: "token decides the organization", accent: true }],
      },
      {
        tier: "Data",
        nodes: [
          { label: "PostgreSQL", note: "90 migrations · 46 RLS policies · org on every row", accent: true },
          { label: "InfluxDB", note: "sensor samples" },
          { label: "Kafka", note: "sensor stream and export jobs" },
        ],
      },
      {
        tier: "Platform",
        nodes: [
          { label: "ECS" },
          { label: "Terraform" },
          { label: "GitHub Actions" },
        ],
      },
    ],
    decisions: [
      {
        title: "One place enforces the tenant",
        owner: "team",
        body: "Application data is in PostgreSQL. A session's foreign keys include the organization, and row-level security uses the same key. Sensor samples stay in InfluxDB. Two stores, one tenant rule, and that rule is not a WHERE clause the next query can forget. A colleague built the row-level-security foundation. My part: my hiring case study proposed PostgreSQL with row-level security and the organisation as tenant key, and I built the session, device and consent tables on that pattern.",
      },
      {
        title: "The role that connects does not own the tables",
        owner: "shared",
        body: "PostgreSQL lets a table owner bypass row-level security without an error. The service connects as a separate role, so the policies actually run. A colleague defined the role model. I moved the services to sign in as the least-privilege application role and added RDS IAM sign-in and verified TLS.",
      },
      {
        title: "The token picks the organization",
        owner: "team",
        body: "Operators and devices authenticate with Cognito. The organization comes from the token, and a device credential resolves to the organization that owns the headset.",
      },
      {
        title: "The session lives in the cloud, not on the headset",
        owner: "mine",
        body: "Session Authority holds the state machine in NestJS, backed by Postgres rows. An operator takeover runs under a row lock, timers are claimed with SKIP LOCKED, and the headset receives typed commands and typed refusals. The device follows the record instead of owning it. I wrote the four Session Authority decision records and built it with one other engineer.",
      },
      {
        title: "Queue the export on Kafka that is already there",
        owner: "mine",
        body: "Export jobs travel on the Kafka cluster already running in every environment. The data_exports row is the source of truth for status. I wrote the decision record.",
      },
    ],
    optimizedFor: [
      "A missed filter cannot cross an organization",
      "Identity and membership stay in different systems",
      "No new queue technology before the export path exists",
    ],
    retro:
      "Connection state is written on every connect and disconnect, in the same PostgreSQL instance as the durable session rows. One tenant boundary mattered more than a second store. If that traffic contends with the session rows, I would move the hot table and leave the foreign keys where they are.",
  },
  {
    id: "cardmedic",
    pattern: "Event-driven serverless · AWS",
    stats: [
      { value: "9", label: "microservices" },
      { value: "55", label: "locale files" },
      { value: "AWS", label: "serverless stack" },
      { value: "NHS", label: "clinical context" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [
          { label: "Flutter app", note: "55 locale files · i18n" },
          { label: "React admin platform" },
        ],
      },
      {
        tier: "API & edge",
        nodes: [
          { label: "API Gateway", note: "REST across services" },
          { label: "Cognito", note: "auth" },
        ],
      },
      {
        tier: "Compute",
        nodes: [
          { label: "9 Lambda microservices · 244 REST endpoints", note: "auth · account · user · bookmark · analytics · content · speech · translation-admin ×2", accent: true },
        ],
      },
      {
        tier: "Async pipeline",
        nodes: [
          { label: "Translation queues", note: "22 SQS queues · batching", accent: true },
          { label: "Polly · BSL · recording queues" },
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
          { label: "DynamoDB", note: "encrypted clinical records" },
          { label: "S3" },
        ],
      },
    ],
    decisions: [
      {
        title: "Shard the translation queue by language",
        owner: "mine",
        body: "A single translate queue would hot-spot and throttle the vendor API. Language-specific lanes batch independently, so one busy language does not starve the rest.",
      },
      {
        title: "Feature-flag the vendor, don't fork the code",
        owner: "mine",
        body: "An SSM-driven router selects the translation provider at runtime. Swapping vendors (or migrating off Smartcat) is a config change, not a rewrite — vendor risk stops being code risk.",
      },
      {
        title: "Make human-verified content un-overwritable",
        owner: "mine",
        body: "The pipeline skips anything a clinician has marked verified. A mass machine re-translation of the whole card set physically cannot clobber approved clinical wording.",
      },
    ],
    optimizedFor: ["Never overwrite verified clinical content", "Throughput without vendor throttling", "Swap vendors without a rewrite"],
    retro:
      "Signature verification covers inbound webhooks on some integrations; I would extend HMAC checks to every inbound integration and make queue sharding config-driven so throughput can change without a redeploy.",
  },
  {
    id: "ai-sight",
    pattern: "Cross-cloud · Clean Architecture · .NET 10",
    stats: [
      { value: "108", label: "REST endpoints" },
      { value: "23", label: "controllers" },
      { value: "67", label: "EF migrations" },
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
          { label: ".NET 10 Clean Architecture", note: "108 HTTP attributes · 23 controllers", accent: true },
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
          { label: "PostgreSQL / EF Core", note: "67 migration files" },
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
                    { label: "Testcontainers" },
          { label: "SonarQube + dotCover" },
        ],
      },
    ],
    decisions: [
      {
        title: "Errors as values, not exceptions",
        owner: "team",
        body: "LanguageExt Either/Option puts failure in the type signature. The compiler forces every clinical path to handle its error cases instead of trusting an exception to be caught somewhere upstream.",
      },
      {
        title: "Cross-cloud on purpose",
        owner: "team",
        body: "Azure runs identity, hosting, and blob storage; AWS does nothing but SageMaker inference, reached over SigV4-signed calls. Each cloud does what it's strongest at rather than forcing one to do everything.",
      },
      {
        title: "Two models, one grade",
        owner: "team",
        body: "Primary and secondary models run concurrently, so every grading result carries a second opinion by construction rather than riding on one model for a clinical decision. I worked on the pipeline: model-output parsing and batch optimisation. Colleagues built the integration.",
      },
      {
        title: "Bill from usage",
        owner: "mine",
        body: "I built the Xero integration alone. An admin connects an organisation over OAuth, the system counts the images screened in a billing period, prices them, and creates the invoice in Xero as a draft. An admin previews the draft and sends it.",
      },
    ],
    optimizedFor: ["Explicit failure over silent exceptions", "Auditability the regulator can check", "Real-time feedback to the clinician"],
    retro:
      "The cross-cloud split earns best-of-both but adds a network hop and two IAM models to reason about; next time I would invest earlier in unified secrets and observability spanning Azure and AWS, so the integration costs less to operate.",
  },
  {
    id: "accentpos",
    pattern: "Declarative GraphQL core · event-driven writes",
    stats: [
      { value: "326", label: "SQL migrations" },
      { value: "14", label: "triggered tables" },
      { value: "Hasura", label: "GraphQL core" },
      { value: "30+", label: "venues in CV" },
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
        nodes: [{ label: "14 trigger-enabled tables", accent: true }],
      },
      {
        tier: "Business logic",
        nodes: [{ label: "Fastify webhook service", note: "payments · delivery · finance · auth" }],
      },
      {
        tier: "Auth",
        nodes: [{ label: "Cognito → Hasura JWT bridge", note: "JWK · row-level tenant isolation" }],
      },
      {
        tier: "External",
        nodes: [
          { label: "PayPal", note: "my integration" },
          { label: "Dojo", note: "colleague's work" },
          { label: "Deliverect", note: "colleague's work" },
          { label: "Xero", note: "colleague's work" },
        ],
      },
    ],
    decisions: [
      {
        title: "The schema is the contract",
        owner: "team",
        body: "326 migrations are the single backbone. The GraphQL API, permission rules, and event triggers are all derived from the schema — there's no second source of truth to drift out of sync.",
      },
      {
        title: "Declarative reads, imperative writes",
        owner: "team",
        body: "Hasura serves data declaratively; anything with side effects — payments, delivery, accounting — fires an event trigger into Fastify. Business logic never leaks into the data-access layer.",
      },
      {
        title: "Isolate tenants in the database, not the app",
        owner: "team",
        body: "A Cognito→Hasura bridge injects session variables so row-level filters enforce tenant isolation on nearly every table. Safety doesn't depend on app code remembering to filter.",
      },
      {
        title: "Refunds that a retry cannot repeat",
        owner: "mine",
        body: "I built the PayPal integration end to end: merchant onboarding, order creation and capture, refunds, and webhooks. A refund is sent with an idempotency key, so a retry cannot refund twice. A webhook signature is verified before anything in it is trusted.",
      },
    ],
    optimizedFor: ["One schema as the contract", "Side effects isolated from data access", "Multi-tenant safety enforced by the DB"],
    retro:
      "Per-venue theming is config-driven on the customer storefront but still harder to reuse in the internal ops app. I would bring both under one runtime-config path and budget the Material-UI v4 to v5 migration before it becomes a wall.",
  },
  {
    id: "wunder",
    pattern: "Layered Go platform · GraphQL · GitOps",
    stats: [
      { value: "714", label: "Go files" },
      { value: "49", label: "Go cmd binaries" },
      { value: "6", label: "gqlgen configs" },
      { value: "3", label: "product surfaces" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [
          { label: "Playtime SPA", note: "one codebase · apps rendered from CMS JSON · 56 template types" },
          { label: "Insight front end", note: "graph views · Cytoscape / D3" },
          { label: "LiveMind", note: "GraphQL subscriptions over WebSocket · D3 graph" },
        ],
      },
      {
        tier: "GraphQL",
        nodes: [{ label: "6 gqlgen configs", note: "Apollo + WebSocket" }],
      },
      {
        tier: "Services",
        nodes: [{ label: "49 Go cmd binaries", note: "l1 edge · l2 domain · l3 decision", accent: true }],
      },
      {
        tier: "Inference",
        nodes: [{ label: "Rule-book → generated Go", note: "declarative rules, native speed", accent: true }],
      },
      {
        tier: "Data pipeline",
        nodes: [
          { label: "Redis-compatible store → Kafka → Dgraph", note: "Benthos jobs" },
          { label: "PostgreSQL" },
        ],
      },
      {
        tier: "Platform",
        nodes: [
          { label: "Drone → Kaniko → K8s", note: "colleague's setup" },
          { label: "Flux / ArgoCD" },
          { label: "Prometheus / Grafana / Loki" },
          { label: "Backstage" },
        ],
      },
    ],
    decisions: [
      {
        title: "Tier the services, don't mesh them",
        owner: "team",
        body: "The platform uses l1 edge, l2 domain, and l3 decision layers. A request flows through responsibility boundaries instead of a free-for-all where any service can call any other.",
      },
      {
        title: "Compile the rules, don't interpret them",
        owner: "team",
        body: "Consumer-profiling rules are authored as a declarative rule book that compiles to generated Go. Non-engineers can read the rules; the runtime pays no interpreter tax.",
      },
      {
        title: "One SPA, many brands",
        owner: "mine",
        body: "Playtime pulls brand config at runtime, so branded festival experiences ship from a single codebase rather than forks that drift apart. I am the main author of Playtime, about two thirds of its commits (source-counted). It renders 56 template types from CMS JSON, each loaded on demand.",
      },
      {
        title: "Draw the live session from a subscription",
        owner: "mine",
        body: "I wrote the LiveMind client. GraphQL subscriptions over WebSocket drive a D3 graph of a live session. The backend publisher was a colleague's.",
      },
    ],
    optimizedFor: ["Clear service boundaries", "Rules readable by humans, native at runtime", "One codebase across branded experiences"],
    retro:
      "Brand setup mixes runtime config and release flow. I would consolidate it into a single config-driven path and add schema linting across the gqlgen configs as they diverge.",
  },
  {
    id: "ygo-mcp",
    projectId: "ygo-console-mcp",
    pattern: "Remote MCP server · confirm before write",
    stats: [
      { value: "2", label: "write tools, both preview first" },
      { value: "1", label: "write core shared with the REST API" },
      { value: "1", label: "log line per tool call" },
      { value: "~70%", label: "of the service's code is mine (source-counted)" },
    ],
    layers: [
      {
        tier: "Client",
        nodes: [{ label: "AI assistant", note: "Claude, ChatGPT · on the customer's side" }],
      },
      {
        tier: "Sign-in",
        nodes: [{ label: "OAuth sign-in", note: "the assistant acts as the signed-in user, with that user's permissions", accent: true }],
      },
      {
        tier: "Server",
        nodes: [{ label: "Console MCP server", note: "remote Model Context Protocol" }],
      },
      {
        tier: "Tools",
        nodes: [
          { label: "Read tools", note: "list_projects · list_hotels · list_my_feedback · list_hotel_requests" },
          { label: "Write tools", note: "send_hotel_feedback · reply_to_feedback", accent: true },
          { label: "request_capability", note: "what the user asked for that the server cannot do" },
        ],
      },
      {
        tier: "Write path",
        nodes: [
          { label: "1. First call: preview", note: "the text and where it will go · stores nothing", accent: true },
          { label: "2. The user says yes" },
          { label: "3. Confirmed call", note: "goes to one write core that the REST API also uses" },
        ],
      },
      {
        tier: "Data",
        nodes: [{ label: "PostgreSQL" }],
      },
      {
        tier: "Side outputs",
        nodes: [
          { label: "One structured log line per tool call", note: "into monitoring: dashboard, monitors" },
          { label: "Unmet requests", note: "request_capability records them and passes them to the product team" },
        ],
      },
    ],
    decisions: [
      {
        title: "Preview before write",
        owner: "mine",
        body: "A write tool called without confirmation stores nothing and returns exactly what would be stored and where. Only the call that follows the user's yes stores it.",
      },
      {
        title: "One write core",
        owner: "mine",
        body: "The API and the MCP tools share the same write code, so a rule is enforced once.",
      },
      {
        title: "Every tool says whether it reads or writes",
        owner: "mine",
        body: "Each tool carries a read-only hint, so a client can ask for approval on the right calls.",
      },
      {
        title: "Record what it cannot do",
        owner: "mine",
        body: "Requests the server cannot meet are recorded and go to the product team.",
      },
      {
        title: "One log line per call",
        owner: "mine",
        body: "Each tool call writes one structured line, with signals for tool panics and sign-in failures.",
      },
    ],
    optimizedFor: ["Nothing stored before the user confirms", "A rule enforced once", "Knowing what users want next"],
    retro:
      "The preview relies on the assistant showing the text to the user before it asks for the yes. The server cannot see what the client displays, so the only guarantee is that nothing is stored without the confirmed call.",
  },
  {
    id: "agent-workflow",
    pattern: "Agent-driven development · checks before and after code",
    stats: [
      { value: "40%", label: "of a feature's effort before code (my working rule)" },
      { value: "19", label: "hooks (counted in my settings)" },
      { value: "54%", label: "of main-session file reads after delegating (measured)" },
    ],
    layers: [
      {
        tier: "Input",
        nodes: [{ label: "Ticket" }],
      },
      {
        tier: "Definition",
        nodes: [{ label: "Written before any code", note: "goal · the checks that will prove it is done · the ways it can fail · the real names", accent: true }],
      },
      {
        tier: "Lead session",
        nodes: [{ label: "Strongest model", note: "plans · writes the brief and the rules · reviews", accent: true }],
      },
      {
        tier: "Side sessions",
        nodes: [{ label: "One git worktree per ticket, in parallel", note: "each leaves status notes" }],
      },
      {
        tier: "Sub-agents",
        nodes: [{ label: "Cheaper models", note: "read and search · return summaries" }],
      },
      {
        tier: "Guardrails",
        nodes: [
          { label: "19 hooks around every session", note: "vet and package tests after each Go edit · a type check before a turn ends · a prompt before a destructive command" },
          { label: "Heavy-run lock", note: "test and Docker runs go one at a time" },
        ],
      },
      {
        tier: "Review",
        nodes: [
          { label: "Second agent, fresh session" },
          { label: "Then a person" },
        ],
      },
      {
        tier: "Merge",
        nodes: [{ label: "Merge, then a recap", note: "a fresh model with no context must be able to explain it back", accent: true }],
      },
      {
        tier: "Context in",
        nodes: [
          { label: "Instruction files at three levels", note: "mine · the project's · the repository's" },
          { label: "Knowledge graph", note: "of the larger codebases · third-party tool I use" },
          { label: "Checkpoint per task, handoff file per session" },
          { label: "MCP servers", note: "tracker · production logs · a browser" },
        ],
      },
      {
        tier: "Feedback",
        nodes: [{ label: "Token use logged per session", note: "the rules change when the numbers say so", accent: true }],
      },
    ],
    decisions: [
      {
        title: "Definition before code",
        owner: "mine",
        body: "About 40% of the effort on a feature goes here: the goal, the checks, the failure modes and the real names, written before the first line of code.",
      },
      {
        title: "The maker is not the checker",
        owner: "mine",
        body: "The agent that wrote a change does not approve it. A second agent reviews it in a fresh session, then a person does.",
      },
      {
        title: "The strong model decides, cheap models read",
        owner: "mine",
        body: "The strongest model plans, briefs and reviews. Cheaper models read and search, and return summaries.",
      },
      {
        title: "Guardrails are hooks",
        owner: "mine",
        body: "A rule that matters runs as a script. I do not leave it to the model's memory.",
      },
      {
        title: "Measure, then change the rules",
        owner: "mine",
        body: "54% of file reads in the main session happened after the work was already delegated, so I added a read-guard hook and a read-only scout agent.",
      },
    ],
    optimizedFor: ["Checks written before code", "No change approved by its author", "Rules that run as scripts"],
    retro:
      "The knowledge-graph tool and herdr, the terminal multiplexer I run agents in, are third-party tools I use. I did not build them.",
  },
]

export const getArchitecture = (id: string) => architectures.find((a) => a.id === id)
export const getArchitectureForProject = (projectId: string) =>
  architectures.find((a) => (a.projectId ?? a.id) === projectId)
