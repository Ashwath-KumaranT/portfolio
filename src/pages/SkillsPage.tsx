import { PageHeader } from '../components/layout/PageHeader'
import { Skills } from '../components/sections/Skills'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function SkillsPage() {
  useDocumentTitle(
    'Tech stack',
    'Languages, Android, frontend, backend, databases, AI/ML, cloud, version control, and testing technologies.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Tech stack"
        description="Grouped by where they sit in a system, with the projects that demonstrate them."
      />
      <Skills />
    </>
  )
}
