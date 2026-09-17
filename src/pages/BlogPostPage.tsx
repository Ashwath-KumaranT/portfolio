import { Navigate, useParams } from 'react-router-dom'
import { Clock, ListTree } from 'lucide-react'
import { blogPosts, getBlogPost } from '../data/blog'
import { PageHeader } from '../components/layout/PageHeader'
import { BentoCard } from '../components/ui/BentoCard'
import { Button } from '../components/ui/Button'
import { TechChip } from '../components/ui/TechChip'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/**
 * Blog post.
 *
 * A planned post shows its outline and says plainly that it is not written
 * yet, rather than rendering an empty article shell. Once `status` flips to
 * 'published' the same page renders `body` instead.
 */
export function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogPost(slug)

  useDocumentTitle(post?.title, post?.summary)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const isPlanned = post.status === 'planned'
  const others = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow={post.topic}
        title={post.title}
        description={post.summary}
        backTo={{ label: 'Blog', to: '/blog' }}
      />

      <div className="flex flex-col gap-4 sm:gap-5">
        <BentoCard className="flex flex-wrap items-center gap-2.5 p-4 sm:p-5" interactive={false}>
          {isPlanned ? (
            <TechChip tone="accent">Planned — not published yet</TechChip>
          ) : (
            <TechChip tone="accent">Published {post.publishedOn}</TechChip>
          )}
          <TechChip tone="muted">{post.topic}</TechChip>
          <span className="flex items-center gap-1.5 text-[0.75rem] text-content-faint">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Estimated {post.readingTime} read
          </span>
        </BentoCard>

        {isPlanned ? (
          <BentoCard className="flex flex-col gap-5 p-6 sm:p-7" interactive={false} aria-labelledby="outline-heading">
            <div className="flex items-center gap-2.5">
              <ListTree className="h-4 w-4 text-accent-soft" aria-hidden="true" />
              <h2 id="outline-heading" className="text-lg font-semibold tracking-tight text-content">
                Planned outline
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-content-muted">
              This article hasn't been written yet. Here is the structure it will follow.
            </p>

            <ol className="flex flex-col gap-2.5">
              {post.outline.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-line bg-surface-sunken/70 px-3.5 py-3"
                >
                  <span className="font-mono text-[0.7rem] text-accent-soft">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[0.88rem] leading-relaxed text-content-muted">{item}</span>
                </li>
              ))}
            </ol>
          </BentoCard>
        ) : (
          <BentoCard className="flex flex-col gap-4 p-6 sm:p-7" interactive={false}>
            {post.body?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-[0.95rem] leading-relaxed text-content-muted">
                {paragraph}
              </p>
            ))}
          </BentoCard>
        )}

        <BentoCard className="flex flex-col gap-4 p-6 sm:p-7" interactive={false}>
          <h2 className="text-lg font-semibold tracking-tight text-content">More topics</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Button as="link" to={`/blog/${other.slug}`} variant="secondary" className="h-full w-full justify-start text-left">
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
