import { socialLinks } from '../../data/site'
import { socialIcons } from '../ui/icons'
import { cn } from '../../lib/cn'

type SocialRowProps = {
  variant?: 'list' | 'row'
  className?: string
}

/**
 * Social links.
 *
 * Placeholder destinations still render — they are part of the layout — but
 * they are visually de-emphasised and announced as placeholders to screen
 * readers, so nobody mistakes a dummy URL for a real profile.
 */
export function SocialRow({ variant = 'list', className }: SocialRowProps) {
  return (
    <ul className={cn(variant === 'list' ? 'flex flex-col gap-0.5' : 'flex flex-wrap items-center gap-2', className)}>
      {socialLinks.map((link) => {
        const Icon = socialIcons[link.id]
        return (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={
                link.isPlaceholder ? `${link.label} (placeholder link)` : `${link.label} profile`
              }
              className={cn(
                'group flex items-center gap-2.5 rounded-lg text-sm transition-colors duration-200',
                variant === 'list'
                  ? 'px-3 py-2 text-content-muted hover:bg-chip hover:text-content'
                  : 'border border-line bg-chip px-3 py-2 text-content-muted hover:border-line-strong hover:text-content',
                link.isPlaceholder && 'opacity-65',
              )}
            >
              <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span>{link.label}</span>
              {link.isPlaceholder && (
                <span className="text-[0.62rem] tracking-wide text-content-faint uppercase">dummy</span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
