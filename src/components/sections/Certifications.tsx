import { Award, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { certifications } from '../../data/certifications'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { PlaceholderTag } from '../ui/PlaceholderTag'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/cn'

/**
 * Certifications.
 *
 * All current entries are dummy data, so each card carries a placeholder
 * marker and the credential link is inert — a dead "View Credential" link that
 * looked real would be worse than an obviously unfinished one.
 */
export function Certifications({
  className,
  headingId = 'certifications-heading',
}: {
  className?: string
  headingId?: string
}) {
  return (
    <BentoCard className={cn('flex flex-col gap-5 p-6 sm:p-7', className)} aria-labelledby={headingId}>
      <SectionHeading
        eyebrow="Certifications"
        icon={<Award className="h-3.5 w-3.5" aria-hidden="true" />}
        title="Credentials"
        description="Placeholder entries until verified certifications are added."
        id={headingId}
      />

      <motion.ul
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="flex flex-col gap-3"
      >
        {certifications.map((certification) => (
          <motion.li
            key={certification.id}
            variants={fadeUp}
            className={cn(
              'flex flex-col gap-2.5 rounded-2xl border p-4 transition-colors duration-200',
              certification.isPlaceholder
                ? 'border-dashed border-line bg-chip'
                : 'border-line bg-surface-sunken/70 hover:border-line-strong',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-col gap-0.5">
                <h4 className="text-sm font-semibold text-content">{certification.name}</h4>
                <p className="text-[0.8rem] text-content-muted">{certification.issuer}</p>
              </div>
              <span className="shrink-0 font-mono text-[0.7rem] text-content-faint">{certification.year}</span>
            </div>

            {certification.isPlaceholder ? (
              <div className="flex flex-wrap items-center gap-2">
                <PlaceholderTag />
                <span className="text-[0.75rem] text-content-faint">Credential link not available yet</span>
              </div>
            ) : (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-fit items-center gap-1.5 text-[0.78rem] font-medium text-accent-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
              >
                View Credential
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </BentoCard>
  )
}
