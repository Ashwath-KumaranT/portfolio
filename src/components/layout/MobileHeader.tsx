import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { availability, availabilityShort, profile } from '../../data/profile'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { StatusBadge } from '../ui/StatusBadge'
import { NavList } from './NavList'
import { SocialRow } from './SocialRow'
import { ThemeToggle } from './ThemeToggle'

/**
 * Compact top header + slide-in drawer, replacing the sidebar below `lg`.
 *
 * The drawer traps nothing exotic: it closes on Escape, on route change, on
 * backdrop click, and returns focus to the trigger — which covers keyboard use
 * without a focus-trap dependency.
 */
export function MobileHeader({ activeSectionId }: { activeSectionId: string | null }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const drawerId = useId()

  useLockBodyScroll(open)

  // Close the drawer whenever the route changes — including on browser
  // back/forward, which doesn't go through the nav links' own handler.
  // Adjusting state during render rather than in an effect avoids a frame
  // where the drawer is still open over the new page.
  const [renderedPath, setRenderedPath] = useState(pathname)
  if (renderedPath !== pathname) {
    setRenderedPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 lg:hidden">
        <div className="border-b border-line bg-canvas/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6">
            <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${profile.name} — home`}>
              <img
                src={profile.avatar}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-full border border-line-strong object-cover"
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm leading-tight font-semibold text-content">{profile.shortName}</span>
                <span className="truncate text-[0.68rem] text-accent-soft">{profile.titles[0]}</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls={drawerId}
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-chip text-content-muted transition-colors duration-200 hover:border-line-strong hover:text-content active:scale-95"
              >
                {open ? <X className="h-[1.15rem] w-[1.15rem]" /> : <Menu className="h-[1.15rem] w-[1.15rem]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-sm"
            />

            <motion.div
              id={drawerId}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col gap-5 overflow-y-auto border-l border-line bg-surface p-5 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-content">{profile.shortName}</p>
                  <StatusBadge label={availabilityShort} open={availability.open} size="sm" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                  aria-label="Close navigation menu"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-chip text-content-muted transition-colors hover:text-content"
                >
                  <X className="h-[1.15rem] w-[1.15rem]" />
                </button>
              </div>

              <nav aria-label="Primary" className="border-t border-line pt-4">
                <NavList
                  activeSectionId={activeSectionId}
                  indicatorId="drawer-nav-indicator"
                  onNavigate={() => setOpen(false)}
                />
              </nav>

              <div className="mt-auto border-t border-line pt-4">
                <p className="label-mono mb-1.5 px-3">Elsewhere</p>
                <SocialRow />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
