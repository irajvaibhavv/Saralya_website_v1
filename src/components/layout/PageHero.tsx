import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Container } from '../ui/Section'

/** Compact top-of-page header used by every page except Home. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </div>
          <h1 className="display text-[clamp(38px,6vw,68px)]">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-muted">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </Container>
    </div>
  )
}
