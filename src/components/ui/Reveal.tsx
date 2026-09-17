import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { cn } from '../../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'span' | 'p'
}

/** Single element that fades up as it enters the viewport. */
export function Reveal({ children, className, variants = fadeUp, delay = 0, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

type RevealGroupProps = {
  children: ReactNode
  className?: string
  step?: number
  delay?: number
  as?: 'div' | 'section' | 'ul' | 'ol'
}

/** Parent that reveals its <Reveal>/variant-aware children in sequence. */
export function RevealGroup({ children, className, step = 0.07, delay = 0, as = 'div' }: RevealGroupProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Tag>
  )
}
