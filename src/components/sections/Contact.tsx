import { AtSign, Mail, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { socialByIdRecord } from '../../data/site'
import { BentoCard } from '../ui/BentoCard'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { LinkedinIcon } from '../ui/BrandIcons'
import { ContactForm } from './ContactForm'
import { cn } from '../../lib/cn'

/** Contact CTA + form, side by side on wide viewports. */
export function Contact({ className, headingId = 'contact-heading' }: { className?: string; headingId?: string }) {
  const linkedin = socialByIdRecord.linkedin

  return (
    <div className={cn('grid gap-4 sm:gap-5 xl:grid-cols-5', className)}>
      <BentoCard className="flex flex-col gap-6 p-6 sm:p-8 xl:col-span-2" interactive={false}>
        <SectionHeading
          eyebrow="Contact"
          icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />}
          title="Let's build something"
          description="Have a project, a technical idea, or an opportunity? Let's connect."
          id={headingId}
        />

        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-surface-sunken/70 p-4 transition-colors duration-200 hover:border-line-strong hover:bg-accent/8"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-accent/12">
              <AtSign className="h-4 w-4 text-accent-soft" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[0.7rem] tracking-wide text-content-faint uppercase">Email</span>
              <span className="truncate text-sm font-medium text-content">{profile.email}</span>
            </span>
          </a>

          <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface-sunken/70 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-accent/12">
              <MapPin className="h-4 w-4 text-accent-soft" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[0.7rem] tracking-wide text-content-faint uppercase">Based in</span>
              <span className="truncate text-sm font-medium text-content">{profile.location}</span>
            </span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2.5">
          <Button as="a" href={`mailto:${profile.email}`} newTab={false} icon={<Mail className="h-4 w-4" />}>
            Email
          </Button>
          <Button
            as="a"
            href={linkedin.url}
            variant="secondary"
            icon={<LinkedinIcon className="h-4 w-4" />}
            aria-label={linkedin.isPlaceholder ? 'LinkedIn (placeholder link)' : 'LinkedIn profile'}
          >
            LinkedIn
          </Button>
        </div>
      </BentoCard>

      <BentoCard className="flex flex-col gap-5 p-6 sm:p-8 xl:col-span-3" interactive={false}>
        <SectionHeading eyebrow="Contact form" title="Send a message" as="h3" />
        <ContactForm />
      </BentoCard>
    </div>
  )
}
