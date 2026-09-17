import { PageHeader } from '../components/layout/PageHeader'
import { Education } from '../components/sections/Education'
import { Certifications } from '../components/sections/Certifications'
import { education } from '../data/experience'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function EducationPage() {
  const primary = education[0]

  useDocumentTitle(
    'Education',
    `${primary.degree} in ${primary.field} from ${primary.institution}, ${primary.start}–${primary.end}, ${primary.grade}.`,
  )

  return (
    <>
      <PageHeader eyebrow="Profile" title="Education & certifications" />
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <Education />
        <Certifications />
      </div>
    </>
  )
}
