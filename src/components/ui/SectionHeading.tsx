import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type SectionHeadingProps = {
  /** Small mono eyebrow above the title. */
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  /** Heading level — sections on the home page nest under the page <h1>. */
  as?: 'h2' | 'h3'
  id?: string
  align?: 'left' | 'center'
  className?: string
  actions?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
  as: Tag = 'h2',
  id,
  align = 'left',
  className,
  actions,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        actions ? 'sm:flex-row sm:items-end sm:justify-between sm:gap-6' : undefined,
        className,
      )}
    >
      <div className={cn('flex flex-col gap-2', align === 'center' && 'items-center')}>
        {eyebrow && (
          <span className={cn('label-mono flex items-center gap-2', align === 'center' && 'justify-center')}>
            {icon}
            {eyebrow}
          </span>
        )}
        <Tag
          id={id}
          className={cn(
            'font-semibold tracking-tight text-content',
            Tag === 'h2' ? 'text-2xl sm:text-[1.75rem]' : 'text-xl',
          )}
        >
          {title}
        </Tag>
        {description && (
          <p className={cn('max-w-2xl text-sm leading-relaxed text-content-muted', align === 'center' && 'mx-auto')}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
