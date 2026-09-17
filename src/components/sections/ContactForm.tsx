import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { hasContactProvider, submitContactForm, validateContactForm } from '../../lib/contact'
import type { ContactFieldErrors, ContactFormValues } from '../../lib/contact'
import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

type Status = 'idle' | 'submitting' | 'success' | 'mailto' | 'error'

const emptyForm: ContactFormValues = { name: '', email: '', subject: '', message: '' }

/**
 * Contact form.
 *
 * Validation runs client-side on submit, and per-field once a field has been
 * touched, so a visitor isn't scolded while still typing. The transport is
 * whatever `contactConfig` says — with no provider configured, submitting opens
 * the visitor's mail client with the message pre-composed.
 */
export function ContactForm() {
  const fieldId = useId()
  const [values, setValues] = useState<ContactFormValues>(emptyForm)
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  function update<K extends keyof ContactFormValues>(key: K, value: string) {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key]) {
      setErrors(validateContactForm(next))
    }
  }

  function markTouched(key: keyof ContactFormValues) {
    setTouched((previous) => ({ ...previous, [key]: true }))
    setErrors(validateContactForm(values))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateContactForm(values)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      setFeedback('Please fix the highlighted fields and try again.')
      return
    }

    setStatus('submitting')
    setFeedback('')

    const result = await submitContactForm(values)

    if (result.status === 'sent') {
      setStatus('success')
      setFeedback("Thanks — your message has been sent. I'll get back to you.")
      setValues(emptyForm)
      setTouched({})
      return
    }

    if (result.status === 'mailto') {
      setStatus('mailto')
      setFeedback(
        'Your email app should now be open with this message ready to send. If nothing happened, use the email link below.',
      )
      window.location.href = result.href
      return
    }

    setStatus('error')
    setFeedback(result.message)
  }

  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${fieldId}-name`}
          label="Name"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={(value) => update('name', value)}
          onBlur={() => markTouched('name')}
          autoComplete="name"
          disabled={isSubmitting}
        />
        <Field
          id={`${fieldId}-email`}
          label="Email"
          type="email"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={(value) => update('email', value)}
          onBlur={() => markTouched('email')}
          autoComplete="email"
          disabled={isSubmitting}
        />
      </div>

      <Field
        id={`${fieldId}-subject`}
        label="Subject"
        value={values.subject}
        error={touched.subject ? errors.subject : undefined}
        onChange={(value) => update('subject', value)}
        onBlur={() => markTouched('subject')}
        disabled={isSubmitting}
      />

      <Field
        id={`${fieldId}-message`}
        label="Message"
        multiline
        value={values.message}
        error={touched.message ? errors.message : undefined}
        onChange={(value) => update('message', value)}
        onBlur={() => markTouched('message')}
        disabled={isSubmitting}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          icon={
            isSubmitting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )
          }
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>

        {!hasContactProvider && (
          <p className="text-[0.72rem] text-content-faint">
            No form provider is connected yet — sending opens your email app.
          </p>
        )}
      </div>

      {/* Status region is always present so screen readers announce changes
          rather than the whole block appearing as new content. */}
      <div role="status" aria-live="polite" className="min-h-0">
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.p
              key={feedback}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'flex items-start gap-2 rounded-xl border p-3 text-[0.82rem] leading-relaxed',
                status === 'error'
                  ? 'border-red-500/35 bg-red-500/8 text-red-500 dark:text-red-300'
                  : 'border-emerald-500/35 bg-emerald-500/8 text-emerald-700 dark:text-emerald-300',
              )}
            >
              {status === 'error' ? (
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[0.72rem] text-content-faint">
        Prefer email? Write to{' '}
        <a
          href={`mailto:${profile.email}`}
          className="text-content-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-soft"
        >
          {profile.email}
        </a>
        .
      </p>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  type?: string
  multiline?: boolean
  autoComplete?: string
  disabled?: boolean
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  multiline = false,
  autoComplete,
  disabled,
}: FieldProps) {
  const errorId = `${id}-error`
  const shared = cn(
    'w-full rounded-xl border bg-surface-sunken/80 px-3.5 py-2.5 text-sm text-content placeholder:text-content-faint',
    'transition-colors duration-200 outline-none focus:border-line-strong disabled:opacity-60',
    error ? 'border-red-500/55' : 'border-line hover:border-line-strong',
  )

  return (
    <div className={cn('flex flex-col gap-1.5', multiline && 'sm:col-span-2')}>
      <label htmlFor={id} className="text-[0.78rem] font-medium text-content-muted">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(shared, 'resize-y min-h-32')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(shared, 'min-h-11')}
        />
      )}

      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-[0.72rem] text-red-500 dark:text-red-300">
          <CircleAlert className="h-3 w-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
