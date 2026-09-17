import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[transform,background-color,border-color,box-shadow,color] duration-200 select-none ' +
  // Comfortable touch targets on every variant.
  'min-h-11 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55'

const variants: Record<Variant, string> = {
  primary:
    'text-white shadow-[0_10px_30px_-12px_var(--glow)] bg-[linear-gradient(100deg,var(--accent),var(--accent-2))] ' +
    'hover:shadow-[0_16px_38px_-12px_var(--glow)] hover:brightness-110',
  secondary:
    'border border-line bg-chip text-content backdrop-blur-sm hover:border-line-strong hover:bg-accent/10',
  ghost: 'text-content-muted hover:bg-chip hover:text-content',
}

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-[0.95rem]',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
  iconRight?: ReactNode
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    as?: 'button'
  }

type InternalLinkProps = CommonProps & {
  as: 'link'
  to: string
}

type ExternalLinkProps = CommonProps & {
  as: 'a'
  href: string
  /** Defaults to opening in a new tab for external destinations. */
  newTab?: boolean
  'aria-label'?: string
}

export type AnyButtonProps = ButtonProps | InternalLinkProps | ExternalLinkProps

export function Button(props: AnyButtonProps) {
  const { children, variant = 'primary', size = 'md', className, icon, iconRight } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  const content = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  )

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    )
  }

  if (props.as === 'a') {
    const { href, newTab = true } = props
    return (
      <a
        href={href}
        className={classes}
        aria-label={props['aria-label']}
        {...(newTab ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {content}
      </a>
    )
  }

  const { as: _as, variant: _v, size: _s, className: _c, icon: _i, iconRight: _ir, children: _ch, ...buttonProps } = props
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
