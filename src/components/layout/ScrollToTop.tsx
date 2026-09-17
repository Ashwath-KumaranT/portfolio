import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reset scroll on route change.
 *
 * Without this a deep case study opens halfway down, because the browser keeps
 * the previous page's scroll offset on a client-side navigation. Uses 'auto'
 * rather than smooth so it isn't a visible scroll animation on every click.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
