import { VISUALS } from '../products/ModuleVisuals'
import { Held } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'
import { MODULES, type Module } from '../../content/site'
import { scrollToEl } from '../../lib/scroll'

/* The stack, one agent per screen. Each screen is held at the top while the
   next pulls up over it, the same movement as the landing page, so nothing
   is ever read half-and-half. The rail jumps straight to one. */

export function ProductsSection() {
  return (
    <Section id="products">
      <Container>
        <SectionHead
          eyebrow="Products"
          title={
            <>
              Five agents. <span className="text-accent">One stack.</span>
            </>
          }
          lede="Run the full stack, or plug in one module."
        />
        <div className="mb-10 flex flex-wrap gap-2">
          {MODULES.map((m) => (
            <button
              key={m.code}
              type="button"
              onClick={() => scrollToEl(m.code)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-small font-semibold text-ink2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <m.icon className={`size-3.5 ${m.color}`} /> {m.name}
            </button>
          ))}
        </div>
      </Container>

      <div className="relative">
        {MODULES.map((m, i) => (
          <Held
            key={m.code}
            id={m.code}
            z={i + 1}
            className="h-[100svh] overflow-hidden bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.35)] motion-reduce:h-auto"
          >
            <Screen m={m} index={i} />
          </Held>
        ))}
      </div>
    </Section>
  )
}

function Screen({ m, index }: { m: Module; index: number }) {
  const V = VISUALS[index]
  return (
    <Container className="flex h-full min-h-[100svh] items-center py-14">
      <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <V />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-7 overflow-hidden rounded-3xl">
            <img
              src={m.img}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className={`grid size-11 place-items-center rounded-2xl ${m.wash} ${m.color}`}>
              <m.icon className="size-5" strokeWidth={2.2} />
            </span>
            <span className="font-mono text-label uppercase tracking-[0.12em] text-hint">
              {m.code} &middot; {m.tag}
            </span>
          </div>
          <h2 className="display mt-5 text-h2">{m.name}</h2>
          <p className={`mt-2 text-h3 font-semibold leading-snug ${m.color}`}>{m.short}</p>
          <p className="mt-4 max-w-[52ch] text-body leading-relaxed text-muted">{m.body}</p>
        </div>
      </div>
    </Container>
  )
}
