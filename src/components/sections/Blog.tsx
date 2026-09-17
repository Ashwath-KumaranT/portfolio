import { ArrowUpRight, Clock, PenLine } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'
import { fadeUp, revealViewport, stagger } from '../../lib/motion'
import { BentoCard } from '../ui/BentoCard'
import { SectionHeading } from '../ui/SectionHeading'
import { TechChip } from '../ui/TechChip'
import { cn } from '../../lib/cn'

/**
 * Blog index.
 *
 * Planned posts are labelled "Planned" and carry no publication date, so
 * nothing on the page implies an article already exists. Each still has a real
 * page with its outline, which is honest and also makes the section useful.
 */
export function Blog({
  className,
  headingId = 'blog-heading',
  limit,
}: {
  className?: string
  headingId?: string
  limit?: number
}) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts

  return (
    <BentoCard className={cn('flex flex-col gap-5 p-6 sm:p-7', className)} aria-labelledby={headingId}>
      <SectionHeading
        eyebrow="Blog"
        icon={<PenLine className="h-3.5 w-3.5" aria-hidden="true" />}
        title="Writing"
        description="Topics I plan to write up as I work through them. Nothing here is published yet — each entry links to its planned outline."
        id={headingId}
        actions={
          limit && blogPosts.length > limit ? (
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
            >
              All {blogPosts.length} topics
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : undefined
        }
      />

      <motion.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="flex flex-col gap-3"
      >
        {posts.map((post) => (
          <motion.li key={post.slug} variants={fadeUp}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-line bg-surface-sunken/70 p-4 transition-colors duration-200 hover:border-line-strong hover:bg-accent/8"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-[0.95rem] leading-snug font-semibold text-content">{post.title}</h4>
                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-content-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-soft"
                  aria-hidden="true"
                />
              </div>

              <p className="text-[0.82rem] leading-relaxed text-content-muted">{post.summary}</p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <TechChip size="sm" tone="muted">
                  {post.topic}
                </TechChip>
                {post.status === 'planned' ? (
                  <TechChip size="sm" tone="accent">
                    Planned
                  </TechChip>
                ) : (
                  <TechChip size="sm">{post.publishedOn}</TechChip>
                )}
                <span className="flex items-center gap-1 text-[0.7rem] text-content-faint">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {post.readingTime}
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </BentoCard>
  )
}
