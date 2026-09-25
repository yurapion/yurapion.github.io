export interface SkillGroup {
  id: string
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "C# (.NET)", "Dart", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React 17–18", "Vite", "Redux Toolkit", "React Query", "Apollo Client", "MUI", "Flutter", "Riverpod"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "NestJS", "Fastify", "ASP.NET Core", "MediatR", "GraphQL (Hasura, Apollo, gqlgen)", "REST APIs"],
  },
  {
    id: "cloud",
    label: "Cloud & Infra",
    items: [
      "AWS (Lambda, SQS, DynamoDB, S3, Cognito, SageMaker, ECS)",
      "Azure (App Service, AD B2C, Blob, PostgreSQL)",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    id: "data",
    label: "Data",
    items: ["PostgreSQL", "TypeORM", "InfluxDB", "DynamoDB", "Dgraph", "Redis-compatible stores", "Kafka", "EF Core", "Hasura"],
  },
  {
    id: "devops",
    label: "DevOps & Quality",
    items: [
      "GitHub Actions",
      "Bitbucket Pipelines",
      "Drone CI",
      "Flux/ArgoCD",
      "Helm",
      "SonarQube",
      "Testcontainers",
      "Sentry",
      "Prometheus/Grafana",
    ],
  },
  {
    id: "ai",
    label: "AI Engineering",
    items: [
      "Claude Code / agent orchestration",
      "Multi-agent workflows",
      "LLM pipelines in production",
      "SageMaker inference integration",
      "Knowledge-graph code tooling",
      "Spaced-repetition & deterministic eval",
    ],
  },
]

export const compliance = [
  "AES encryption at rest, S3 SSE, HMAC verification",
  "NHS / clinical multi-year retention (5, 8, 10-year tiers)",
  "OAuth2, Cognito, Azure AD B2C, JWT",
  "Tenant & role-scoped access (PostgreSQL row-level security, Hasura session variables, claims)",
]
