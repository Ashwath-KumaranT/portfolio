import { User } from 'lucide-react'
import { profile } from '../../data/profile'
import { BentoCard } from '../ui/BentoCard'
import { SectionHeading } from '../ui/SectionHeading'
import { TechChip } from '../ui/TechChip'
import { cn } from '../../lib/cn'

export function About({ className, headingId = 'about-heading' }: { className?: string; headingId?: string }) {
  return (
    <BentoCard className={cn('flex flex-col gap-5 p-6 sm:p-7', className)} aria-labelledby={headingId}>
      <SectionHeading
        eyebrow="About"
        icon={<User className="h-3.5 w-3.5" aria-hidden="true" />}
        title="Understanding systems end-to-end"
        id={headingId}
      />

      <div className="flex flex-col gap-4">
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-[0.95rem] leading-relaxed text-content-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="flex flex-wrap gap-2">
        {profile.aboutChips.map((chip) => (
          <li key={chip}>
            <TechChip size="sm">{chip}</TechChip>
          </li>
        ))}
      </ul>
    </BentoCard>
  )
}
