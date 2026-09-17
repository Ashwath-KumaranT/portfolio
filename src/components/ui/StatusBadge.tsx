import { cn } from '../../lib/cn'

type StatusBadgeProps = {
  label: string
  /** Open = green dot, otherwise amber. Never colour alone — the label says it too. */
  open?: boolean
  className?: string
  size?: 'sm' | 'md'
}

export function StatusBadge({ label, open = true, className, size = 'md' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-chip font-medium text-content-muted',
        size === 'sm' ? 'px-2.5 py-1 text-[0.7rem]' : 'px-3.5 py-1.5 text-xs',
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span
          className={cn(
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden',
            open ? 'bg-emerald-400' : 'bg-amber-400',
          )}
        />
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', open ? 'bg-emerald-400' : 'bg-amber-400')} />
      </span>
      {label}
    </span>
  )
}
