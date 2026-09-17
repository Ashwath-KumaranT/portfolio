import { motion } from 'framer-motion'
import { Briefcase, FolderGit2, GraduationCap, Sparkles } from 'lucide-react'
import { aiFocusAreas } from '../../data/aiLab'
import { education } from '../../data/experience'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { cn } from '../../lib/cn'

/**
 * Quick stats.
 *
 * Every figure is derived from the data files — counts of things that exist on
 * this site, plus dated facts. Nothing here is an invented achievement metric.
 */
const stats = [
  {
    id: 'projects',
    value: String(projects.length),
    label: 'Featured projects',
    icon: FolderGit2,
  },
  {
    id: 'experience',
    value: profile.experienceStart.split(' ')[0].slice(0, 3),
    suffix: profile.experienceStart.split(' ')[1],
    label: 'Engineering since',
    icon: Briefcase,
  },
  {
    id: 'education',
    value: education[0].grade.replace('CGPA ', ''),
    label: `CGPA · ${education[0].shortName}`,
    icon: GraduationCap,
  },
  {
    id: 'ai',
    value: String(aiFocusAreas.length),
    label: 'AI focus areas',
    icon: Sparkles,
  },
] as const

export function QuickStats({ className }: { className?: string }) {
  return (
    <motion.div
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      className={cn('grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-1', className)}
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <BentoCard key={stat.id} className="flex flex-col justify-between gap-3 p-4 sm:p-5" reveal={false}>
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <span className="flex items-baseline gap-1 text-3xl leading-none font-semibold tracking-tight text-content sm:text-4xl">
                {stat.value}
                {'suffix' in stat && stat.suffix && (
                  <span className="text-base font-medium text-accent-soft">{stat.suffix}</span>
                )}
              </span>
              <span className="flex items-center gap-2 text-xs text-content-muted">
                <Icon className="h-3.5 w-3.5 shrink-0 text-accent-soft" aria-hidden="true" />
                {stat.label}
              </span>
            </motion.div>
          </BentoCard>
        )
      })}
    </motion.div>
  )
}
