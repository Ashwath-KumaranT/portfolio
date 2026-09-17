import { FolderGit2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { projects } from '../../data/projects'
import { revealViewport, stagger } from '../../lib/motion'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import { cn } from '../../lib/cn'

/**
 * Featured projects grid.
 *
 * `trailing` lets the home page drop the AI Lab teaser into the fourth cell,
 * matching the Bento composition, without this component knowing about it.
 */
export function Projects({
  className,
  headingId = 'projects-heading',
  trailing,
  /** The /projects route already has a page-level heading above this grid. */
  showHeading = true,
}: {
  className?: string
  headingId?: string
  trailing?: ReactNode
  showHeading?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {showHeading && (
        <SectionHeading
          eyebrow="Projects"
          icon={<FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />}
          title="Selected work"
          description="Three projects across full-stack web, native Android, and AI retrieval. Each has a case study covering the problem, the architecture, and the decisions behind it."
          id={headingId}
        />
      )}

      <motion.div
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid gap-4 sm:gap-5 xl:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {trailing}
      </motion.div>
    </div>
  )
}
