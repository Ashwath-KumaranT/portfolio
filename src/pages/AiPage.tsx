import { PageHeader } from '../components/layout/PageHeader'
import { AiLab } from '../components/sections/AiLab'
import { ProjectCard } from '../components/sections/ProjectCard'
import { RevealGroup } from '../components/ui/Reveal'
import { projectsBySlug } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function AiPage() {
  const ragProject = projectsBySlug['rag-knowledge-system']

  useDocumentTitle(
    'AI & current learning',
    'Current learning focus: RAG, LLM applications, embeddings, vector search, Azure AI Search, and MCP.',
  )

  return (
    <>
      <PageHeader
        eyebrow="AI & current learning"
        title="AI Lab"
        description="Self-directed work on retrieval-augmented generation and the systems around it. Exploratory — not a claim of production experience."
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        <AiLab />
        {ragProject && (
          <RevealGroup className="grid gap-4 sm:gap-5 xl:grid-cols-2">
            <ProjectCard project={ragProject} />
          </RevealGroup>
        )}
      </div>
    </>
  )
}
