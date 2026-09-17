import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/cn'

/**
 * Light/dark switch.
 *
 * The icon crossfades rather than the whole control, so nothing reflows. The
 * theme class itself is applied synchronously in useTheme — there is no flash
 * of the previous theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={cn(
        'relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-chip text-content-muted',
        'transition-colors duration-200 hover:border-line-strong hover:text-content active:scale-95',
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
          transition={{ duration: 0.22 }}
          className="absolute inline-flex"
        >
          {theme === 'dark' ? (
            <Moon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
          ) : (
            <Sun className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
