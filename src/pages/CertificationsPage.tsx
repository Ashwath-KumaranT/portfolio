import { PageHeader } from '../components/layout/PageHeader'
import { Certifications } from '../components/sections/Certifications'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CertificationsPage() {
  useDocumentTitle('Certifications', 'Certification placeholders, pending verified credentials.')

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Certifications"
        description="These entries are placeholders. They will be replaced with verified certifications and working credential links."
      />
      <div className="grid gap-4 sm:gap-5 lg:max-w-2xl">
        <Certifications />
      </div>
    </>
  )
}
