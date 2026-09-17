import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type TechChipProps = {
  children: ReactNode
  /** `accent` highlights the technologies that are the current focus. */
  tone?: 'default' | 'accent' | 'muted'
  size?: 'sm' | 'md'
  icon?: ReactNode
  className?: string
}

export function TechChip({ children, tone = 'default', size = 'md', icon, className }: TechChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-chip border font-medium whitespace-nowrap',
        size === 'sm' ? 'px-2.5 py-1 text-[0.72rem]' : 'px-3 py-1.5 text-[0.8rem]',
        tone === 'default' && 'border-line bg-chip text-content-muted',
        tone === 'accent' && 'border-line-strong bg-accent/12 text-accent-soft',
        tone === 'muted' && 'border-transparent bg-chip text-content-faint',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
