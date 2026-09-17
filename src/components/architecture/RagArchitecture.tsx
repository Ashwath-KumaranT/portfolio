import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { ragPipeline } from '../../data/aiLab'
import type { PipelineStage } from '../../data/aiLab'
import { revealViewport } from '../../lib/motion'
import { cn } from '../../lib/cn'

/**
 * Interactive RAG pipeline diagram.
 *
 * Grouped by phase rather than laid out as one long chain: the ingest column is
 * offline work that runs when documents change, the query column is what a
 * request actually touches, and generation is the answer. That grouping is the
 * point of the diagram, and it also makes it legible on a phone — the three
 * columns stack into one readable vertical flow.
 *
 * Nodes illuminate in pipeline order as the section enters the viewport, and
 * each one is a button that swaps the explanation panel below.
 */

const phases: { id: PipelineStage['phase']; title: string; caption: string }[] = [
  { id: 'ingest', title: 'Ingestion', caption: 'Offline · runs when documents change' },
  { id: 'query', title: 'Retrieval', caption: 'Online · runs per question' },
  { id: 'generate', title: 'Generation', caption: 'Online · produces the answer' },
]

export function RagArchitecture() {
  const [selectedId, setSelectedId] = useState(ragPipeline[0].id)
  const shouldReduceMotion = useReducedMotion()
  const selected = ragPipeline.find((stage) => stage.id === selectedId) ?? ragPipeline[0]

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{
          hidden: {},
          // Sequential illumination in pipeline order.
          visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.11 } },
        }}
        className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-3"
      >
        {phases.map((phase, phaseIndex) => {
          const stages = ragPipeline.filter((stage) => stage.phase === phase.id)

          return (
            <PhaseColumn
              key={phase.id}
              phase={phase}
              stages={stages}
              selectedId={selectedId}
              onSelect={setSelectedId}
              isLast={phaseIndex === phases.length - 1}
            />
          )
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl border border-line-strong bg-accent/8 p-4 sm:p-5"
          aria-live="polite"
        >
          <p className="label-mono mb-1.5">{selected.role}</p>
          <h4 className="mb-2 text-base font-semibold text-content">{selected.label}</h4>
          <p className="text-sm leading-relaxed text-content-muted">{selected.detail}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function PhaseColumn({
  phase,
  stages,
  selectedId,
  onSelect,
  isLast,
}: {
  phase: { id: string; title: string; caption: string }
  stages: PipelineStage[]
  selectedId: string
  onSelect: (id: string) => void
  isLast: boolean
}) {
  return (
    <>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-semibold tracking-wide text-accent-soft uppercase">{phase.title}</p>
          <p className="text-[0.7rem] text-content-faint">{phase.caption}</p>
        </div>

        <ul className="flex flex-col gap-2">
          {stages.map((stage, index) => (
            <li key={stage.id} className="flex flex-col items-stretch gap-2">
              <StageNode stage={stage} isSelected={selectedId === stage.id} onSelect={onSelect} />
              {index < stages.length - 1 && (
                <span className="flex justify-center text-content-faint" aria-hidden="true">
                  <ArrowDown className="h-3.5 w-3.5" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {!isLast && (
        <span
          className="flex items-center justify-center py-1 text-content-faint lg:h-full lg:pt-16"
          aria-hidden="true"
        >
          <ArrowDown className="h-4 w-4 lg:hidden" />
          <ArrowRight className="hidden h-4 w-4 lg:block" />
        </span>
      )}
    </>
  )
}

function StageNode({
  stage,
  isSelected,
  onSelect,
}: {
  stage: PipelineStage
  isSelected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(stage.id)}
      aria-pressed={isSelected}
      variants={{
        hidden: { opacity: 0, y: 10, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={cn(
        'group flex w-full flex-col items-start gap-0.5 rounded-xl border px-3.5 py-2.5 text-left transition-colors duration-200',
        isSelected
          ? 'border-line-strong bg-accent/15 shadow-[0_0_0_1px_var(--line-strong),0_12px_30px_-18px_var(--glow)]'
          : 'border-line bg-surface-sunken/70 hover:border-line-strong hover:bg-accent/8',
      )}
    >
      <span
        className={cn(
          'text-sm font-medium transition-colors',
          isSelected ? 'text-content' : 'text-content-muted group-hover:text-content',
        )}
      >
        {stage.label}
      </span>
      <span className="text-[0.7rem] leading-snug text-content-faint">{stage.role}</span>
    </motion.button>
  )
}
