import { PageHeader } from '../components/layout/PageHeader'
import { Blog } from '../components/sections/Blog'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function BlogPage() {
  useDocumentTitle(
    'Blog',
    'Planned writing on REST APIs, embeddings and RAG, vector search, MCP architecture, and modern Android development.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes & articles"
        description="Topics queued up as I work through them. None of these are published yet — each links to its planned outline."
      />
      <Blog />
    </>
  )
}
