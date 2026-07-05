# Portfolio Rework — Plan

## Phase 1 — Data layer (truth first)
- Rewrite `data/projects.ts` → 4 verified case studies (CardMedic, AI Sight, AccentPOS, Wunder AI) with scout-verified numbers only. New leaner schema: context, problem, architecture[], outcomes[] (each tagged verified-in-code vs business-stat), stack groups.
- Rewrite `data/experience.ts` → 3 roles with exact CV dates (BlumHealth Jul 2023–Present, Wunder AI Mar 2020–Sep 2023, Freelance Mar 2017–Mar 2020).
- New `data/ai-engineering.ts` → real agentic-work entries (translation-pipeline agent ops + runbooks, multi-agent dev workflow/team enablement, graphify knowledge-graph tooling, DevPrep AI-first build).
- New `data/skills.ts` → grouped stack from CV.
- Delete `data/testimonials.ts`, `data/services.ts`.

## Phase 2 — Page & components
- Replace monolithic `app/page.tsx` with section components: Hero, SelectedWork (case-study cards + detail), AIEngineering, Experience, Skills, Contact, Nav (sticky, dark/light toggle).
- Delete: custom-cursor, loading-animation, smooth-scroll-provider, visualizations/*, project-modal (replaced), app/visualizations, app/architecture, docs/projects+architecture (fabricated).
- Drop deps: three, @types/three, gsap, lenis, mermaid, @types/mermaid, react-chartjs-2, @tailwindcss/line-clamp. Keep framer-motion (micro-interactions only), lucide-react, radix, tailwind.

## Phase 3 — Design pass
- frontend-design skill: distinctive typographic system, dark default + light toggle, one accent color, restrained motion.

## Phase 4 — Verify (maker ≠ checker)
- `npm run build` clean + lint.
- Preview server; screenshot desktop/mobile, dark/light; check every metric on page against verified-facts list.
- Independent review agent over the final diff for fabrication leaks and repetition.
