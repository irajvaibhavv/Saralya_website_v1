import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

/* Small motion primitives shared across pages. Everything is scroll-triggered
   once (`viewport.once`) so pages don't re-animate while the user reads. */

const EASE = [0.22, 1, 0.36, 1] as const

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 14,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.45, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* A screen held at the top of the window while the next one pulls up over
   it: as that happens it settles back and dims, so the arriving screen
   reads as a page laid over it rather than a cut. Stacking order is the
   caller's: give each one a higher z-index than the last.

   A stuck screen cannot say where it rests: its `top` is pinned to zero
   and `offsetTop` moves with the scroll. So the resting place is measured
   while it is still below the line — on mount, on resize, and on any frame
   it is plainly not stuck. */
export function Held({ id, className, z, children, ...attrs }: { id?: string; className?: string; z?: number; children: ReactNode } & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const still = useReducedMotion()

  const rest = useRef(0)
  useEffect(() => {
    const measure = () => {
      const el = ref.current
      if (!el) return
      let top = 0
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop
      if (el.getBoundingClientRect().top > 2) rest.current = top
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const covered = useTransform(scrollY, (y) => {
    const el = ref.current
    if (!el) return 0
    /* comfortably below the line, so this frame can be trusted */
    const top = el.getBoundingClientRect().top
    if (top > 50) rest.current = top + y
    return Math.min(Math.max((y - rest.current) / (el.offsetHeight || 1), 0), 1)
  })
  const scale = useTransform(covered, [0, 1], [1, 0.93])
  const opacity = useTransform(covered, [0, 1], [1, 0.5])

  return (
    <motion.div
      ref={ref}
      id={id}
      style={still ? { zIndex: z } : { scale, opacity, zIndex: z }}
      className={`sticky top-0 motion-reduce:static ${className ?? ''}`}
      {...attrs}
    >
      {children}
    </motion.div>
  )
}
