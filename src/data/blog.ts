/**
 * Blog.
 *
 * EVERY POST BELOW IS PLANNED, NOT PUBLISHED. The UI labels them as such and
 * never shows a publication date for a planned post.
 *
 * To publish one: set `status: 'published'`, add `publishedOn` (ISO date), and
 * fill `body` with the article paragraphs. `outline` is only rendered while a
 * post is still planned.
 */

export type BlogStatus = 'planned' | 'published'

export type BlogPost = {
  slug: string
  title: string
  summary: string
  topic: string
  readingTime: string
  status: BlogStatus
  /** Only set once status is 'published'. */
  publishedOn?: string
  /** Planned structure, shown while the post is unwritten. */
  outline: string[]
  /** Article paragraphs, used once published. */
  body?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-rest-apis',
    title: 'Understanding REST APIs from Request to Response',
    summary:
      'Following a single HTTP request all the way through — routing, validation, handler, data access, and the response that comes back.',
    topic: 'Backend',
    readingTime: '8 min',
    status: 'planned',
    outline: [
      'What actually travels over the wire in an HTTP request',
      'Routing: how a URL becomes a handler',
      'Validation at the boundary, and why it belongs there',
      'The data layer and where transactions fit',
      'Status codes that mean something to the caller',
      'Error shapes: making failures as usable as successes',
    ],
  },
  {
    slug: 'embeddings-to-vectors',
    title: 'How Embeddings Become Vectors in a RAG System',
    summary:
      'From raw text to a point in high-dimensional space, and why "similar meaning, nearby vector" is the property the whole pipeline rests on.',
    topic: 'AI engineering',
    readingTime: '10 min',
    status: 'planned',
    outline: [
      'Tokens, then vectors: what an embedding model produces',
      'Why cosine similarity is the usual distance measure',
      'Chunking, and how it changes what a vector represents',
      'Using the same model for queries and documents',
      'What embeddings do not capture',
    ],
  },
  {
    slug: 'rag-vs-vector-search',
    title: 'RAG vs Vector Search',
    summary:
      'Vector search is one stage of RAG, not a synonym for it. Where the two are confused, and what the extra stages actually contribute.',
    topic: 'AI engineering',
    readingTime: '7 min',
    status: 'planned',
    outline: [
      'Vector search: retrieval and nothing else',
      'RAG: retrieval, context assembly, and grounded generation',
      'When plain vector search is the right answer',
      'Where re-ranking and citations come in',
      'Failure modes that belong to each',
    ],
  },
  {
    slug: 'exploring-mcp-architecture',
    title: 'Exploring MCP Architecture',
    summary:
      'The Model Context Protocol as a standard interface between model clients and the tools, resources, and data they need.',
    topic: 'AI engineering',
    readingTime: '9 min',
    status: 'planned',
    outline: [
      'The integration problem MCP is answering',
      'Hosts, clients, and servers',
      'Tools, resources, and prompts as primitives',
      'Transport and capability negotiation',
      'Where MCP fits alongside a RAG pipeline',
    ],
  },
  {
    slug: 'android-kotlin-coroutines-compose',
    title: 'Android Development with Kotlin, Coroutines and Compose',
    summary:
      'Moving from imperative views to declarative UI, and how structured concurrency changes the way background work is written.',
    topic: 'Android',
    readingTime: '11 min',
    status: 'planned',
    outline: [
      'Declarative UI: state in, interface out',
      'Recomposition and what triggers it',
      'Coroutines and structured concurrency',
      'Scoping work to a lifecycle',
      'Interoperating with an existing View-based codebase',
    ],
  },
]

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>

export function getBlogPost(slug: string | undefined): BlogPost | undefined {
  return slug ? blogPostsBySlug[slug] : undefined
}
