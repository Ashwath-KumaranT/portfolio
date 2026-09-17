import { Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { skillGroups } from '../../data/skills'
import { projectsBySlug } from '../../data/projects'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { SectionHeading } from '../ui/SectionHeading'
import { TechChip } from '../ui/TechChip'
import { skillIcons } from '../ui/icons'
import { cn } from '../../lib/cn'

/**
 * Technical skills.
 *
 * Grouped chips, no proficiency percentages — a self-assigned "85% React" is
 * not information. Where a group is demonstrated by a project, the card links
 * to that case study instead, so the evidence is the claim.
 */
export function Skills({ className, headingId = 'skills-heading' }: { className?: string; headingId?: string }) {
  return (
    <BentoCard className={cn('flex flex-col gap-6 p-6 sm:p-7', className)} aria-labelledby={headingId}>
      <SectionHeading
        eyebrow="Tech Stack"
        icon={<Layers className="h-3.5 w-3.5" aria-hidden="true" />}
        title="Technologies I build with"
        description="Grouped by where they sit in a system. Linked projects are the evidence — there are no self-rated proficiency scores here."
        id={headingId}
      />

      <motion.ul
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {skillGroups.map((group) => {
          const Icon = skillIcons[group.icon]
          const linkedProjects = group.projects
            .map((slug) => projectsBySlug[slug])
            .filter((project) => project !== undefined)

          return (
            <motion.li
              key={group.id}
              variants={fadeUp}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-sunken/70 p-4 transition-colors duration-200 hover:border-line-strong"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-accent/12">
                  <Icon className="h-4 w-4 text-accent-soft" aria-hidden="true" />
                </span>
                <h4 className="text-sm font-semibold text-content">{group.category}</h4>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {group.technologies.map((technology) => (
                  <li key={technology}>
                    <TechChip size="sm">{technology}</TechChip>
                  </li>
                ))}
              </ul>

              {linkedProjects.length > 0 && (
                <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-3 text-[0.72rem] text-content-faint">
                  <span>Used in</span>
                  {linkedProjects.map((project, index) => (
                    <span key={project.slug} className="flex items-center gap-2">
                      {index > 0 && <span aria-hidden="true">·</span>}
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-content-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-soft"
                      >
                        {project.shortTitle}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </motion.li>
          )
        })}
      </motion.ul>
    </BentoCard>
  )
}
