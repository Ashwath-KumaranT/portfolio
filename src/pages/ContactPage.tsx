import { PageHeader } from '../components/layout/PageHeader'
import { Contact } from '../components/sections/Contact'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ContactPage() {
  useDocumentTitle('Contact', `Get in touch with ${profile.name} — ${profile.email}.`)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Send a message through the form, or email me directly — whichever is easier."
      />
      <Contact />
    </>
  )
}
