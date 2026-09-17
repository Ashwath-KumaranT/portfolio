import { useEffect, useState } from 'react'

/**
 * Tracks which of the given section ids is currently the most prominent in the
 * viewport, for the sidebar's active-section indicator.
 *
 * Picks the entry closest to the top of the viewport among those intersecting,
 * which behaves better than "last one to cross" when sections have very
 * different heights — a short Education card between two tall ones still wins
 * while it is the one being read.
 */
export function useScrollSpy(sectionIds: string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null)

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const visible = new Set<HTMLElement>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target as HTMLElement)
          } else {
            visible.delete(entry.target as HTMLElement)
          }
        }

        if (visible.size === 0) return

        // Measure live rather than reusing the rect from the entry: an entry is
        // only delivered when intersection *changes*, so a section that came
        // into view several screens ago would otherwise be compared using a
        // long-stale offset.
        let best: HTMLElement | null = null
        let bestDistance = Number.POSITIVE_INFINITY
        for (const element of visible) {
          const distance = Math.abs(element.getBoundingClientRect().top)
          if (distance < bestDistance) {
            bestDistance = distance
            best = element
          }
        }
        if (best) setActiveId(best.id)
      },
      // Ignore the top strip hidden behind the mobile header.
      { rootMargin: '-88px 0px -45% 0px', threshold: [0, 0.15, 0.5] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sectionIds, enabled])

  return enabled ? activeId : null
}
