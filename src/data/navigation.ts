/**
 * Navigation model.
 *
 * The home page is a single Bento dashboard containing every section, and the
 * routes below render the same section components standalone. Sidebar links on
 * the home page scroll to the matching `sectionId`; elsewhere they navigate.
 */

export type NavItem = {
  id: string
  label: string
  path: string
  /** id of the element on the home page this entry corresponds to. */
  sectionId: string
  icon:
    | 'home'
    | 'user'
    | 'briefcase'
    | 'folder'
    | 'layers'
    | 'sparkles'
    | 'graduation'
    | 'award'
    | 'pen'
    | 'mail'
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', sectionId: 'home', icon: 'home' },
  { id: 'about', label: 'About', path: '/about', sectionId: 'about', icon: 'user' },
  { id: 'experience', label: 'Experience', path: '/experience', sectionId: 'experience', icon: 'briefcase' },
  { id: 'projects', label: 'Projects', path: '/projects', sectionId: 'projects', icon: 'folder' },
  { id: 'skills', label: 'Stack', path: '/skills', sectionId: 'skills', icon: 'layers' },
  { id: 'ai', label: 'AI Lab', path: '/ai', sectionId: 'ai', icon: 'sparkles' },
  { id: 'education', label: 'Education', path: '/education', sectionId: 'education', icon: 'graduation' },
  { id: 'certifications', label: 'Certifications', path: '/certifications', sectionId: 'certifications', icon: 'award' },
  { id: 'blog', label: 'Blog', path: '/blog', sectionId: 'blog', icon: 'pen' },
  { id: 'contact', label: 'Contact', path: '/contact', sectionId: 'contact', icon: 'mail' },
]

/** Section ids in the order they appear on the home page, for scroll-spy. */
export const homeSectionOrder = navItems.map((item) => item.sectionId)
