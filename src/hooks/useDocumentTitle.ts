import { useEffect } from 'react'
import { profile } from '../data/profile'

const baseTitle = `${profile.name} | ${profile.titles.join(' • ')}`

/**
 * Keep <title> and the meta description in step with the route.
 *
 * The site is a static SPA, so there is no server-rendered head — this is what
 * makes deep links show the right title in history, bookmarks, and tab strips.
 */
export function useDocumentTitle(pageTitle?: string, description?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${profile.shortName}` : baseTitle

    if (!description) return
    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content') ?? null
    meta?.setAttribute('content', description)
    return () => {
      if (previous !== null) meta?.setAttribute('content', previous)
    }
  }, [pageTitle, description])
}
