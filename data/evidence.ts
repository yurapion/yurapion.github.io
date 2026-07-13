export const evidencePolicy = {
  title: "How claims are verified",
  summary:
    "Every figure on this site is either counted from local source repositories or carried from the current CV / delivery record. I keep those two kinds of evidence separate so a technical reader can tell what was measured in code from what came from delivery history.",
  rules: [
    {
      label: "Source-counted",
      body: "Service counts, migrations, locale files, controllers, GraphQL configs, and similar figures come from the project repos on this machine.",
    },
    {
      label: "CV / delivery",
      body: "Trust rollout, venue count, screening volume, and festival reach come from the current CV and delivery records. They are not invented from code.",
    },
    {
      label: "Not used",
      body: "No testimonials, invented funding figures, unverified projects, or metrics I cannot point back to source or the CV.",
    },
  ],
}
