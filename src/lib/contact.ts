import { contactConfig } from '../data/site'
import { profile } from '../data/profile'

/**
 * Contact-form transport.
 *
 * The form component knows nothing about providers — it calls `submitContactForm`
 * and renders loading/success/error from the result. To connect a real provider,
 * edit `contactConfig` in src/data/site.ts; only the branches below change.
 */

export type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>

export type ContactResult =
  | { status: 'sent' }
  /** Handed off to the visitor's mail client — delivery can't be confirmed. */
  | { status: 'mailto'; href: string }
  | { status: 'error'; message: string }

// Intentionally permissive: the goal is to catch typos, not to police addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContactForm(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (values.name.trim().length < 2) {
    errors.name = 'That name looks too short.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.subject.trim()) {
    errors.subject = 'Please add a subject.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please write a message.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please add a little more detail (at least 20 characters).'
  }

  return errors
}

export function buildMailtoHref(values: ContactFormValues): string {
  const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`
  const params = new URLSearchParams({
    subject: values.subject.trim(),
    body,
  })
  // URLSearchParams encodes spaces as '+', which mail clients render literally.
  return `mailto:${profile.email}?${params.toString().replace(/\+/g, '%20')}`
}

async function postJson(endpoint: string, values: ContactFormValues): Promise<ContactResult> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    return {
      status: 'error',
      message: `The message could not be sent (${response.status}). Please email ${profile.email} directly.`,
    }
  }

  return { status: 'sent' }
}

export async function submitContactForm(values: ContactFormValues): Promise<ContactResult> {
  try {
    switch (contactConfig.provider) {
      case 'formspree':
      case 'custom': {
        if (!contactConfig.endpoint) {
          return {
            status: 'error',
            message: 'The contact form is not configured yet. Please use the email link below.',
          }
        }
        return await postJson(contactConfig.endpoint, values)
      }

      case 'emailjs': {
        const { serviceId, templateId, publicKey } = contactConfig.emailjs
        if (!serviceId || !templateId || !publicKey) {
          return {
            status: 'error',
            message: 'The contact form is not configured yet. Please use the email link below.',
          }
        }
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: values.name,
              reply_to: values.email,
              subject: values.subject,
              message: values.message,
            },
          }),
        })
        if (!response.ok) {
          return {
            status: 'error',
            message: `The message could not be sent (${response.status}). Please email ${profile.email} directly.`,
          }
        }
        return { status: 'sent' }
      }

      case 'none':
      default:
        // No provider configured: hand the composed message to the visitor's
        // own mail client. Documented in the README.
        return { status: 'mailto', href: buildMailtoHref(values) }
    }
  } catch {
    return {
      status: 'error',
      message: `Something went wrong sending the message. Please email ${profile.email} directly.`,
    }
  }
}

/** True when submissions go out over the network rather than via mailto. */
export const hasContactProvider = contactConfig.provider !== 'none'
