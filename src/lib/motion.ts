import type { Transition, Variants } from 'framer-motion'

/**
 * Shared motion vocabulary.
 *
 * Everything animates transform/opacity only, so effects stay off the layout
 * path. Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.tsx, which flattens these to opacity-only.
 */

export const easeOutExpo: Transition['ease'] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOutExpo } },
}

/** Parent variant: children reveal one after another. */
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}

/** Shared viewport config so every section reveals at the same threshold. */
export const revealViewport = { once: true, amount: 0.2 } as const
