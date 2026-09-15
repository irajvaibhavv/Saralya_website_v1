import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'ink' | 'ghost' | 'white'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 ' +
  'group'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent2',
  ink: 'bg-ink text-white hover:bg-ink2',
  ghost: 'bg-white text-ink ring-1 ring-line hover:bg-bg',
  white: 'bg-white text-ink hover:bg-wash2',
}

const sizes: Record<Size, string> = {
  md: 'text-sm px-4 py-2.5',
  lg: 'text-[15px] px-6 py-3',
}

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode; className?: string }

export function Button({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className = '',
  ...rest
}: Common & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className = '',
  to,
  ...rest
}: Common & { to: string } & Omit<ComponentProps<typeof Link>, 'className' | 'children' | 'to'>) {
  const external = to.startsWith('http') || to.startsWith('mailto:')
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  )
  if (external) {
    return (
      <a href={to} className={cls} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  )
}
