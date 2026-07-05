import { Nav } from "@/components/site/nav"
import { Hero } from "@/components/site/hero"
import { CaseStudies } from "@/components/site/case-studies"
import { PrinciplesSection } from "@/components/site/principles-section"
import { AIEngineering } from "@/components/site/ai-engineering"
import { WritingSection } from "@/components/site/writing-section"
import { ExperienceSection } from "@/components/site/experience-section"
import { SkillsSection } from "@/components/site/skills-section"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseStudies />
        <PrinciplesSection />
        <AIEngineering />
        <WritingSection />
        <ExperienceSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  )
}
