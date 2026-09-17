/**
 * Technical skills, grouped by category.
 *
 * Deliberately no proficiency percentages — evidence comes from the linked
 * projects instead. `projects` holds project slugs from data/projects.ts.
 */

export type SkillGroup = {
  id: string
  category: string
  /** Lucide icon name, resolved in components/sections/Skills.tsx. */
  icon: 'code' | 'smartphone' | 'layout' | 'server' | 'database' | 'sparkles' | 'cloud' | 'git' | 'flask'
  technologies: string[]
  /** Slugs of projects that demonstrate this group. */
  projects: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Languages',
    icon: 'code',
    technologies: ['Java', 'Kotlin', 'Python', 'JavaScript', 'SQL', 'AIML'],
    projects: ['student-manager', 'flight-booking', 'rag-knowledge-system'],
  },
  {
    id: 'android',
    category: 'Android',
    icon: 'smartphone',
    technologies: ['Android', 'Jetpack Compose', 'Coroutines', 'Room', 'MVVM'],
    projects: ['student-manager'],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    icon: 'layout',
    technologies: ['React', 'Tailwind CSS'],
    projects: ['flight-booking'],
  },
  {
    id: 'backend',
    category: 'Backend / APIs',
    icon: 'server',
    technologies: ['Node.js', 'Express', 'FastAPI', 'REST API'],
    projects: ['flight-booking', 'rag-knowledge-system'],
  },
  {
    id: 'databases',
    category: 'Databases',
    icon: 'database',
    technologies: ['MongoDB', 'MySQL', 'SQLite', 'Vector Databases'],
    projects: ['flight-booking', 'student-manager', 'rag-knowledge-system'],
  },
  {
    id: 'ai',
    category: 'AI / ML',
    icon: 'sparkles',
    technologies: ['RAG', 'LLM', 'MCP', 'Embeddings', 'Azure AI Search', 'AIML'],
    projects: ['rag-knowledge-system'],
  },
  {
    id: 'cloud',
    category: 'Cloud',
    icon: 'cloud',
    technologies: ['AWS', 'Azure AI Search'],
    projects: ['rag-knowledge-system'],
  },
  {
    id: 'vcs',
    category: 'Version Control',
    icon: 'git',
    technologies: ['Git', 'GitHub', 'Bitbucket'],
    projects: [],
  },
  {
    id: 'testing',
    category: 'Testing / Automation',
    icon: 'flask',
    technologies: ['Selenium', 'Playwright', 'TestNG'],
    projects: [],
  },
]

/** Compact list used by the hero/marquee-style strips. */
export const highlightedTechnologies = [
  'React',
  'TypeScript',
  'Node.js',
  'Kotlin',
  'Android',
  'Python',
  'MongoDB',
  'RAG',
  'Azure AI Search',
  'MCP',
]
