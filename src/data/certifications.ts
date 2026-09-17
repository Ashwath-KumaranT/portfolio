/**
 * Certifications.
 *
 * EVERY ENTRY BELOW IS DUMMY DATA. They exist so the section has a real layout
 * to render. To publish real certifications: replace the fields, set
 * `isPlaceholder: false`, and point `credentialUrl` at the verifiable badge.
 * The UI shows a "Placeholder" marker for any entry still flagged.
 */

export type Certification = {
  id: string
  name: string
  issuer: string
  year: string
  credentialUrl: string
  isPlaceholder: boolean
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'Certification Name',
    issuer: 'Issuing Organization',
    year: '2025',
    credentialUrl: 'https://example.com/credential-placeholder',
    isPlaceholder: true,
  },
  {
    id: 'cert-2',
    name: 'Certification Name',
    issuer: 'Issuing Organization',
    year: '2025',
    credentialUrl: 'https://example.com/credential-placeholder',
    isPlaceholder: true,
  },
  {
    id: 'cert-3',
    name: 'Certification Name',
    issuer: 'Issuing Organization',
    year: '2024',
    credentialUrl: 'https://example.com/credential-placeholder',
    isPlaceholder: true,
  },
]
