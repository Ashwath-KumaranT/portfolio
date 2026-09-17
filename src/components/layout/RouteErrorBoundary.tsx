import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'

/**
 * Catches render errors inside the routed area.
 *
 * The case that actually happens in production is a stale lazy chunk: a
 * visitor has the page open, a new version is deployed, and their next
 * navigation requests a chunk filename that no longer exists. Without a
 * boundary that unmounts the entire app and leaves a blank page — so the
 * recovery offered here is a reload, which fetches the current build.
 */
type Props = { children: ReactNode }
type State = { hasError: boolean }

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No analytics on this site; the console is the only place to surface it.
    console.error('Route failed to render:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="surface-card flex min-h-[60vh] flex-col items-start justify-center gap-4 p-8 sm:p-12">
        <span className="label-mono">Something went wrong</span>
        <h1 className="text-2xl font-semibold tracking-tight text-content sm:text-3xl">
          This page couldn't be loaded
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-content-muted">
          This usually means the site was updated while you had it open. Reloading will fetch the latest version.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[linear-gradient(100deg,var(--accent),var(--accent-2))] px-5 py-2.5 text-sm font-medium text-white transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Reload the page
        </button>
      </div>
    )
  }
}
