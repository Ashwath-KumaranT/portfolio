import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeUp, revealViewport } from '../../lib/motion'

/**
 * Motion components are created once at module scope — building one during
 * render would produce a fresh component type each pass and remount the card.
 */
const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
} as const

export type BentoTag = keyof typeof motionTags

type BentoCardProps = {
  children: ReactNode
  className?: string
  /** Semantic element for the card wrapper. */
  as?: BentoTag
  /** Disable the hover lift for cards that contain their own interactive surface. */
  interactive?: boolean
  /** Skip the viewport reveal (e.g. when a parent already staggers its children). */
  reveal?: boolean
  id?: string
  'aria-labelledby'?: string
  'aria-label'?: string
}

/**
 * The Bento tile.
 *
 * Every card on the site is one of these, so the surface treatment, the reveal,
 * and the pointer-tracking highlight are defined once. The highlight follows the
 * cursor via CSS custom properties written from motion values — no re-render per
 * mouse move.
 */
export function BentoCard({
  children,
  className,
  as = 'div',
  interactive = true,
  reveal = true,
  ...rest
}: BentoCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const pointerX = useMotionValue(-200)
  const pointerY = useMotionValue(-200)
  const highlight = useMotionTemplate`radial-gradient(420px circle at ${pointerX}px ${pointerY}px, var(--glow), transparent 68%)`

  // All four tags share the same prop surface here; the cast keeps the union
  // from collapsing to `never` when TypeScript intersects their prop types.
  const MotionTag = motionTags[as] as typeof motion.div

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!interactive || shouldReduceMotion) return
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    pointerX.set(event.clientX - bounds.left)
    pointerY.set(event.clientY - bounds.top)
  }

  function handlePointerLeave() {
    pointerX.set(-200)
    pointerY.set(-200)
  }

  return (
    <MotionTag
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      variants={reveal ? fadeUp : undefined}
      initial={reveal ? 'hidden' : undefined}
      whileInView={reveal ? 'visible' : undefined}
      viewport={reveal ? revealViewport : undefined}
      whileHover={interactive && !shouldReduceMotion ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className={cn(
        'surface-card group/card relative isolate overflow-hidden',
        interactive && 'transition-[border-color,box-shadow] duration-300 hover:border-line-strong',
        className,
      )}
      {...rest}
    >
      {interactive && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ background: highlight }}
        />
      )}
      {children}
    </MotionTag>
  )
}
