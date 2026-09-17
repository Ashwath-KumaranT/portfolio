import { Home as HomeIcon, FolderGit2 } from 'lucide-react'
import { BentoCard } from '../components/ui/BentoCard'
import { Button } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <BentoCard className="flex flex-col items-start gap-5 p-8 sm:p-12" interactive={false}>
      <span className="label-mono">404</span>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        <span className="gradient-text">This page doesn't exist</span>
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-content-muted">
        The link may be out of date, or the page may have moved. Everything on this site is reachable from the home
        page.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button as="link" to="/" icon={<HomeIcon className="h-4 w-4" />}>
          Back to home
        </Button>
        <Button as="link" to="/projects" variant="secondary" icon={<FolderGit2 className="h-4 w-4" />}>
          View projects
        </Button>
      </div>
    </BentoCard>
  )
}
