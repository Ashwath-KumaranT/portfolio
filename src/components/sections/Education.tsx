import { GraduationCap, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { education } from '../../data/experience'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/cn'

export function Education({
  className,
  headingId = 'education-heading',
}: {
  className?: string
  headingId?: string
}) {
  return (
    <BentoCard className={cn('flex flex-col gap-5 p-6 sm:p-7', className)} aria-labelledby={headingId}>
      <SectionHeading
        eyebrow="Education"
        icon={<GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />}
        title="Academic background"
        id={headingId}
      />

      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="flex flex-col gap-4"
      >
        {education.map((entry) => (
          <motion.li
            key={entry.id}
            variants={fadeUp}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-sunken/70 p-4"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-[0.95rem] leading-snug font-semibold text-content">{entry.institution}</h4>
              <p className="text-sm text-content-muted">
                {entry.degree} · {entry.field}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line pt-3 font-mono text-[0.7rem] text-content-faint">
              <span>
                {entry.start} — {entry.end}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {entry.location}
              </span>
              <span className="ml-auto rounded-chip border border-line-strong bg-accent/12 px-2 py-0.5 text-accent-soft">
                {entry.grade}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </BentoCard>
  )
}
