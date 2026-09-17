import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navItems } from '../../data/navigation'
import { navIcons } from '../ui/icons'
import { cn } from '../../lib/cn'

type NavListProps = {
  /** Section id currently in view, when scroll-spy is active on the home page. */
  activeSectionId: string | null
  onNavigate?: () => void
  /** Shared layoutId group for the sliding active indicator. */
  indicatorId: string
}

/**
 * Primary navigation.
 *
 * Each entry keeps a real `href` (so middle-click and "open in new tab" work),
 * but on the home page — where every section is already rendered — a plain
 * click is intercepted and turned into a smooth scroll instead of a route
 * change. Elsewhere it navigates to the standalone section route.
 */
export function NavList({ activeSectionId, onNavigate, indicatorId }: NavListProps) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
    if (!isHome) return
    // Let the browser handle modified clicks (new tab, new window, download).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return

    const target = document.getElementById(sectionId)
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Move keyboard focus with the scroll so the next Tab continues from here.
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    onNavigate?.()
  }

  return (
    <ul className="flex flex-col gap-0.5">
      {navItems.map((item) => {
        const Icon = navIcons[item.icon]
        const isActive = isHome
          ? activeSectionId === item.sectionId
          : pathname === item.path || pathname.startsWith(`${item.path}/`)

        return (
          <li key={item.id}>
            <Link
              to={item.path}
              onClick={(event) => {
                handleClick(event, item.sectionId)
                if (!isHome) onNavigate?.()
              }}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                isActive ? 'text-content' : 'text-content-muted hover:bg-chip hover:text-content',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={indicatorId}
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-xl border border-line-strong bg-accent/12"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                className={cn(
                  'h-[1.05rem] w-[1.05rem] shrink-0 transition-colors duration-200',
                  isActive ? 'text-accent-soft' : 'text-content-faint group-hover:text-content-muted',
                )}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
