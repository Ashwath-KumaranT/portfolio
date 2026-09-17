/**
 * Professional experience and education.
 *
 * Confidentiality rule: no client names, internal URLs, proprietary code,
 * credentials, confidential architecture, or non-public screenshots. Anything
 * not independently verifiable stays an explicit placeholder rather than an
 * invented responsibility.
 */

export type ExperienceEntry = {
  id: string
  company: string
  role: string
  start: string
  end: string
  location: string
  /** Verified, non-confidential summary. Keep it high level. */
  summary: string
  /** Replace each placeholder with a real, cleared responsibility. */
  responsibilityPlaceholders: string[]
  /** Only technologies that are safe to disclose. */
  technologies: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'accenture',
    company: 'Accenture',
    role: 'Packaged Application Development Associate',
    start: 'November 2024',
    end: 'Present',
    location: 'Bengaluru, India',
    summary:
      'Working in packaged application development within a delivery team. Details of client engagements are confidential and are intentionally not described here.',
    // PLACEHOLDERS — replace with verified, non-confidential responsibilities.
    responsibilityPlaceholders: [
      'Responsibility placeholder — add a verified, non-confidential description.',
      'Responsibility placeholder — add a verified, non-confidential description.',
      'Responsibility placeholder — add a verified, non-confidential description.',
    ],
    technologies: [],
  },
]

export type EducationEntry = {
  id: string
  institution: string
  shortName: string
  degree: string
  field: string
  start: string
  end: string
  grade: string
  location: string
}

export const education: EducationEntry[] = [
  {
    id: 'kpriet',
    institution: 'KPR Institute of Engineering and Technology',
    shortName: 'KPRIET',
    degree: 'B.E.',
    field: 'Electronics and Communication Engineering',
    start: '2020',
    end: '2024',
    grade: 'CGPA 8.6',
    location: 'Coimbatore, India',
  },
]

/** "How I work" — engineering approach, not achievements. */
export type ProcessStep = {
  id: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'understand',
    title: 'Understand the system',
    description: 'Read the whole path before changing part of it — data in, data out, and what owns the state.',
  },
  {
    id: 'model',
    title: 'Model the data first',
    description: 'Most UI complexity is a data shape that was decided too late.',
  },
  {
    id: 'build',
    title: 'Build in thin slices',
    description: 'One working path end-to-end beats four half-finished layers.',
  },
  {
    id: 'verify',
    title: 'Verify deliberately',
    description: 'Check the failure cases, the empty state, and the small screen — not just the happy path.',
  },
]
