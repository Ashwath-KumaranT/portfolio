import { Experience } from '../components/sections/Experience'
import { Education } from '../components/sections/Education'
import { Certifications } from '../components/sections/Certifications'
import { PageHeader } from '../components/layout/PageHeader'
import { experience } from '../data/experience'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ExperiencePage() {
  const current = experience[0]

  useDocumentTitle(
    'Experience',
    `${current.role} at ${current.company} since ${current.start}, based in ${current.location}.`,
  )

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Professional background"
        description="Roles, education, and credentials. Client work is described only at a level that is safe to publish."
      />
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <Experience className="lg:col-span-2" />
        <Education />
        <Certifications />
      </div>
    </>
  )
}
