import { ArrowUpRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { aiFocusAreas, ragPipeline } from '../../data/aiLab'
import { fadeUp } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { TechChip } from '../ui/TechChip'

/**
 * Fourth cell of the projects grid on the home page — a compact pointer into
 * the AI Lab section, matching the Bento composition in the spec.
 */
export function AiLabTeaser() {
  function scrollToAiLab(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById('ai')
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <BentoCard as="article" className="flex flex-col p-6 sm:p-7" reveal={false} aria-labelledby="ai-teaser-title">
      <motion.div variants={fadeUp} className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <span className="label-mono flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI Lab
          </span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-content-faint transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent-soft"
            aria-hidden="true"
          />
        </div>

        <h3 id="ai-teaser-title" className="text-lg leading-snug font-semibold tracking-tight text-content">
          <Link to="/ai" onClick={scrollToAiLab} className="after:absolute after:inset-0 after:content-['']">
            Current learning: retrieval-augmented generation
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-content-muted">
          An interactive walkthrough of the pipeline — from documents through chunking, embeddings, and vector search to
          a grounded answer — plus where MCP fits.
        </p>

        <ol className="flex flex-wrap items-center gap-1.5">
          {ragPipeline.map((stage, index) => (
            <li key={stage.id} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-[0.65rem] text-content-faint">
                  →
                </span>
              )}
              <span className="rounded-chip border border-line bg-chip px-2 py-0.5 font-mono text-[0.65rem] text-content-muted">
                {stage.label}
              </span>
            </li>
          ))}
        </ol>

        <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-4">
          {aiFocusAreas.map((area) => (
            <li key={area.id}>
              <TechChip size="sm" tone="accent">
                {area.title}
              </TechChip>
            </li>
          ))}
        </ul>
      </motion.div>
    </BentoCard>
  )
}
