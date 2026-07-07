export interface NoteSection {
  heading?: string
  paras: string[]
}

export interface Note {
  slug: string
  title: string
  dek: string
  project: string
  projectId: string
  readingTime: string
  sections: NoteSection[]
}

export const notes: Note[] = [
  {
    slug: "tenant-isolation-in-the-database",
    title: "Isolating tenants in the database, not the application",
    dek: "Why AccentPOS enforces multi-tenant access at the data layer, and the Cognito-to-Hasura bridge that made it possible.",
    project: "AccentPOS",
    projectId: "accentpos",
    readingTime: "4 min",
    sections: [
      {
        paras: [
          "AccentPOS runs many venues on one Hasura and PostgreSQL backend, with the current CV recording 30+ live venues. A single query that forgets its tenant filter shows one venue's orders on another venue's dashboard. In a system taking live payments, that's an incident.",
          "So the question that shaped the design was narrow: where does tenant isolation live?",
        ],
      },
      {
        heading: "The fragile default",
        paras: [
          "The obvious answer is the application. Every resolver, every query, adds a filter on the organisation and location. It works right up until someone forgets once.",
          "There is no compiler for \"did you remember the tenant filter,\" and the failure is silent: the data shows up where it shouldn't and nothing errors. Across a few hundred endpoints, \"everyone remembers every time\" stops being a plan and starts being a hope.",
        ],
      },
      {
        heading: "Push it down a layer",
        paras: [
          "Hasura enforces row-level permissions declaratively, keyed on session variables. If every table's select and update rules filter on the organisation and location from the request's session, isolation stops being something application code has to remember. It becomes a property of the data layer.",
          "A request carrying the wrong session variables returns nothing, by construction rather than by convention.",
        ],
      },
      {
        heading: "The missing piece: Cognito doesn't speak Hasura",
        paras: [
          "There was a catch. Auth is AWS Cognito, and Hasura doesn't read Cognito tokens natively; it wants session variables. Nothing off the shelf bridged the two the way I needed, so I built it.",
          "It's a webhook Hasura calls on every request: fetch Cognito's signing keys, verify the JWT, map its claims to the Hasura role, user, organisation, and location, and cache the keys for an hour so verification isn't a network round-trip on every call. Small surface, and the whole isolation model hangs on it.",
        ],
      },
      {
        heading: "What it buys",
        paras: [
          "The isolation rule is now written once per table and enforced everywhere. A new endpoint inherits it. Someone new to the codebase can't quietly skip it. The security property lives in the schema — which, with 326 migrations behind it, is the artifact that's always current.",
        ],
      },
      {
        heading: "The edges",
        paras: [
          "It isn't free. The bridge is a critical path: if it's slow, every request is slow, which is exactly why the key cache earns its place. The hour-long cache is a deliberate trade of faster requests against slower pickup when a key rotates.",
          "And I'd push the same rigor outward. Signature verification covers the Xero webhook today; every inbound integration deserves the same HMAC check rather than trust in the network boundary.",
        ],
      },
    ],
  },
  {
    slug: "a-translation-pipeline-that-cant-drop-a-job",
    title: "A translation pipeline that can't drop a job — or overwrite a clinician",
    dek: "Sharding, dead-letter discipline, and one silent four-week outage on CardMedic's multilingual content pipeline.",
    project: "CardMedic",
    projectId: "cardmedic",
    readingTime: "5 min",
    sections: [
      {
        paras: [
          "CardMedic keeps a clinical content library in sync across many languages; the local mobile source contains 49 locale files. Two constraints shape everything else. A translation job can't silently vanish. And a machine translation can never overwrite wording a clinician has verified.",
          "At more than 100,000 jobs a month, both have to hold without anyone watching the screen.",
        ],
      },
      {
        heading: "One queue is a bottleneck and a single point of failure",
        paras: [
          "A single translation queue hot-spots. One busy language backs up behind another, and the whole thing starts throttling the vendor API. So the pipeline uses language-specific lanes, each batching on its own.",
          "A surge in Arabic doesn't starve Polish. The lanes are independent, and that independence is the point.",
        ],
      },
      {
        heading: "The guard that matters most",
        paras: [
          "The rule that can't break: verified content stays verified. The pipeline reads a status flag and skips anything a clinician has signed off on.",
          "That means I can re-translate an entire card set into a language by machine and know, structurally, that it will not clobber a single approved clinical string. The safety sits in the code path rather than in an operator's memory of a checklist.",
        ],
      },
      {
        heading: "When it failed quietly",
        paras: [
          "The failures worth learning from are the silent ones. A callback that writes finished translations back to the database went dead for four weeks, and nothing screamed. Around 261 documents sat stuck in progress.",
          "The cause was mundane and precise: the registered callback URL was being treated as a path prefix instead of a base, so the vendor's calls landed nowhere. The fix was small, just re-register the base URL and add the proxy route. The real lesson was about detection, not the bug itself.",
          "Dead-letter queues now alarm through CloudWatch to Slack, and the debugging procedure is a skill that lives in the repo, so the next person finds it in minutes instead of weeks.",
        ],
      },
      {
        heading: "Rollout as a procedure, not a button",
        paras: [
          "Because the blast radius of a mistake is a whole language, every rollout runs as a sequence: a dry-run that only counts, a small live test on a card or two to catch empty-translation failures, then the full run, one language at a time.",
          "Boring on purpose. Boring is what you want at this volume.",
        ],
      },
      {
        heading: "What I'd revisit",
        paras: [
          "Two things. Queue sharding belongs in runtime config; that would scale throughput without a redeploy. And signature verification covers the Xero webhook today — every inbound callback deserves the same HMAC check.",
        ],
      },
    ],
  },
]

export const getNote = (slug: string) => notes.find((n) => n.slug === slug)
export const getNoteForProject = (projectId: string) => notes.find((n) => n.projectId === projectId)
