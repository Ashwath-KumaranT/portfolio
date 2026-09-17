/**
 * Site-level configuration: social links, contact-form provider, and the
 * placeholder registry.
 *
 * Every value flagged `isPlaceholder` is dummy data. Replace the URL and flip
 * the flag to false — the UI stops marking it as a placeholder automatically.
 */

export type SocialId = 'github' | 'linkedin' | 'instagram' | 'medium'

export type SocialLink = {
  id: SocialId
  label: string
  url: string
  isPlaceholder: boolean
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/Ashwath-KumaranT',
    isPlaceholder: false,
  },
  // DUMMY URLS — replace with the real profiles, then set isPlaceholder: false.
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/example-placeholder',
    isPlaceholder: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/example-placeholder',
    isPlaceholder: true,
  },
  {
    id: 'medium',
    label: 'Medium',
    url: 'https://medium.com/@example-placeholder',
    isPlaceholder: true,
  },
]

export const socialByIdRecord = Object.fromEntries(
  socialLinks.map((link) => [link.id, link]),
) as Record<SocialId, SocialLink>

/**
 * Contact-form transport.
 *
 * `provider: 'none'` keeps the form fully functional but routes the submission
 * through the visitor's own mail client (mailto). Set a provider and endpoint
 * to POST instead — nothing else in the UI has to change.
 */
export type ContactProvider = 'none' | 'formspree' | 'emailjs' | 'custom'

export const contactConfig = {
  provider: 'none' as ContactProvider,
  /** Formspree: https://formspree.io/f/xxxxxxx — or any endpoint accepting JSON. */
  endpoint: '',
  /** EmailJS only. */
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
} as const

/** Canonical origin. Replace once a custom domain is pointed at GitHub Pages. */
export const canonicalUrl = 'https://ashwath-kumarant.github.io/portfolio/'

export const repository = {
  name: 'portfolio',
  url: 'https://github.com/Ashwath-KumaranT/portfolio',
}

/** The spec explicitly excludes a resume download. Kept as a flag, not a deletion. */
export const showResumeButton = false
