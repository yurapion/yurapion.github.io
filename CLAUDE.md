# newportfolio — Claude instructions

Personal portfolio site for Yurii Piontkovskyi (senior full-stack engineer). Next.js 15
App Router with **static export** (`output: "export"` → `./out`), React 19, TypeScript,
Tailwind CSS. Deployed to GitHub Pages via `.github/workflows` as the user site
https://yurapion.github.io (repo `yurapion/yurapion.github.io`, `basePath` is "" in
`data/site.ts` — keep using `routes`/`basePath` for internal links anyway).

## Layout

- `data/` — ALL site content lives here as typed TS objects. Edit copy here, never in
  components: `projects.ts` (case studies), `practice.ts`, `notes.ts` (long-form
  engineering notes), `ai-engineering.ts`, `experience.ts`, `skills.ts`,
  `principles.ts`, `evidence.ts`, `architecture.ts` (system-design diagrams),
  `site.ts` (profile, routes, nav).
- `components/site/` — presentational sections; they render whatever `data/` provides.
- `app/` — one route folder per section (`work/`, `practice/`, `ai-engineering/`,
  `experience/`, `stack/`, `notes/[slug]/`).
- `public/cv/Yurii_Piontkovskyi_CV.pdf` — linked from `routes.cv`.
- `docs/rework/` — spec + plan from the 2026-07 redesign; historical context only.

## Hard rules

1. **Evidence policy.** Every figure on the site is one of two kinds: *source-counted*
   (verified by counting in a local repo, e.g. "326 migrations", "55 locale files") or
   *CV-carried* (taken from the current CV / delivery record, e.g. "30+ venues",
   "100,000 jobs a month"). Copy must keep saying which kind it is. Never invent a
   metric, never upgrade a CV-carried figure to sound source-counted, and never change
   a number without the user confirming the source.
2. **Prose style.** All copy has been through the `stop-slop` skill. Any NEW or edited
   human-facing copy in `data/` must pass it too before it lands: no "isn't just X",
   no "seamless/robust/leverage", no hype. Voice is first-person, concrete, and
   trade-off-honest ("what I'd revisit" sections are deliberate).
3. **Links.** Internal links must use `routes`/`basePath` from `data/site.ts`, never
   hardcoded paths — `basePath` is the single switch if the site ever moves off the
   root domain again.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # static export to ./out (this is the CI check — run before committing)
```

No test suite; `npm run build` + ESLint is the verification gate.

## Deploy gotcha

If GitHub Pages serves the README instead of the app: Settings → Pages → Source must be
"GitHub Actions", then rerun the deploy workflow.
