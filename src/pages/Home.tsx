import { About } from '../components/sections/About'
import { AiLab } from '../components/sections/AiLab'
import { AiLabTeaser } from '../components/sections/AiLabTeaser'
import { Blog } from '../components/sections/Blog'
import { Certifications } from '../components/sections/Certifications'
import { Contact } from '../components/sections/Contact'
import { Education } from '../components/sections/Education'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { HowIWork } from '../components/sections/HowIWork'
import { Projects } from '../components/sections/Projects'
import { QuickStats } from '../components/sections/QuickStats'
import { Skills } from '../components/sections/Skills'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/**
 * The Bento dashboard.
 *
 * Card sizes are deliberately unequal — the hero and the tech stack carry more
 * width than the supporting cards — so the grid has a reading order rather than
 * a uniform tile field. Each top-level `section` carries the id the sidebar
 * scroll-spy tracks.
 */
export function Home() {
  useDocumentTitle()

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <section id="home" aria-label="Introduction" className="grid gap-4 sm:gap-5 xl:grid-cols-3">
        <Hero className="xl:col-span-2" />
        <QuickStats />
      </section>

      <section id="about" aria-labelledby="about-heading" className="grid gap-4 sm:gap-5 lg:grid-cols-5">
        <About className="lg:col-span-3" />
        <HowIWork className="lg:col-span-2" />
      </section>

      <section id="skills" aria-labelledby="skills-heading">
        <Skills />
      </section>

      <section id="projects" aria-labelledby="projects-heading">
        <Projects trailing={<AiLabTeaser />} />
      </section>

      <section id="ai" aria-labelledby="ai-heading">
        <AiLab />
      </section>

      {/* Experience runs tall; Education and Certifications are short, so they
          share the opposite column rather than each stretching to match it. */}
      <div className="grid gap-4 sm:gap-5 xl:grid-cols-2">
        <section id="experience" aria-labelledby="experience-heading" className="flex">
          <Experience className="w-full" />
        </section>
        <div className="flex flex-col gap-4 sm:gap-5">
          <section id="education" aria-labelledby="education-heading" className="flex">
            <Education className="w-full" />
          </section>
          <section id="certifications" aria-labelledby="certifications-heading" className="flex flex-1">
            <Certifications className="w-full" />
          </section>
        </div>
      </div>

      <section id="blog" aria-labelledby="blog-heading">
        <Blog limit={3} />
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <Contact />
      </section>
    </div>
  )
}
