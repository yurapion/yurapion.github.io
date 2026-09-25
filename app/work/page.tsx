import type { Metadata } from "next"
import { Nav } from "@/components/site/nav"
import { CaseStudies } from "@/components/site/case-studies"
import { EvidencePolicy } from "@/components/site/evidence-policy"
import { Footer } from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Verified case studies from a clinical headset cloud, healthcare, clinical AI, hospitality SaaS, and consumer media platforms.",
}

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="pt-10">
        <CaseStudies />
        <EvidencePolicy />
      </main>
      <Footer />
    </>
  )
}
