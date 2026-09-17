import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProject, projects } from '../data/projects'
import { PageHeader } from '../components/layout/PageHeader'
import { ProjectArchitecture } from '../components/architecture/ProjectArchitecture'
import { BentoCard } from '../components/ui/BentoCard'
import { Button } from '../components/ui/Button'
import { PlaceholderTag } from '../components/ui/PlaceholderTag'
import { TechChip } from '../components/ui/TechChip'
import { GithubIcon } from '../components/ui/BrandIcons'
import { fadeUp, revealViewport, stagger } from '../lib/motion'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../lib/cn'

/**
 * Case study.
 *
 * Follows the nine-part template from the spec: problem, solution,
 * architecture, technology, features, engineering decisions, challenges,
 * outcome, and links. Outcome states scope and learning — there are no
 * invented metrics, and the unavailable links are labelled as placeholders
 * rather than dressed up as working demos.
 */
export function ProjectDetails() {
  const { slug } = useParams()
  const project = getProject(slug)

  useDocumentTitle(project?.title, project?.summary)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const { caseStudy } = project
  const otherProjects = projects.filter((entry) => entry.slug !== project.slug)

  return (
    <>
      <PageHeader
        eyebrow={`${project.domain} · ${project.year}`}
        title={project.title}
        description={project.tagline}
        backTo={{ label: 'Projects', to: '/projects' }}
        actions={
          <>
            <Button
              as="a"
              href={project.links.repo.url}
              variant="secondary"
              icon={<GithubIcon className="h-4 w-4" />}
              aria-label={
                project.links.repo.isPlaceholder ? 'Repository (placeholder link)' : `${project.title} repository`
              }
            >
              Repository
            </Button>
            <Button
              as="a"
              href={project.links.demo.url}
              variant="secondary"
              icon={<ExternalLink className="h-4 w-4" />}
              aria-label={project.links.demo.isPlaceholder ? 'Demo (placeholder link)' : `${project.title} demo`}
            >
              Demo
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-4 sm:gap-5">
        <BentoCard className="overflow-hidden" interactive={false} reveal={false}>
          <div className="relative aspect-16/9 max-h-[26rem] w-full overflow-hidden border-b border-line bg-surface-sunken sm:aspect-21/9">
            <img
              src={project.cover}
              alt={project.coverAlt}
              className="h-full w-full object-cover"
              decoding="async"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
              style={{
                background: `linear-gradient(135deg, ${project.accent[0]}33, transparent 55%, ${project.accent[1]}33)`,
              }}
            />
          </div>
          <div className="flex flex-col gap-4 p-6 sm:p-7">
            <p className="text-[0.95rem] leading-relaxed text-content-muted">{project.summary}</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((technology) => (
                <li key={technology}>
                  <TechChip size="sm">{technology}</TechChip>
                </li>
              ))}
            </ul>
            <p className="flex flex-wrap items-center gap-2 border-t border-line pt-4 font-mono text-[0.72rem] text-content-faint">
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.status}</span>
            </p>
          </div>
        </BentoCard>

        <CaseStudySection number="01" title="Problem">
          <Prose paragraphs={caseStudy.problem} />
        </CaseStudySection>

        <CaseStudySection number="02" title="Solution">
          <Prose paragraphs={caseStudy.solution} />
        </CaseStudySection>

        <CaseStudySection number="03" title="Architecture">
          <ProjectArchitecture layers={caseStudy.architecture.layers} note={caseStudy.architecture.note} />
        </CaseStudySection>

        <CaseStudySection number="04" title="Technology">
          <div className="grid gap-3 sm:grid-cols-2">
            {caseStudy.technology.map((group) => (
              <div key={group.group} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface-sunken/70 p-4">
                <h4 className="text-xs font-semibold tracking-wide text-accent-soft uppercase">{group.group}</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechChip size="sm">{item}</TechChip>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection number="05" title="Key features">
          <motion.ul
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            className="grid gap-3 sm:grid-cols-2"
          >
            {caseStudy.features.map((feature) => (
              <motion.li
                key={feature.title}
                variants={fadeUp}
                className="flex flex-col gap-1 rounded-2xl border border-line bg-surface-sunken/70 p-4"
              >
                <h4 className="text-sm font-semibold text-content">{feature.title}</h4>
                <p className="text-[0.82rem] leading-relaxed text-content-muted">{feature.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </CaseStudySection>

        <CaseStudySection number="06" title="Engineering decisions">
          <ul className="flex flex-col gap-3">
            {caseStudy.decisions.map((decision, index) => (
              <li key={decision.title} className="flex gap-3 rounded-2xl border border-line bg-surface-sunken/70 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line-strong bg-accent/12 font-mono text-[0.68rem] text-accent-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-content">{decision.title}</span>
                  <span className="text-[0.82rem] leading-relaxed text-content-muted">{decision.rationale}</span>
                </span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection number="07" title="Challenges">
          <ul className="grid gap-3 sm:grid-cols-2">
            {caseStudy.challenges.map((challenge) => (
              <li key={challenge.title} className="flex flex-col gap-1 rounded-2xl border border-line bg-surface-sunken/70 p-4">
                <h4 className="text-sm font-semibold text-content">{challenge.title}</h4>
                <p className="text-[0.82rem] leading-relaxed text-content-muted">{challenge.description}</p>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection number="08" title="Outcome">
          <div className="flex flex-col gap-4">
            <Prose paragraphs={caseStudy.outcome.body} />
            <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-line bg-chip p-4">
              <p className="label-mono">Not yet available</p>
              <ul className="flex flex-col gap-1.5">
                {caseStudy.outcome.placeholders.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.8rem] text-content-faint">
                    <PlaceholderTag />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection number="09" title="Demo & source">
          <div className="grid gap-3 sm:grid-cols-2">
            <LinkCard
              label="Repository"
              url={project.links.repo.url}
              isPlaceholder={project.links.repo.isPlaceholder}
              icon={<GithubIcon className="h-4 w-4 text-accent-soft" />}
            />
            <LinkCard
              label="Live demo"
              url={project.links.demo.url}
              isPlaceholder={project.links.demo.isPlaceholder}
              icon={<ExternalLink className="h-4 w-4 text-accent-soft" />}
            />
          </div>
        </CaseStudySection>

        <BentoCard className="flex flex-col gap-4 p-6 sm:p-7" interactive={false}>
          <h2 className="text-lg font-semibold tracking-tight text-content">Other projects</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {otherProjects.map((other) => (
              <li key={other.slug}>
                <Button as="link" to={`/projects/${other.slug}`} variant="secondary" className="w-full justify-start">
                  {other.title}
                </Button>
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </>
  )
}

function CaseStudySection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  const headingId = `case-study-${number}`
  return (
    <BentoCard className="flex flex-col gap-5 p-6 sm:p-7" interactive={false} aria-labelledby={headingId}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-accent-soft">{number}</span>
        <h2 id={headingId} className="text-xl font-semibold tracking-tight text-content">
          {title}
        </h2>
      </div>
      {children}
    </BentoCard>
  )
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-[0.95rem] leading-relaxed text-content-muted">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

function LinkCard({
  label,
  url,
  isPlaceholder,
  icon,
}: {
  label: string
  url: string
  isPlaceholder: boolean
  icon: ReactNode
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={isPlaceholder ? `${label} (placeholder link)` : label}
      className={cn(
        'group flex items-center gap-3 rounded-2xl border p-4 transition-colors duration-200',
        isPlaceholder
          ? 'border-dashed border-line bg-chip'
          : 'border-line bg-surface-sunken/70 hover:border-line-strong hover:bg-accent/8',
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-accent/12">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-medium text-content">{label}</span>
        {isPlaceholder ? (
          <PlaceholderTag label="Placeholder URL" className="w-fit" />
        ) : (
          <span className="truncate text-[0.75rem] text-content-faint">{url}</span>
        )}
      </span>
    </a>
  )
}
