import type { ReactNode } from 'react'
import { FadeIn } from './Motion'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}

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
    <section id={id} className={`relative ${tight ? 'py-16 md:py-20' : 'py-20 md:py-28'} ${className}`}>
      {children}
    </section>
  )
}

/** Eyebrow + headline + optional one-liner. Centred by default. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'center',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  const centred = align === 'center'
  return (
    <FadeIn className={`${centred ? 'mx-auto text-center' : ''} max-w-2xl mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <div className={`eyebrow mb-4 flex items-center gap-3 ${centred ? 'justify-center' : ''}`}>
          {centred && <span className="h-px w-6 bg-accent" />}
          {eyebrow}
          <span className="h-px w-6 bg-accent" />
        </div>
      )}
      <h2 className="display text-[clamp(30px,4.4vw,50px)]">{title}</h2>
      {lede && <p className={`mt-4 text-[16px] md:text-[17px] text-muted ${centred ? 'mx-auto' : ''} max-w-xl`}>{lede}</p>}
    </FadeIn>
  )
}
