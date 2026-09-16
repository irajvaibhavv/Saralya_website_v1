import type { ReactNode } from 'react'
import { FadeIn } from './Reveal'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}

/** Sections are separated by a hairline, not by floating cards. */
export function Section({
  children,
  className = '',
  id,
  tight,
}: {
  children: ReactNode
  className?: string
  id?: string
  tight?: boolean
}) {
  return (
    <section id={id} className={`relative ${tight ? 'py-10 md:py-14' : 'border-t border-line py-16 md:py-24'} ${className}`}>
      {children}
    </section>
  )
}

/** Eyebrow + headline on the left, the one-liner on the right. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  className?: string
}) {
  return (
    <FadeIn className={`mb-10 grid gap-4 md:mb-12 lg:grid-cols-[1fr_minmax(0,380px)] lg:items-end lg:gap-10 ${className}`}>
      <div>
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h2 className="display max-w-2xl text-[clamp(28px,3.4vw,42px)]">{title}</h2>
      </div>
      {lede && <p className="text-[16px] leading-relaxed text-muted lg:pb-1">{lede}</p>}
    </FadeIn>
  )
}
