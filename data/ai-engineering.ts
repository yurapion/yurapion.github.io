export interface AIWork {
  id: string
  title: string
  kind: string
  summary: string
  details: string[]
  guardrail: string
}

// Grounded in real artifacts: production translation runbooks and the BB-373
// incident, the measured cost-attribution work, graphify, and DevPrep's
// shipped pipeline. DevPrep is solo-built and deployed — no user/revenue claims.
export const aiEngineering: AIWork[] = [
  {
    id: "agentic-ops",
    title: "Agents against real production systems",
    kind: "Production ops",
    summary:
      "I run AI agents on CardMedic's live AWS translation pipeline — bulk language rollouts driven by written runbooks, not ad-hoc prompting.",
    details: [
      "Every rollout follows the same safe procedure: dry-run count, a small live test to catch silent empty-translation failures, then the full run one language at a time",
      "Root-caused a callback that had silently stopped writing finished translations back to the database — the class of failure that shows nothing in the happy path (the full story is in the design note below)",
      "Turned that diagnosis into a reusable skill that lives in the repo, so a future session finds the same failure in minutes",
    ],
    guardrail:
      "Clinician-verified translations are skipped by design. A mass machine re-run of the whole card set cannot overwrite approved clinical wording.",
  },
  {
    id: "multi-agent",
    title: "A measured multi-agent workflow",
    kind: "Developer platform",
    summary:
      "I treat my own AI workflow like a system to optimise. A frontier model plans and reviews; cheap specialised agents do the read-heavy work; an independent agent verifies before anything is called done.",
    details: [
      "Profiled the workflow and found context re-reads — not generated output — drove most of the cost, then rebuilt delegation around that: retrieval goes to cheap models, the main thread never re-reads what a subagent already read",
      "Verification is a house rule: a separate checker agent runs a Playwright regression and diffs the database before and after to catch unintended writes",
      "Built the onboarding kit — deck and baseline setup — used to bring other engineers onto the same agentic workflow",
    ],
    guardrail:
      "Maker ≠ checker. Work is proven against named, checkable conditions by a different agent than the one that wrote it — and a task with no way to prove it's done gets sent back, not brute-forced.",
  },
  {
    id: "graphify",
    title: "Knowledge graphs over codebases",
    kind: "Tooling",
    summary:
      "Built graphify — it turns a codebase into a queryable graph so an agent answers architecture questions from a scoped subgraph instead of grepping the whole repo.",
    details: [
      "Query, path, and explain commands return a tight subgraph with real file pointers, not an LLM's recollection of the code",
      "An honest audit trail marks each fact as extracted, inferred, or ambiguous, so you can tell what the graph knows from what it's guessing",
      "Launchd watchers rebuild the graphs automatically as three production repos change — no API cost on update",
    ],
    guardrail:
      "The graph is derived from the AST, so answers come with pointers you can check rather than a plausible paragraph you have to trust.",
  },
  {
    id: "devprep",
    title: "DevPrep — an AI-first product, built with agents",
    kind: "Product",
    summary:
      "A deployed app that turns a job description into a tailored study program — questions, flashcards, glossary — scheduled by a real FSRS spaced-repetition engine. Solo-built end to end.",
    details: [
      "Live pipeline on Cloudflare Workers: a real job description returns a complete content pack in about a minute, behind 460 automated tests",
      "A three-layer gate on model output — schema validation, then semantic checks, then a bounded retry that feeds the error back — fails closed to a review queue rather than serving broken content",
      "Deterministic core by design: the scheduling and mastery maths are plain code, never LLM arithmetic — the model generates and explains, it never grades",
    ],
    guardrail:
      "Honest mastery. Badges say 'unexplored' when they mean it, grades run real scheduling maths, and gap analysis cites measured recall rather than a model's guess.",
  },
]
