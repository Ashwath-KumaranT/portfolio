import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Info, Sparkles } from 'lucide-react'
import { aiFocusAreas, aiLabDisclaimer } from '../../data/aiLab'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { RagArchitecture } from '../architecture/RagArchitecture'
import { BentoCard } from '../ui/BentoCard'
import { SectionHeading } from '../ui/SectionHeading'
import { focusIcons } from '../ui/icons'
import { cn } from '../../lib/cn'

/**
 * AI Lab.
 *
 * Framed as current learning throughout — the disclaimer is part of the
 * section, not a footnote — because none of this is verified production
 * experience. New focus areas or diagrams can be appended in data/aiLab.ts
 * without touching this layout.
 */
export function AiLab({ className, headingId = 'ai-heading' }: { className?: string; headingId?: string }) {
  return (
    <BentoCard
      className={cn('flex flex-col gap-6 p-6 sm:p-7', className)}
      aria-labelledby={headingId}
      interactive={false}
    >
      <SectionHeading
        eyebrow="AI Lab · Current learning"
        icon={<Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
        title="How retrieval-augmented generation fits together"
        description="Select any stage to see what it does. The pipeline is split into the work that happens offline when documents change, and the work that happens on every question."
        id={headingId}
      />

      <RagArchitecture />

      <div className="flex flex-col gap-3">
        <h4 className="label-mono">Exploring</h4>
        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          {aiFocusAreas.map((area) => (
            <FocusCard key={area.id} area={area} />
          ))}
        </motion.ul>
      </div>

      <p className="flex items-start gap-2 rounded-xl border border-line bg-chip p-3 text-[0.78rem] leading-relaxed text-content-faint">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {aiLabDisclaimer}
      </p>
    </BentoCard>
  )
}

function FocusCard({ area }: { area: (typeof aiFocusAreas)[number] }) {
  const [expanded, setExpanded] = useState(false)
  const panelId = `focus-${area.id}-detail`

  return (
    <motion.li variants={fadeUp} className="h-fit">
      <div
        className={cn(
          'rounded-2xl border transition-colors duration-200',
          expanded ? 'border-line-strong bg-accent/8' : 'border-line bg-surface-sunken/70 hover:border-line-strong',
        )}
      >
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="flex w-full items-center gap-3 p-3.5 text-left"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-accent/12">
            <FocusIcon icon={area.icon} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-semibold text-content">{area.title}</span>
            <span className="truncate text-[0.72rem] text-content-faint">{area.short}</span>
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-content-faint transition-transform duration-300',
              expanded && 'rotate-180 text-accent-soft',
            )}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="border-t border-line px-3.5 py-3 text-[0.82rem] leading-relaxed text-content-muted">
                {area.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}

function FocusIcon({ icon }: { icon: (typeof aiFocusAreas)[number]['icon'] }) {
  const Icon = focusIcons[icon]
  return <Icon className="h-4 w-4 text-accent-soft" aria-hidden="true" />
}
