export const basePath = "/newportfolio"

export const routes = {
  home: `${basePath}/`,
  work: `${basePath}/work/`,
  ai: `${basePath}/ai-engineering/`,
  experience: `${basePath}/experience/`,
  stack: `${basePath}/stack/`,
  contact: `${basePath}/#contact`,
  cv: `${basePath}/cv/Yurii_Piontkovskyi_CV.pdf`,
}

export const siteProfile = {
  name: "Yurii Piontkovskyi",
  role: "Senior Full-Stack Engineer",
  positioning: "Cloud-native systems, clinical AI, SaaS platforms, and production-grade agentic development.",
  location: "Remote — open to UK / EU / Global",
  email: "yurapion@gmail.com",
  linkedin: "https://www.linkedin.com/in/yuryi-piontkovskyi-240a74131",
  github: "https://github.com/yurapion",
}

export const navLinks = [
  { href: routes.work, label: "Work" },
  { href: routes.ai, label: "AI" },
  { href: routes.experience, label: "Experience" },
  { href: routes.stack, label: "Stack" },
  { href: routes.contact, label: "Contact" },
]
