import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { homeSectionOrder } from '../../data/navigation'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { AmbientBackground } from './AmbientBackground'
import { Footer } from './Footer'
import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar'

/**
 * App shell: ambient background, sidebar (desktop) or header + drawer (mobile),
 * and the main content column.
 *
 * Scroll-spy only runs on the home page, where all sections are on one
 * document; on standalone routes the active item comes from the pathname.
 */
export function PageContainer({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const activeSectionId = useScrollSpy(homeSectionOrder, pathname === '/')

  return (
    <div className="relative min-h-dvh">
      <AmbientBackground />

      <a
        href="#main-content"
        className="sr-only z-100 rounded-xl border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-content focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to main content
      </a>

      <MobileHeader activeSectionId={activeSectionId} />

      <div className="mx-auto flex w-full max-w-[1600px] gap-7 px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-6">
        <Sidebar activeSectionId={activeSectionId} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main id="main-content" className="min-w-0 flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
