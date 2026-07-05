# Yurii Piontkovskyi — Portfolio

Source for my personal portfolio site. Senior full-stack engineer, 8+ years across
healthcare, medical imaging AI, consumer media, and SaaS — and, increasingly, the AI
agents that build and operate those systems.

Every figure on the site is traceable: either counted directly from the project's source
code (service counts, endpoints, SQS queues, migrations, locales) or carried from
delivery records. Nothing is estimated or invented.

## What's here

- **Selected work** — four case studies: CardMedic (NHS healthcare comms on AWS
  serverless), AI Sight Suite (clinical imaging AI, .NET Clean Architecture, cross-cloud
  Azure + SageMaker), AccentPOS (restaurant SaaS on Hasura + Fastify), and Wunder AI /
  cosnova (Go/GraphQL monorepo behind festival-scale consumer apps).
- **AI engineering** — how I run agents against production systems, the multi-agent
  workflows I build, knowledge-graph tooling for codebases, and an AI-first product.
- **Experience, stack, contact.**

## Stack

Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS. Type set in
Fraunces (display), Instrument Sans (body), and IBM Plex Mono. Dark default with a light
toggle; no runtime UI dependencies beyond `lucide-react`. First-load JS is ~102 kB.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000/newportfolio
npm run build    # static export to ./out
```

Content lives in `data/` (`projects.ts`, `experience.ts`, `ai-engineering.ts`,
`skills.ts`); sections are in `components/site/`. Deployed to GitHub Pages via
`.github/workflows` (hence the `/newportfolio` base path).

## Contact

- Email — yurapion@gmail.com
- LinkedIn — [yuryi-piontkovskyi](https://www.linkedin.com/in/yuryi-piontkovskyi-240a74131)
- GitHub — [yurapion](https://github.com/yurapion)
