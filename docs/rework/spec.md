# Portfolio Rework — Spec

## Goal
Rebuild the portfolio into a truthful, curated, senior-level site. Every claim traceable to the V4 CV or real code in the repos on this machine. Add an "AI-assisted engineering" positioning grounded in real production work.

## Done when
1. Zero fabricated data: no invented testimonials, metrics, team sizes, projects (SkinCam, Strategy Minds, web3, "$2M funding" all removed).
2. Content matches verified facts (scout cross-reference of cardmedic-cms, ai-sight-suite, apos-suite, cosnova-mono et al.).
3. `npm run build` passes clean.
4. Pages verified visually in browser (desktop + mobile viewport, dark + light).
5. Not repetitive: each project case study has a distinct angle; no duplicated metric walls.

## Information architecture (single page + focused case studies)
1. **Hero** — name, "Senior Full-Stack Engineer — Cloud-Native & Distributed Systems", one-line positioning incl. AI-agent engineering, CTAs: email, LinkedIn, CV download.
2. **Selected work** — 4 case studies, each: context → problem → architecture → verified outcomes:
   - CardMedic (NHS healthcare comms, AWS serverless, translation pipeline at scale)
   - AI Sight Suite (clinical imaging AI, .NET Clean Architecture, cross-cloud Azure+SageMaker)
   - AccentPOS (restaurant SaaS, Hasura+Fastify, payments/integrations)
   - Wunder AI / cosnova (Go+GraphQL monorepo, consumer festival apps at 100k+ scale)
3. **AI engineering** — how I build with/for AI agents in production (real examples only: agentic pipeline debugging & mass-retranslation runbooks at CardMedic, multi-agent dev workflows, knowledge-graph tooling for codebases, AI-first product builds).
4. **Experience timeline** — BlumHealth Jul 2023–Present · Wunder AI Mar 2020–Sep 2023 · Freelance Mar 2017–Mar 2020 (exact CV dates).
5. **Skills** — compact grouped stack from CV (no badge wall).
6. **Contact / footer** — email, LinkedIn, location line "Remote — open to UK / EU / Global".

## Cut entirely
Testimonials (fabricated), Services (consulting boilerplate), web3 section, fake visualizations (SkillsRadar, CareerGrowthNetwork, ProjectImpactMetrics, TechEvolutionTimeline), custom cursor, loading animation, three.js/GSAP/Lenis dependencies, docs/ fabricated write-ups.

## Design direction (2026 trend research, Perplexity)
- Minimal structure, expressive accents; strong typographic hierarchy; generous whitespace.
- Dark/light toggle, dark default; restrained palette, one accent.
- Case-study format over feature lists; progressive disclosure; micro-interactions only for clarity.
- Fast, accessible, mobile-first. No stacked gimmicks (no parallax+glass+neon+cursor).
- Tool: frontend-design skill for final look.
