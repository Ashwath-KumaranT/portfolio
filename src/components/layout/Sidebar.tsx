import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { availabilityShort, availability, profile } from '../../data/profile'
import { StatusBadge } from '../ui/StatusBadge'
import { NavList } from './NavList'
import { SocialRow } from './SocialRow'
import { ThemeToggle } from './ThemeToggle'

/**
 * Desktop sidebar: identity, availability, navigation, socials.
 *
 * Sticky and independently scrollable so a long nav never clips on short
 * viewports, while the main column scrolls normally behind it.
 */
export function Sidebar({ activeSectionId }: { activeSectionId: string | null }) {
  return (
    <aside className="hidden lg:block lg:w-[268px] lg:shrink-0">
      <div className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col gap-6 overflow-y-auto rounded-card border border-line bg-surface/85 p-5 shadow-card backdrop-blur-xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-xl"
              aria-label={`${profile.name} — home`}
            >
              <span className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] opacity-45 blur-[6px] transition-opacity duration-300 group-hover:opacity-70"
                />
                <img
                  src={profile.avatar}
                  alt={profile.avatarAlt}
                  width={52}
                  height={52}
                  className="relative h-13 w-13 rounded-full border border-line-strong object-cover"
                />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[0.95rem] leading-tight font-semibold text-content">
                  {profile.shortName}
                </span>
                <span className="truncate text-xs text-accent-soft">{profile.titles[0]}</span>
              </span>
            </Link>
            <ThemeToggle />
          </div>

          <StatusBadge label={availabilityShort} open={availability.open} size="sm" className="self-start" />

          <p className="flex items-center gap-1.5 text-xs text-content-faint">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        <nav aria-label="Primary" className="border-t border-line pt-4">
          <NavList activeSectionId={activeSectionId} indicatorId="sidebar-nav-indicator" />
        </nav>

        <div className="mt-auto border-t border-line pt-4">
          <p className="label-mono mb-1.5 px-3">Elsewhere</p>
          <SocialRow />
        </div>
      </div>
    </aside>
  )
}
