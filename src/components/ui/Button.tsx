import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'ink' | 'ghost' | 'white'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 ' +
  'active:translate-y-0 hover:-translate-y-0.5 group'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent2 hover:shadow-glow',
  ink: 'bg-ink text-white hover:bg-accent hover:shadow-glow',
  ghost: 'bg-white text-ink shadow-sm hover:shadow-md',
  white: 'bg-white text-ink hover:bg-wash2',
}

const sizes: Record<Size, string> = {
  md: 'text-sm px-5 py-2.5',
  lg: 'text-[15px] px-7 py-3.5',
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
