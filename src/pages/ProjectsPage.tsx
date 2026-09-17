import { PageHeader } from '../components/layout/PageHeader'
import { Projects } from '../components/sections/Projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ProjectsPage() {
  useDocumentTitle(
    'Projects',
    'Full-stack web, native Android, and AI retrieval projects, each with a case study covering the problem, architecture, and engineering decisions.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Selected work"
        description="Each project has a case study covering the problem it solves, the architecture, the decisions behind it, and what it did not resolve."
      />
      <Projects showHeading={false} />
    </>
  )
}
