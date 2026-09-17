import flightBookingCover from '../assets/projects/flight-booking.svg'
import studentManagerCover from '../assets/projects/student-manager.svg'
import ragSystemCover from '../assets/projects/rag-knowledge-system.svg'

/**
 * Featured projects and their case studies.
 *
 * Ground rules baked into this data:
 *  - No invented metrics, user counts, revenue, or client outcomes.
 *  - `outcome` describes scope and what was learned, and marks anything not yet
 *    verified as a placeholder.
 *  - Demo/repo URLs are dummy placeholders until the real ones are available.
 */

export type ProjectLink = {
  url: string
  isPlaceholder: boolean
}

/** A single stage in a project's architecture diagram. */
export type ArchitectureNode = {
  id: string
  label: string
  detail: string
}

export type ArchitectureLayer = {
  id: string
  title: string
  nodes: ArchitectureNode[]
}

export type Project = {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  summary: string
  /** Short honest framing — nothing here claims production status. */
  status: string
  year: string
  domain: string
  stack: string[]
  cover: string
  coverAlt: string
  /** Two-stop gradient used for the card glow and detail-page header. */
  accent: [string, string]
  links: {
    demo: ProjectLink
    repo: ProjectLink
  }
  caseStudy: {
    problem: string[]
    solution: string[]
    architecture: {
      layers: ArchitectureLayer[]
      note: string
    }
    technology: { group: string; items: string[] }[]
    features: { title: string; description: string }[]
    decisions: { title: string; rationale: string }[]
    challenges: { title: string; description: string }[]
    outcome: {
      body: string[]
      /** Rendered as an explicit "to be filled in" block. */
      placeholders: string[]
    }
  }
}

// DUMMY LINKS — all three projects point at placeholder URLs. Replace the `url`
// values and set isPlaceholder: false once the real repos/demos exist.
const placeholderRepo = (slug: string): ProjectLink => ({
  url: `https://github.com/Ashwath-KumaranT/${slug}`,
  isPlaceholder: true,
})

const placeholderDemo: ProjectLink = {
  url: 'https://example.com/demo-placeholder',
  isPlaceholder: true,
}

export const projects: Project[] = [
  {
    slug: 'flight-booking',
    title: 'Flight Booking & Reservation System',
    shortTitle: 'Flight Booking',
    tagline: 'Search, select, and reserve flights through a full-stack web application.',
    summary:
      'A full-stack booking flow covering flight search, seat and fare selection, passenger details, and reservation management, backed by a REST API and a document database.',
    status: 'Personal full-stack project',
    year: '2024',
    domain: 'Web · Full stack',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    cover: flightBookingCover,
    coverAlt:
      'Placeholder illustration of the flight booking interface: a search panel, flight result rows, and a seat selection grid',
    accent: ['#8b5cf6', '#5b6cff'],
    links: {
      demo: placeholderDemo,
      repo: placeholderRepo('flight-booking'),
    },
    caseStudy: {
      problem: [
        'Booking a flight is a multi-step transaction — search, compare, select, enter passenger details, confirm — and every step depends on state carried from the previous one.',
        'The engineering problem is keeping that state coherent across a multi-screen flow while the backend stays the authority on availability, so two people cannot reserve the same seat.',
      ],
      solution: [
        'A React front end drives the booking flow as a series of steps with a single shared reservation state, and a Node.js/Express API owns validation, availability, and persistence.',
        'Flights, fares, and reservations are modelled as separate MongoDB collections so a reservation references a flight rather than duplicating it, and availability can be recomputed from reservations rather than tracked as a drifting counter.',
      ],
      architecture: {
        layers: [
          {
            id: 'client',
            title: 'Client',
            nodes: [
              { id: 'ui', label: 'React UI', detail: 'Search, results, seat map, passenger form, confirmation' },
              { id: 'state', label: 'Booking state', detail: 'Step-scoped reservation draft held in React state' },
            ],
          },
          {
            id: 'api',
            title: 'API',
            nodes: [
              { id: 'rest', label: 'Express REST API', detail: 'Route handlers for flights, fares, and reservations' },
              { id: 'validation', label: 'Validation layer', detail: 'Request validation and availability checks before write' },
            ],
          },
          {
            id: 'data',
            title: 'Data',
            nodes: [
              { id: 'flights', label: 'Flights', detail: 'Routes, schedules, aircraft/seat configuration' },
              { id: 'reservations', label: 'Reservations', detail: 'Passenger details, selected seats, booking reference' },
            ],
          },
        ],
        note: 'The client never writes directly to the database — every state change goes through the API so availability is checked server-side.',
      },
      technology: [
        { group: 'Frontend', items: ['React', 'Tailwind CSS', 'React Router'] },
        { group: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
        { group: 'Database', items: ['MongoDB'] },
        { group: 'Tooling', items: ['Git', 'Postman'] },
      ],
      features: [
        { title: 'Flight search', description: 'Filter available flights by origin, destination, and travel date.' },
        { title: 'Fare and seat selection', description: 'Choose a fare class and pick a seat from the cabin layout.' },
        { title: 'Passenger details', description: 'Collect and validate passenger information before confirmation.' },
        { title: 'Reservation record', description: 'Persist a booking with a reference that can be looked up later.' },
        { title: 'Booking management', description: 'Review an existing reservation and cancel it.' },
        { title: 'Responsive interface', description: 'The booking flow is usable at mobile widths, not just desktop.' },
      ],
      decisions: [
        {
          title: 'Server-authoritative availability',
          rationale:
            'Seat availability is validated on the API at write time rather than trusted from the client, so a stale browser tab cannot create a double booking.',
        },
        {
          title: 'Reservations reference flights',
          rationale:
            'Storing a flight reference instead of a copy of the flight keeps schedule edits from silently diverging across historic bookings.',
        },
        {
          title: 'A single reservation draft',
          rationale:
            'Holding one draft object through the flow — instead of per-screen state — meant "go back and change the date" had one obvious place to invalidate.',
        },
        {
          title: 'Utility-first styling',
          rationale:
            'Tailwind kept the multi-step layout consistent without accumulating a parallel CSS file per screen.',
        },
      ],
      challenges: [
        {
          title: 'State across a multi-step flow',
          description:
            'Backward navigation can invalidate later steps. Resolving what to keep versus discard when an earlier choice changes took more thought than the forward path.',
        },
        {
          title: 'Modelling seats',
          description:
            'Seat layout differs per aircraft configuration, so the seat map had to be rendered from data rather than hard-coded per route.',
        },
        {
          title: 'Consistent error handling',
          description:
            'Making API failures surface as useful in-flow messages, rather than a dead end, required a shared error shape across endpoints.',
        },
      ],
      outcome: {
        body: [
          'A working end-to-end booking flow from search through confirmation, with the API as the single source of truth for availability.',
          'The main takeaway was how much of a "simple CRUD" feature is actually transaction design once two users can contend for the same resource.',
        ],
        placeholders: [
          'Live demo URL — placeholder',
          'Repository URL — placeholder',
          'Screenshots of the booking flow — to be added',
        ],
      },
    },
  },
  {
    slug: 'student-manager',
    title: 'Student Manager Android App',
    shortTitle: 'Student Manager',
    tagline: 'An offline-first Android app for managing student records on-device.',
    summary:
      'A native Android application for creating, editing, and browsing student records, built on MVVM with Room for local persistence and a RecyclerView-driven list.',
    status: 'Personal Android project',
    year: '2024',
    domain: 'Android · Native',
    stack: ['Android', 'Java/Kotlin', 'Room', 'RecyclerView', 'MVVM', 'SQLite'],
    cover: studentManagerCover,
    coverAlt:
      'Placeholder illustration of the Student Manager app: a phone frame showing a list of student record rows and an add button',
    accent: ['#22c55e', '#5b6cff'],
    links: {
      demo: placeholderDemo,
      repo: placeholderRepo('student-manager'),
    },
    caseStudy: {
      problem: [
        'Student records need to be readable and editable without a network connection, which rules out a design where the UI waits on a server for every read.',
        'The Android-specific problem is that Activities are destroyed and recreated on rotation and under memory pressure, so data held in the view layer is not safe to rely on.',
      ],
      solution: [
        'The app follows MVVM: a Room database owns the data, a repository exposes it, and a ViewModel survives configuration changes and publishes observable state to the UI.',
        'The list observes the database rather than being pushed into, so a write anywhere in the app re-renders the list without a manual refresh path.',
      ],
      architecture: {
        layers: [
          {
            id: 'ui',
            title: 'UI layer',
            nodes: [
              { id: 'activity', label: 'Activity / Fragment', detail: 'Hosts the list and the add/edit form' },
              { id: 'adapter', label: 'RecyclerView adapter', detail: 'Diff-based list rendering for student rows' },
            ],
          },
          {
            id: 'state',
            title: 'State layer',
            nodes: [
              { id: 'viewmodel', label: 'ViewModel', detail: 'Survives rotation; exposes observable student state' },
              { id: 'repo', label: 'Repository', detail: 'Single entry point for reads and writes' },
            ],
          },
          {
            id: 'data',
            title: 'Data layer',
            nodes: [
              { id: 'dao', label: 'Room DAO', detail: 'Typed queries compiled and checked at build time' },
              { id: 'db', label: 'SQLite database', detail: 'On-device persistence — works fully offline' },
            ],
          },
        ],
        note: 'Data flows one way: the UI observes the ViewModel, the ViewModel observes the repository, and only the repository touches Room.',
      },
      technology: [
        { group: 'Language', items: ['Kotlin', 'Java'] },
        { group: 'Architecture', items: ['MVVM', 'ViewModel', 'Repository pattern'] },
        { group: 'Persistence', items: ['Room', 'SQLite'] },
        { group: 'UI', items: ['RecyclerView', 'Material components', 'Jetpack Compose (exploration)'] },
      ],
      features: [
        { title: 'Create records', description: 'Add a student with validated input fields.' },
        { title: 'Browse records', description: 'Scrollable list rendered through a RecyclerView adapter.' },
        { title: 'Edit and delete', description: 'Update or remove an existing record with the list staying in sync.' },
        { title: 'Offline persistence', description: 'All data lives in an on-device Room database — no network required.' },
        { title: 'Rotation-safe state', description: 'In-progress state survives configuration changes via the ViewModel.' },
        { title: 'Empty and error states', description: 'The list communicates "nothing here yet" rather than rendering blank.' },
      ],
      decisions: [
        {
          title: 'Room over raw SQLite',
          rationale:
            'Compile-time query verification catches a mistyped column at build time instead of as a runtime crash on a user device.',
        },
        {
          title: 'MVVM rather than logic in the Activity',
          rationale:
            'Android destroys and recreates Activities routinely; keeping state in a ViewModel makes rotation a non-event instead of a bug class.',
        },
        {
          title: 'Observable list, not manual refresh',
          rationale:
            'Having the list observe the database removed a whole category of "the UI is stale after an edit" bugs.',
        },
        {
          title: 'Diff-based adapter updates',
          rationale:
            'Updating changed rows only, instead of invalidating the whole list, keeps scrolling smooth as the record count grows.',
        },
      ],
      challenges: [
        {
          title: 'Lifecycle correctness',
          description:
            'Getting observers scoped to the right lifecycle owner — so they stop when the view is gone — was the difference between a clean app and a leak.',
        },
        {
          title: 'Keeping database work off the main thread',
          description:
            'Room refuses main-thread queries by default, which forced the read/write paths onto coroutines early rather than as a later fix.',
        },
        {
          title: 'Schema changes',
          description:
            'Changing the entity after data existed meant learning Room migrations rather than reinstalling to clear state.',
        },
      ],
      outcome: {
        body: [
          'A working offline-first Android CRUD application with a clear separation between UI, state, and data layers.',
          'The lasting value was the architecture: once the one-way data flow was in place, adding a field or a screen stopped being risky.',
        ],
        placeholders: [
          'APK / Play Store link — placeholder',
          'Repository URL — placeholder',
          'Device screenshots — to be added',
        ],
      },
    },
  },
  {
    slug: 'rag-knowledge-system',
    title: 'RAG / AI Knowledge System',
    shortTitle: 'RAG Knowledge System',
    tagline: 'A retrieval-augmented question answering pipeline over a private document set.',
    summary:
      'A learning project exploring the full RAG pipeline: document ingestion, chunking, embeddings, vector search, retrieval, context assembly, and grounded LLM responses — plus MCP as a way to expose tools and data to a model.',
    status: 'Learning / exploration project — not production',
    year: '2025',
    domain: 'AI engineering · Retrieval',
    stack: ['RAG', 'LLM', 'Embeddings', 'Vector Database', 'Azure AI Search', 'MCP', 'Python', 'FastAPI'],
    cover: ragSystemCover,
    coverAlt:
      'Placeholder illustration of the RAG pipeline: documents flowing through chunking and embeddings into a vector index, then into a language model',
    accent: ['#c026d3', '#5b6cff'],
    links: {
      demo: placeholderDemo,
      repo: placeholderRepo('rag-knowledge-system'),
    },
    caseStudy: {
      problem: [
        'A language model cannot answer questions about documents it has never seen, and fine-tuning for every document set is impractical.',
        'Asking it anyway produces fluent answers that are not grounded in anything — the failure is confident and hard to spot, which is exactly what makes it dangerous.',
      ],
      solution: [
        'Retrieval-augmented generation: index the documents as embeddings, retrieve the passages most relevant to the question at query time, and give the model that context along with the question.',
        'The model is asked to answer from the supplied context and to say when the context does not contain an answer, so an unanswerable question fails visibly rather than silently.',
        'MCP is explored as the layer above this — a standard way to expose retrieval and other tools to a model client, instead of hard-wiring each integration.',
      ],
      architecture: {
        layers: [
          {
            id: 'ingest',
            title: 'Ingestion (offline)',
            nodes: [
              { id: 'docs', label: 'Documents', detail: 'Source files loaded and parsed into plain text' },
              { id: 'chunk', label: 'Chunking', detail: 'Split into overlapping passages sized for the context window' },
              { id: 'embed', label: 'Embeddings', detail: 'Each chunk encoded as a dense vector' },
              { id: 'index', label: 'Vector index', detail: 'Vectors stored in a vector database / Azure AI Search' },
            ],
          },
          {
            id: 'query',
            title: 'Query (online)',
            nodes: [
              { id: 'question', label: 'Question', detail: 'User query, embedded with the same model as the chunks' },
              { id: 'search', label: 'Vector search', detail: 'Nearest-neighbour lookup over the indexed chunks' },
              { id: 'retrieve', label: 'Retriever', detail: 'Top-k passages, optionally re-ranked and deduplicated' },
              { id: 'context', label: 'Context assembly', detail: 'Passages plus citations packed into the prompt' },
            ],
          },
          {
            id: 'answer',
            title: 'Generation',
            nodes: [
              { id: 'llm', label: 'LLM', detail: 'Answers from the supplied context, not from memory' },
              { id: 'response', label: 'Grounded response', detail: 'Answer returned with the sources it came from' },
            ],
          },
        ],
        note: 'Ingestion runs offline and only re-runs when documents change; the query path is what a request actually touches.',
      },
      technology: [
        { group: 'Retrieval', items: ['Embeddings', 'Vector databases', 'Azure AI Search', 'Semantic search'] },
        { group: 'Generation', items: ['LLM', 'Prompt/context assembly', 'Grounded answering'] },
        { group: 'Protocol', items: ['MCP (Model Context Protocol)'] },
        { group: 'Services', items: ['Python', 'FastAPI', 'REST API'] },
      ],
      features: [
        { title: 'Document ingestion', description: 'Load source documents and normalise them into plain text.' },
        { title: 'Chunking strategy', description: 'Overlapping passages so an answer is not split across a boundary.' },
        { title: 'Embedding generation', description: 'Encode chunks and queries with the same embedding model.' },
        { title: 'Vector search', description: 'Nearest-neighbour retrieval over the indexed chunk vectors.' },
        { title: 'Grounded answering', description: 'The model answers from retrieved context and cites its sources.' },
        { title: 'MCP exploration', description: 'Exposing retrieval as a tool a model client can call through MCP.' },
      ],
      decisions: [
        {
          title: 'Overlapping chunks',
          rationale:
            'Hard splits cut sentences — and sometimes the answer — in half. Overlap costs index size and buys recall.',
        },
        {
          title: 'One embedding model for both sides',
          rationale:
            'Queries and chunks have to share a vector space; using different models makes similarity scores meaningless.',
        },
        {
          title: 'Citations returned with the answer',
          rationale:
            'Without the source passages there is no way to tell a grounded answer from a fluent guess.',
        },
        {
          title: 'Explicit "not in the context" path',
          rationale:
            'The model is instructed to decline when retrieval comes back empty, so a missing document reads as a gap rather than an invention.',
        },
        {
          title: 'Ingestion separated from query',
          rationale:
            'Keeping the expensive, rarely-changing work offline keeps the request path to embed → search → generate.',
        },
      ],
      challenges: [
        {
          title: 'Chunk size is a trade-off, not a setting',
          description:
            'Small chunks retrieve precisely but lose surrounding context; large chunks carry context but dilute the embedding. It needed tuning against real questions.',
        },
        {
          title: 'Retrieval quality dominates answer quality',
          description:
            'When the answer was wrong, the prompt was almost never the cause — the right passage simply had not been retrieved.',
        },
        {
          title: 'Evaluating a system with no single correct output',
          description:
            'Unlike CRUD, there is no assertion that passes or fails. Building even a rough judgment of "is this grounded?" was its own problem.',
        },
        {
          title: 'Keeping the index in step with the documents',
          description:
            'A stale index answers confidently from deleted content, so re-indexing has to be part of the design rather than a manual step.',
        },
      ],
      outcome: {
        body: [
          'A working understanding of the RAG pipeline end-to-end — where the quality actually comes from, and which parts are tuning rather than code.',
          'This is an exploratory learning project. It is not deployed, and no production or evaluation results are claimed for it.',
        ],
        placeholders: [
          'Demo / notebook link — placeholder',
          'Repository URL — placeholder',
          'Retrieval evaluation results — not yet measured',
        ],
      },
    },
  },
]

export const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, Project>

export function getProject(slug: string | undefined): Project | undefined {
  return slug ? projectsBySlug[slug] : undefined
}
