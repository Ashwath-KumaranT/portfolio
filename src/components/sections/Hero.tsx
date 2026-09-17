import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { availability, profile } from '../../data/profile'
import { fadeUp, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/StatusBadge'
import { cn } from '../../lib/cn'

/**
 * Hero.
 *
 * The first viewport has to answer "who is this and what do they do" before
 * anything else, so identity, the three titles, the tagline, and the route to
 * the work are all above the fold. No resume button — that is deliberate.
 *
 * `scrollTargetId` is used on the home page, where Projects and Contact are
 * further down the same document; on the standalone /about route the buttons
 * fall back to navigation.
 */
export function Hero({ className, inPage = true }: { className?: string; inPage?: boolean }) {
  const navigate = useNavigate()

  function goTo(sectionId: string, path: string) {
    const target = inPage ? document.getElementById(sectionId) : null
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(path)
    }
  }

  return (
    <BentoCard className={cn('p-6 sm:p-8 lg:p-10', className)} interactive={false} reveal={false}>
      <motion.div
        variants={stagger(0.09, 0.05)}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <StatusBadge label={availability.label} open={availability.open} />
          <span className="inline-flex items-center gap-1.5 text-xs text-content-faint">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location}
          </span>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.h1
            variants={fadeUp}
            className="text-[2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[2.75rem] lg:text-[3.35rem]"
          >
            <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.ul variants={fadeUp} className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {profile.titles.map((title, index) => (
              <li key={title} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-soft/60" />
                )}
                <span className="text-base font-medium text-accent-soft sm:text-lg">{title}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-content-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            onClick={() => goTo('projects', '/projects')}
            iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            Explore My Work
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => goTo('contact', '/contact')}
            icon={<Mail className="h-4 w-4" aria-hidden="true" />}
          >
            Contact Me
          </Button>
        </motion.div>
      </motion.div>
    </BentoCard>
  )
}
