/**
 * Placeholder shown while a lazily-loaded route chunk arrives.
 *
 * Sized like a card so the layout doesn't jump when the real page mounts, and
 * announced politely rather than assertively — it is a brief transitional
 * state, not something worth interrupting a screen reader for.
 */
export function RouteFallback() {
  return (
    <div role="status" aria-live="polite" className="surface-card flex min-h-[60vh] items-center justify-center p-8">
      <span className="flex items-center gap-3 text-sm text-content-muted">
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-line-strong border-t-transparent motion-reduce:animate-none"
        />
        Loading…
      </span>
    </div>
  )
}
