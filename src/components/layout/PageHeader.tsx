import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../../lib/motion'

type Breadcrumb = { label: string; to: string }

/** Heading block for the standalone routes, with a way back up the hierarchy. */
export function PageHeader({
  eyebrow,
  title,
  description,
  backTo = { label: 'Home', to: '/' },
  actions,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  backTo?: Breadcrumb
  actions?: ReactNode
}) {
  return (
    <motion.header variants={stagger(0.07)} initial="hidden" animate="visible" className="mb-6 flex flex-col gap-4">
      <motion.div variants={fadeUp}>
        <Link
          to={backTo.to}
          className="inline-flex items-center gap-1.5 text-sm text-content-muted transition-colors hover:text-accent-soft"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to {backTo.label}
        </Link>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          {eyebrow && <span className="label-mono">{eyebrow}</span>}
          <h1 className="text-[1.75rem] leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            <span className="gradient-text">{title}</span>
          </h1>
          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-content-muted sm:text-base">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </motion.div>
    </motion.header>
  )
}
