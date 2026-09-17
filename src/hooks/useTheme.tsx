import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

type ThemeContextValue = {
  theme: Theme
  /** True while the visitor has made no explicit choice (system preference wins). */
  isSystem: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — fall back to system.
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The inline script in index.html has already applied the right class before
  // first paint; this just mirrors that decision into React state.
  const [stored, setStored] = useState<Theme | null>(() => readStoredTheme())
  const [system, setSystem] = useState<Theme>(() => systemTheme())

  const theme = stored ?? system

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event: MediaQueryListEvent) => setSystem(event.matches ? 'light' : 'dark')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    // Enable colour transitions only for the duration of the switch, so the
    // change reads as a crossfade instead of a flash — and so the transition
    // doesn't interfere with hover/enter animations the rest of the time.
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 360)

    setStored(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Preference simply won't persist; the session still respects the choice.
    }
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isSystem: stored === null,
      setTheme,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, stored, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside a <ThemeProvider>')
  }
  return context
}
