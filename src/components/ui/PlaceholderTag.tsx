import { CircleDashed } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * Marks dummy content as dummy.
 *
 * The spec requires placeholders to stay explicit rather than read as real
 * claims, so anything flagged `isPlaceholder` in the data files renders one of
 * these. The icon plus the word "Placeholder" means the signal does not depend
 * on colour.
 */
export function PlaceholderTag({ label = 'Placeholder', className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-chip border border-dashed border-amber-500/45 bg-amber-400/10 px-2 py-0.5 text-[0.68rem] font-medium tracking-wide text-amber-700 dark:border-amber-400/45 dark:text-amber-300/90',
        className,
      )}
    >
      <CircleDashed className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  )
}
