import { Compass } from 'lucide-react'
import { motion } from 'framer-motion'
import { processSteps } from '../../data/experience'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/cn'

/** How I work — engineering approach, deliberately not an achievements list. */
export function HowIWork({ className }: { className?: string }) {
  return (
    <BentoCard className={cn('flex flex-col gap-5 p-6 sm:p-7', className)} aria-labelledby="how-i-work-heading">
      <SectionHeading
        eyebrow="Process"
        icon={<Compass className="h-3.5 w-3.5" aria-hidden="true" />}
        title="How I work"
        as="h3"
        id="how-i-work-heading"
      />

      <motion.ol
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="flex flex-col gap-3"
      >
        {processSteps.map((step, index) => (
          <motion.li
            key={step.id}
            variants={fadeUp}
            className="group flex gap-3 rounded-xl border border-line bg-chip p-3 transition-colors duration-200 hover:border-line-strong"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line-strong bg-accent/12 font-mono text-[0.7rem] text-accent-soft">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-content">{step.title}</span>
              <span className="text-[0.82rem] leading-relaxed text-content-muted">{step.description}</span>
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </BentoCard>
  )
}
