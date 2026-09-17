/**
 * AI Lab — current learning focus.
 *
 * Claims here are deliberately exploratory. Nothing in this file should be
 * read as production or client experience. New AI work can be added by
 * appending to `aiFocusAreas` or `ragPipeline` without touching the layout.
 */

export type PipelineStage = {
  id: string
  label: string
  /** One-line role of the stage in the pipeline. */
  role: string
  /** Shown when the node is expanded/selected. */
  detail: string
  /** Offline indexing vs. per-request work — drives the diagram grouping. */
  phase: 'ingest' | 'query' | 'generate'
}

export const ragPipeline: PipelineStage[] = [
  {
    id: 'documents',
    label: 'Documents',
    role: 'The source material',
    detail:
      'Files, pages, or records that hold the knowledge the model does not have. They are parsed into plain text before anything else happens.',
    phase: 'ingest',
  },
  {
    id: 'chunking',
    label: 'Chunking',
    role: 'Split into retrievable passages',
    detail:
      'Documents are split into overlapping passages small enough to embed meaningfully and to fit in a prompt. Chunk size is a trade-off: too small loses context, too large dilutes the embedding.',
    phase: 'ingest',
  },
  {
    id: 'embeddings',
    label: 'Embeddings',
    role: 'Text as vectors',
    detail:
      'Each chunk is encoded by an embedding model into a dense vector, positioned so that passages with similar meaning land near each other in that space.',
    phase: 'ingest',
  },
  {
    id: 'vector-search',
    label: 'Vector Search',
    role: 'Nearest-neighbour lookup',
    detail:
      'The question is embedded with the same model, then compared against the indexed vectors — typically by cosine similarity — to find the closest passages. Azure AI Search is one managed option for this stage.',
    phase: 'query',
  },
  {
    id: 'retriever',
    label: 'Retriever',
    role: 'Select the top passages',
    detail:
      'The top-k matches are collected, optionally re-ranked and deduplicated. Retrieval quality sets the ceiling on answer quality — a passage that is not retrieved cannot be used.',
    phase: 'query',
  },
  {
    id: 'context',
    label: 'Context',
    role: 'Assemble the prompt',
    detail:
      'Retrieved passages are packed into the prompt alongside the question and their citations, within the context window budget.',
    phase: 'query',
  },
  {
    id: 'llm',
    label: 'LLM',
    role: 'Generate from the context',
    detail:
      'The model answers using the supplied passages rather than its own recall, and is instructed to say so when the context does not contain an answer.',
    phase: 'generate',
  },
  {
    id: 'response',
    label: 'Response',
    role: 'Grounded answer + sources',
    detail:
      'The answer is returned with the passages it came from, so a reader can check it instead of trusting it.',
    phase: 'generate',
  },
]

export type FocusArea = {
  id: string
  title: string
  /** Lucide icon name, mapped in the AiLab section. */
  icon: 'search' | 'brain' | 'boxes' | 'database' | 'cloud' | 'plug'
  short: string
  detail: string
}

export const aiFocusAreas: FocusArea[] = [
  {
    id: 'rag',
    title: 'RAG',
    icon: 'search',
    short: 'Retrieval-augmented generation',
    detail:
      'Grounding a model in a specific document set at query time instead of trying to train the knowledge into it. Studying how chunking, retrieval depth, and prompt assembly change what the model can actually answer.',
  },
  {
    id: 'llm',
    title: 'LLM Applications',
    icon: 'brain',
    short: 'Building on language models',
    detail:
      'Treating the model as one component in a system: prompt structure, context budgets, tool calls, and handling the cases where the model should decline rather than guess.',
  },
  {
    id: 'embeddings',
    title: 'Embeddings',
    icon: 'boxes',
    short: 'Meaning as geometry',
    detail:
      'How text becomes a dense vector, why similar meaning maps to nearby points, and what that representation does and does not preserve.',
  },
  {
    id: 'vector-db',
    title: 'Vector Databases',
    icon: 'database',
    short: 'Indexing and searching vectors',
    detail:
      'Storage and approximate nearest-neighbour search over embeddings — index structures, recall versus latency, and keeping an index in step with changing source documents.',
  },
  {
    id: 'azure-ai-search',
    title: 'Azure AI Search',
    icon: 'cloud',
    short: 'Managed retrieval on Azure',
    detail:
      'Using a managed search service for the retrieval layer, including hybrid keyword-plus-vector search and semantic ranking, rather than operating an index directly.',
  },
  {
    id: 'mcp',
    title: 'MCP',
    icon: 'plug',
    short: 'Model Context Protocol',
    detail:
      'A standard interface between a model client and external tools, resources, and data — so an integration is written once against the protocol instead of once per application.',
  },
]

export const aiLabDisclaimer =
  'This section reflects current self-directed learning and exploration. It is not a claim of production or client experience.'
