import { About } from '../components/sections/About'
import { Education } from '../components/sections/Education'
import { HowIWork } from '../components/sections/HowIWork'
import { PageHeader } from '../components/layout/PageHeader'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function AboutPage() {
  useDocumentTitle('About', profile.positioning)

  return (
    <>
      <PageHeader eyebrow="About" title="A bit more about me" description={profile.positioning} />
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-5">
        <About className="lg:col-span-3" />
        <HowIWork className="lg:col-span-2" />
        <Education className="lg:col-span-5" />
      </div>
    </>
  )
}
