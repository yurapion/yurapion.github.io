export const basePath = ""
export const siteUrl = "https://yurapion.github.io"

export const routes = {
  home: `${basePath}/`,
  work: `${basePath}/work/`,
  practice: `${basePath}/practice/`,
  ai: `${basePath}/ai-engineering/`,
  experience: `${basePath}/experience/`,
  stack: `${basePath}/stack/`,
  notes: `${basePath}/notes/`,
  contact: `${basePath}/#contact`,
  cv: `${basePath}/cv/Yurii_Piontkovskyi_CV.pdf`,
}

export const siteProfile = {
  name: "Yurii Piontkovskyi",
  role: "AI Product Engineer · Staff Engineer",
  positioning:
    "Agent-facing APIs, clinical cloud platforms, multi-tenant systems, and production agent workflows.",
  headline:
    "Engineer who ships production systems, the APIs agents call, and the agent workflows that keep both moving.",
  summary:
    "8+ years across healthcare, medical imaging AI, consumer media, travel, and SaaS. At YGO I build the APIs that AI agents call on a B2B travel platform, starting with a remote MCP server. At Evolve I wrote the cloud platform plan for a clinical VR headset and then delivered it: PostgreSQL, identity, and session authority in the cloud. I use agents as a verified engineering multiplier.",
  current: "AI Product Engineer, YGO",
  location: "Remote — open to UK / EU / Global",
  email: "yurapion@gmail.com",
  linkedin: "https://www.linkedin.com/in/yuryi-piontkovskyi-240a74131",
  github: "https://github.com/yurapion",
}

export const lookingFor = {
  title: "What I'm looking for",
  roles: [
    "Staff Engineer",
    "Senior Full-Stack Engineer",
    "AI Engineer / Agentic Systems",
    "Platform or Product Engineer",
  ],
  contexts: ["Agent-facing products", "Healthcare", "Clinical devices", "SaaS platforms", "Remote UK / EU / Global"],
  note: "Best fit: complex production systems where architecture, delivery, and verification all matter.",
}

export const navLinks = [
  { href: routes.work, label: "Work" },
  { href: routes.practice, label: "Practice" },
  { href: routes.ai, label: "AI" },
  { href: routes.experience, label: "Experience" },
  { href: routes.notes, label: "Notes" },
  { href: routes.contact, label: "Contact" },
]
