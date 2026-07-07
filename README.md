# Yurii Piontkovskyi — Portfolio

Source for my personal portfolio site. Senior full-stack engineer, 8+ years across
healthcare, medical imaging AI, consumer media, and SaaS, with a current focus on
agentic development that can be verified in production.

Figures on the site are either counted from local source repositories or carried from the
current CV / delivery record. The copy now calls out which is which.

## What's here

- **Home** — fast overview with CV/contact links and clear entry points.
- **Selected work** — four case studies: CardMedic, AI Sight Suite, AccentPOS, and
  Wunder AI / cosnova.
- **AI engineering** — production runbooks, multi-agent workflows, graphify, and DevPrep.
- **Experience, stack, contact.**

## Stack

Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS. Type set in
Fraunces (display), Instrument Sans (body), and IBM Plex Mono. Dark default with a light
toggle; no runtime UI dependencies beyond `lucide-react`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000/newportfolio
npm run build    # static export to ./out
```

Content lives in `data/` (`projects.ts`, `experience.ts`, `ai-engineering.ts`,
`skills.ts`); sections are in `components/site/`. Deployed to GitHub Pages via
`.github/workflows` (hence the `/newportfolio` base path).

If GitHub Pages shows this README instead of the app, the repository Pages source is set
to "Deploy from a branch". Change Settings -> Pages -> Build and deployment -> Source to
"GitHub Actions", then rerun the deploy workflow.

## Contact

- Email — yurapion@gmail.com
- LinkedIn — [yuryi-piontkovskyi](https://www.linkedin.com/in/yuryi-piontkovskyi-240a74131)
- GitHub — [yurapion](https://github.com/yurapion)
