"use client"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StudiesSection } from "@/components/studies-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ModelsSection } from "@/components/models-section"
import { PublicationsSection } from "@/components/publications-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { BlogPlaceholder } from "@/components/blog-placeholder"
import { useContent } from "@/contexts/content-context"

export default function Home() {
  const { content: portfolioData } = useContent()
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="about">
          <HeroSection data={portfolioData.personal} />
        </section>
        <section id="skills">
          <SkillsSection data={portfolioData.skills} />
        </section>

        <section id="studies">
          <StudiesSection data={{ studies: portfolioData.studies, certifications: portfolioData.certifications }} />
        </section>

        <section id="experience">
          <ExperienceSection data={portfolioData.experience} />
        </section>

        <section id="projects">
          <ProjectsSection data={portfolioData.projects} />
        </section>

        <section id="models">
          <ModelsSection data={portfolioData.models} />
        </section>

        <section id="publications">
          <PublicationsSection data={portfolioData.publications} />
        </section>

        <section id="contact">
          <ContactSection data={portfolioData.contact} />
        </section>

        {/* Section placeholder for blog */}
        <section id="blog" className="py-20 border-t border-border">
          <BlogPlaceholder />
        </section>
      </main>

      <Footer />
    </div>
  )
}
