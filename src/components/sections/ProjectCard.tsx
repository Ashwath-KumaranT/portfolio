import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { fadeUp } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { TechChip } from '../ui/TechChip'
import { cn } from '../../lib/cn'

/**
 * Project showcase card.
 *
 * The whole card is one link (a stretched overlay over the title link) so the
 * hit target is the tile, while assistive tech still sees a single, properly
 * labelled link rather than a nest of them.
 */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const titleId = `project-${project.slug}-title`

  return (
    <BentoCard
      as="article"
      aria-labelledby={titleId}
      className={cn('flex flex-col overflow-hidden', className)}
      reveal={false}
    >
      <motion.div variants={fadeUp} className="flex h-full flex-col">
        <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-surface-sunken">
          <img
            src={project.cover}
            alt={project.coverAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[650ms] ease-out group-hover/card:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
            style={{
              background: `linear-gradient(135deg, ${project.accent[0]}33, transparent 55%, ${project.accent[1]}33)`,
            }}
          />
          <span className="absolute top-3 left-3 rounded-chip border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-white/85 backdrop-blur-sm">
            {project.domain}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 id={titleId} className="text-lg leading-snug font-semibold tracking-tight text-content">
              <Link
                to={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {project.title}
              </Link>
            </h3>
            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-content-faint transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent-soft"
              aria-hidden="true"
            />
          </div>

          <p className="text-sm leading-relaxed text-content-muted">{project.summary}</p>

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((technology) => (
              <li key={technology}>
                <TechChip size="sm">{technology}</TechChip>
              </li>
            ))}
          </ul>

          <p className="mt-auto flex items-center gap-2 border-t border-line pt-3.5 text-[0.72rem] text-content-faint">
            <span className="font-mono">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </p>
        </div>
      </motion.div>
    </BentoCard>
  )
}
