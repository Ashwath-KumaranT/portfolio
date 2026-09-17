import avatarPlaceholder from '../assets/avatar-placeholder.svg'

/**
 * Single source of truth for personal details.
 *
 * Everything the UI renders about Ashwath comes from here — no component
 * hard-codes a name, title, email, or link.
 */

export type Availability = {
  /** Drives the badge dot colour and the accompanying text label. */
  open: boolean
  label: string
}

export type Profile = {
  name: string
  shortName: string
  initials: string
  titles: string[]
  tagline: string
  positioning: string
  location: string
  company: string
  role: string
  /** ISO-ish display string; also used to compute years of experience. */
  experienceStart: string
  experienceStartISO: string
  email: string
  /** Replace this single import to swap in a real photo. */
  avatar: string
  avatarAlt: string
  about: string[]
  aboutChips: string[]
}

export const profile: Profile = {
  name: 'Ashwath Kumaran Thirumoorthy',
  shortName: 'Ashwath Kumaran',
  initials: 'AK',
  titles: ['Software Engineer', 'AI Engineer', 'Android Developer'],
  tagline: 'Building reliable software. Exploring intelligent systems.',
  positioning:
    'Software engineer working across application development, Android, backend, cloud, and AI engineering, with a current learning focus on RAG, LLM applications, embeddings, vector search, Azure AI Search, and MCP.',
  location: 'Bengaluru, India',
  company: 'Accenture',
  role: 'Packaged Application Development Associate',
  experienceStart: 'November 2024',
  experienceStartISO: '2024-11-01',
  email: 'ashwathkumaran21@gmail.com',

  // DUMMY ASSET — replace src/assets/avatar-placeholder.svg (or point this at a
  // real image file) to update the avatar everywhere on the site.
  avatar: avatarPlaceholder,
  avatarAlt: 'Placeholder avatar for Ashwath Kumaran Thirumoorthy',

  about: [
    "I'm Ashwath Kumaran Thirumoorthy, a software engineer based in Bengaluru, India. My interests span application engineering, Android development, backend systems, and AI engineering.",
    "I enjoy understanding systems end-to-end and turning technical concepts into working applications. I'm currently expanding my focus toward RAG, LLM applications, embeddings, vector search, Azure AI Search, and MCP while continuing to strengthen my software engineering fundamentals.",
  ],
  aboutChips: [
    'Bengaluru, India',
    'Software Engineer',
    'AI Engineering',
    'Android',
    'KPRIET',
    'ECE',
    '2024',
  ],
}

export const availability: Availability = {
  open: true,
  label: 'Available for professional opportunities / collaboration',
}

/** Compact version of the availability label, for the sidebar badge. */
export const availabilityShort = 'Available for opportunities'
