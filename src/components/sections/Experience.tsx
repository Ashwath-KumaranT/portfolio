import { Briefcase, Building2, Lock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { experience } from '../../data/experience'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { PlaceholderTag } from '../ui/PlaceholderTag'
import { SectionHeading } from '../ui/SectionHeading'
import { TechChip } from '../ui/TechChip'
import { cn } from '../../lib/cn'

/**
 * Professional experience.
 *
 * Responsibilities are rendered as explicit placeholders rather than invented
 * bullet points, and the confidentiality note is shown in the UI so the gap is
 * obviously a choice and not an omission.
 */
export function Experience({
  className,
  headingId = 'experience-heading',
}: {
  className?: string
  headingId?: string
}) {
  return (
    <BentoCard className={cn('flex flex-col gap-5 p-6 sm:p-7', className)} aria-labelledby={headingId}>
      <SectionHeading
        eyebrow="Experience"
        icon={<Briefcase className="h-3.5 w-3.5" aria-hidden="true" />}
        title="Where I work"
        id={headingId}
      />

      <motion.ol
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="flex flex-col gap-5"
      >
        {experience.map((entry) => (
          <motion.li key={entry.id} variants={fadeUp} className="relative flex flex-col gap-3 pl-6">
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 h-2.5 w-2.5 rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))]"
            />
            <span
              aria-hidden="true"
              className="absolute top-6 bottom-0 left-[0.3rem] w-px bg-line last:hidden"
            />

            <div className="flex flex-col gap-1">
              <h4 className="flex items-center gap-2 text-base font-semibold text-content">
                <Building2 className="h-4 w-4 text-accent-soft" aria-hidden="true" />
                {entry.company}
              </h4>
              <p className="text-sm text-content-muted">{entry.role}</p>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] text-content-faint">
                <span>
                  {entry.start} — {entry.end}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {entry.location}
                </span>
              </p>
            </div>

            <p className="text-[0.85rem] leading-relaxed text-content-muted">{entry.summary}</p>

            <ul className="flex flex-col gap-2">
              {entry.responsibilityPlaceholders.map((placeholder, index) => (
                <li
                  key={index}
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-line px-3 py-2 text-[0.8rem] text-content-faint"
                >
                  <PlaceholderTag />
                  <span>{placeholder}</span>
                </li>
              ))}
            </ul>

            {entry.technologies.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {entry.technologies.map((technology) => (
                  <li key={technology}>
                    <TechChip size="sm">{technology}</TechChip>
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </motion.ol>

      <p className="flex items-start gap-2 rounded-xl border border-line bg-chip p-3 text-[0.75rem] leading-relaxed text-content-faint">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Client names, internal systems, and proprietary details are intentionally omitted. Professional work is described
        only at a level that is safe to publish.
      </p>
    </BentoCard>
  )
}
