export interface PracticeExample {
  title: string
  context: string
  action: string
  result: string
}

export interface PracticeArea {
  id: string
  label: string
  title: string
  summary: string
  evidence: string[]
  example: PracticeExample
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "architecture",
    label: "Architecture & product",
    title: "Choose boundaries around the risk",
    summary:
      "I design systems around failure modes, operational constraints, and the people using them. Technology choices follow those constraints.",
    evidence: [
      "PostgreSQL row-level security as the tenant boundary on a clinical headset platform",
      "Cross-cloud clinical inference across Azure and AWS SageMaker",
      "Hasura for declarative data access with Fastify for integration side effects",
      "Language-sharded translation processing with protected clinical content",
    ],
    example: {
      title: "Keep clinical concerns explicit",
      context:
        "AI Sight combines DICOM imaging, model inference, licensing, billing, and long-lived clinical audit records.",
      action:
        "I kept those concerns behind clear domain and infrastructure boundaries, with explicit error handling and concurrent primary and secondary model calls.",
      result:
        "The backend can evolve each integration without spreading clinical and infrastructure concerns through every layer.",
    },
  },
  {
    id: "devops",
    label: "Platform & DevOps",
    title: "Ship the operating path with the feature",
    summary:
      "My work includes infrastructure, CI/CD, observability, runbooks, and recovery. A feature is incomplete if the team cannot deploy, inspect, and repair it.",
    evidence: [
      "Terraform-managed Azure and AWS environments",
      "GitHub Actions, Bitbucket Pipelines, Drone, Kaniko, and Kubernetes delivery",
      "CloudWatch, SNS, Slack alerts, Testcontainers, SonarQube, and Prometheus",
    ],
    example: {
      title: "Turn a production failure into a repeatable procedure",
      context:
        "A CardMedic callback stopped writing completed translations to the database. The happy path did not expose the failure.",
      action:
        "I traced the callback registration and proxy route, repaired the integration, then documented the diagnosis and staged rollout procedure in the repository.",
      result:
        "Future rollouts start with a dry run and a small live test, and the team has a known path for diagnosing the same failure class.",
    },
  },
  {
    id: "planning",
    label: "Planning & delivery",
    title: "Sequence work around the next business need",
    summary:
      "I turn broad requests into a release order the client and engineers can act on. That means making dependencies visible and changing scope when a smaller step creates value sooner.",
    evidence: [
      "Lead ownership across three concurrent client products",
      "Direct discussions about priorities, trade-offs, and delivery timelines",
      "Staged production rollouts with explicit blast-radius controls",
    ],
    example: {
      title: "Give the client an MVP before completing the full integration",
      context:
        "On AI Sight, the client wanted the licensing feature completed in full before the team moved to Xero integration.",
      action:
        "I proposed building a mocked licensing UI first, then prioritising Xero. The mock would give the client a coherent MVP to show investors while engineering progressed on the integration.",
      result:
        "The client agreed to the revised sequence, so the product story could move forward without waiting for the full licensing implementation.",
    },
  },
  {
    id: "business",
    label: "Business & customers",
    title: "Translate blockers into decisions",
    summary:
      "I work directly with clients and external partners. I keep technical detail, customer risk, and the next business decision in the same conversation.",
    evidence: [
      "Client-facing delivery across healthcare, clinical AI, and hospitality SaaS",
      "Clinical wording protected from machine overwrite",
      "Tenant isolation and payment integrations for multi-site venues",
    ],
    example: {
      title: "Resolve a delayed PayPal dependency with a shared scope",
      context:
        "The AccentPOS PayPal integration was blocked because required work from the external side was delayed, and discussions had stopped producing progress.",
      action:
        "I prepared a presentation that separated what our team had completed, what remained blocked, and exactly what we needed from PayPal to continue.",
      result:
        "The conversation shifted from disagreement to concrete dependencies and actions, giving the client and integration partner a faster route to resolution.",
    },
  },
  {
    id: "leadership",
    label: "Leadership & teams",
    title: "Give people clear ownership and room to ask",
    summary:
      "I can own a product independently, and I can coordinate a small team when delivery needs more hands. My job is to make priorities and engineering expectations clear.",
    evidence: [
      "Direct an engineer on the Evolve cloud platform: schema, authentication, and tenancy rules",
      "Onboarding and task allocation for a small engineering team",
      "Code and work reviews with practical direction on next steps",
      "Hands-on support for juniors learning the development process",
    ],
    example: {
      title: "Make onboarding part of delivery",
      context:
        "New and junior engineers needed enough product and process context to contribute without guessing at priorities.",
      action:
        "I ran onboarding, split work by ownership, reviewed each engineer's output, and explained both the next step and why it mattered. I also kept questions welcome during the work.",
      result:
        "Engineers had clearer ownership, and juniors had a predictable person and process to use when they were blocked.",
    },
  },
]
