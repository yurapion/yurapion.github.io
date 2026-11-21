export interface AIWork {
  id: string
  title: string
  kind: string
  summary: string
  details: string[]
  guardrail: string
}

// Grounded in real artifacts: production translation runbooks and the BB-373
// incident, the measured cost-attribution work, graphify, herdr-web and DevPrep's
// shipped pipeline. graphify and herdr are third-party tools I use, not ones I wrote.
// DevPrep is solo-built and deployed, with no user or revenue claims.
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
    id: "graphify",
    title: "A knowledge graph of the codebase, used daily",
    kind: "Tooling",
    summary:
      "I use graphify, a third-party tool that turns a codebase into a queryable graph, so an agent answers architecture questions from a scoped subgraph instead of grepping the whole repo.",
    details: [
      "Query, path, and explain commands return a tight subgraph with real file pointers, not an LLM's recollection of the code",
      "An honest audit trail marks each fact as extracted, inferred, or ambiguous, so you can tell what the graph knows from what it's guessing",
      "The graphs rebuild from the AST as the code changes, so there is no API cost on update",
    ],
    guardrail:
      "The graph is derived from the AST, so answers come with pointers you can check rather than a plausible paragraph you have to trust. My rules file tells agents to query it by symbol name first.",
  },
  {
    id: "devprep",
    title: "DevPrep: an interview-practice product, built with agents",
    kind: "Product",
    summary:
      "A live React 19 and Cloudflare Worker app that turns a job description into a tailored study program (questions, flashcards, glossary), scheduled by an FSRS spaced-repetition engine. Generation calls Gemini. I built it agent-first over 70 documented rounds, with 6 decision records, and ran its ticket work as parallel sessions from one shared brief.",
    details: [
      "Live pipeline on Cloudflare Workers: a real job description returns a complete content pack in about a minute. About 46k lines of TypeScript and 88 test files",
      "A three-layer gate on model output — schema validation, then semantic checks, then a bounded retry that feeds the error back — fails closed to a review queue rather than serving broken content",
      "Deterministic core by design: the scheduling and mastery maths are plain code, never LLM arithmetic — the model generates and explains, it never grades",
    ],
    guardrail:
      "Honest mastery. Badges say 'unexplored' when they mean it, grades run real scheduling maths, and gap analysis cites measured recall rather than a model's guess.",
  },
  {
    id: "herdr-web",
    title: "herdr-web: answer a blocked agent from my phone",
    kind: "Tooling",
    summary:
      "A small Go web page, with tests, for herdr, the terminal multiplexer I run agents in. It shows which agent is blocked and lets me answer it from my phone over a private network. herdr is a third-party tool I use, not one I wrote.",
    details: [
      "One page lists the running agents and marks the ones waiting on a person",
      "A reply typed on the phone goes to that agent's pane, so a blocked overnight run does not wait until morning",
    ],
    guardrail:
      "It is reachable only over a private network, and it answers an agent; it does not start work on its own.",
  },
]

export interface AgentPractice {
  id: string
  label: string
  body: string
}

export const agentWorkflow = {
  eyebrow: "Working method",
  title: "How I work with AI agents",
  intro:
    "I use Claude Code every day, in the terminal and the desktop app. I write the definition and the checks, and agents write most of the code. A change merges only after its tests pass and someone other than its author has reviewed it. The counts below are from the current CV.",
  practices: [
    {
      id: "planning",
      label: "Planning",
      body: "About 40% of the effort on a feature happens before any code. I write the goal, the checks that will prove it is done, the ways it can fail, and the real names (endpoints, tables, flags). At Evolve I wrote 20 of these definitions and 21 recaps. At YGO each ticket has a plan file in the repository.",
    },
    {
      id: "context",
      label: "Context",
      body: "Instruction files at three levels: mine, the project's, and the repository's CLAUDE.md or AGENTS.md. A knowledge graph of the larger codebases, so an agent looks up a symbol and does not grep. A checkpoint per task, and a handoff file that a hook writes when a session ends. MCP servers for Jira, Linear, production logs and a browser.",
    },
    {
      id: "orchestration",
      label: "Orchestration",
      body: "The strongest model plans and reviews. Cheaper sub-agents read and search, and return a summary. Each ticket has its own git worktree, so sessions run in parallel: a lead session writes the brief and the rules, side sessions leave status notes, and a lock makes heavy test and Docker runs go one at a time. One overnight run had about ten sessions on separate tickets on one machine.",
    },
    {
      id: "verification",
      label: "Verification",
      body: "I write the failure-path tests before the happy path. The agent that wrote a change does not approve it: a second agent reviews it in a fresh session, then a person does. 19 hooks do the routine checks: vet and package tests after each Go edit, a type check before a turn ends, and a prompt before a destructive command (force-push to a protected branch, terraform destroy, a cloud delete). An agent pushes, posts or writes to a tracker only after I confirm.",
    },
    {
      id: "measurement",
      label: "Measurement",
      body: "I log token use per session and change my rules when the numbers say so. 54% of file reads in the main session happened after I had already delegated the work, so I added a read-guard hook and a read-only scout agent. One pull request took 20+ rounds with the review bot, so now I review each change locally against the bot's usual findings before I push.",
    },
  ] as AgentPractice[],
}
