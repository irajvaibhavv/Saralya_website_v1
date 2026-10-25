import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}

/** Sections are separated by a hairline, not by floating cards. */
export function Section({
  children,
  className = '',
  id,
  tight,
  ...rest
}: {
  children: ReactNode
  className?: string
  id?: string
  tight?: boolean
  /* so a section that rotates on its own can be held by a pointer or a
     keyboard without every caller rebuilding the element */
} & Omit<ComponentPropsWithoutRef<'section'>, 'className' | 'id' | 'children'>) {
  return (
    <section
      id={id}
      className={`relative ${id ? 'scroll-mt-16' : ''} ${tight ? 'py-10 md:py-14' : 'border-t border-line py-16 md:py-24'} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}

