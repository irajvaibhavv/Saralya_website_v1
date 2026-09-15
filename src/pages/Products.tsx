import { AnimatePresence, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ClosingCta } from '../components/layout/ClosingCta'
import { PageHero } from '../components/layout/PageHero'
import { VISUALS } from '../components/products/ModuleVisuals'
import { Container } from '../components/ui/Section'
import { MODULES } from '../content/site'

export function Products() {
  const [active, setActive] = useState(0)

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Six modules.
            <br />
            <span className="text-gradient">One stack.</span>
          </>
        }
        lede="Run the full stack, or plug in one module."
      >
        <div className="flex flex-wrap gap-2">
          {MODULES.map((m, i) => (
            <a
              key={m.code}
              href={`#${m.code}`}
              className={`inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                i === active ? m.color : 'text-ink2'
              }`}
            >
              <m.icon className={`size-3.5 ${m.color}`} /> {m.name}
            </a>
          ))}
        </div>
      </PageHero>

      {/* Scroll-driven showcase: sticky stage on the left swaps its visual as
          each module's block scrolls into view on the right. */}
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {(() => {
                    const V = VISUALS[active]
                    return <V />
                  })()}
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex justify-center gap-2">
                {MODULES.map((m, i) => (
                  <a
                    key={m.code}
                    href={`#${m.code}`}
                    aria-label={m.name}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? `w-8 ${m.bar}` : 'w-1.5 bg-line2'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            {MODULES.map((m, i) => (
              <ModuleBlock key={m.code} index={i} onActive={() => setActive(i)} />
            ))}
          </div>
        </div>
      </Container>

      <ClosingCta />
    </>
  )
}

function ModuleBlock({ index, onActive }: { index: number; onActive: () => void }) {
  const m = MODULES[index]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])
  const V = VISUALS[index]

  return (
    <div ref={ref} id={m.code} className="flex scroll-mt-24 flex-col justify-center py-10 lg:min-h-[78vh] lg:py-0">
      {/* On small screens each block carries its own visual */}
      <div className="mb-6 lg:hidden">
        <V />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className={`grid size-12 place-items-center rounded-2xl ${m.wash} ${m.color}`}>
            <m.icon className="size-6" strokeWidth={2.2} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-hint">
            {m.code} · {m.tag}
          </span>
        </div>
        <h2 className="display mt-6 text-[clamp(34px,4.4vw,56px)]">{m.name}</h2>
        <p className={`mt-3 text-[clamp(18px,2vw,24px)] font-semibold leading-snug ${m.color}`}>{m.short}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {m.points.map((p) => (
            <span key={p} className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink2 shadow-sm">
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
