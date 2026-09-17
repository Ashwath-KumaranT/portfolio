import { profile } from '../../data/profile'
import { socialByIdRecord } from '../../data/site'
import { SocialRow } from './SocialRow'

export function Footer() {
  const year = new Date().getFullYear()
  const github = socialByIdRecord.github

  return (
    <footer className="mt-12 border-t border-line pt-6">
      <div className="flex flex-col gap-4 text-sm text-content-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Built with React, TypeScript, Tailwind CSS and Framer Motion.</span>
          <a
            href={github.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-content-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-soft"
          >
            Source on GitHub
          </a>
        </p>
      </div>
      <div className="mt-4 lg:hidden">
        <SocialRow variant="row" />
      </div>
    </footer>
  )
}
