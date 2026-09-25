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
  role: "Staff Engineer",
  positioning:
    "Clinical cloud platforms, multi-tenant systems, SaaS, and production agent workflows.",
  headline:
    "Staff engineer who ships production systems and the agent workflows that keep them moving.",
  summary:
    "8+ years across healthcare, medical imaging AI, consumer media, and SaaS. At Evolve I own the cloud architecture for a clinical VR headset: identity, the application database, and the operator product. I use agents as a verified engineering multiplier.",
  current: "Staff Engineer, Evolve",
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
  contexts: ["Healthcare", "Clinical devices", "Clinical AI", "SaaS platforms", "Remote UK / EU / Global"],
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
