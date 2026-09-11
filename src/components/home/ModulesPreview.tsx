import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MODULES } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { Item, Stagger } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

export function ModulesPreview() {
  return (
    <Section id="modules">
      <Container>
        <SectionHead
          eyebrow="Products"
          title={
            <>
              Six modules. <span className="text-accent">One stack.</span>
            </>
          }
          lede="Run the full stack as your LOS + LMS, or plug a single module into the core you already have."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <Item key={m.code}>
              <Link
                to="/products"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`absolute -right-10 -top-10 size-36 rounded-full ${m.wash} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative flex items-start justify-between">
                  <span className={`grid size-11 place-items-center rounded-2xl ${m.wash} ${m.color}`}>
                    <m.icon className="size-5" strokeWidth={2.2} />
                  </span>
                  <span className="font-mono text-[11px] text-hint">{m.code} · {m.tag}</span>
                </div>
                <div className="relative mt-6">
                  <div className="text-[19px] font-extrabold tracking-[-0.02em]">{m.name}</div>
                  <div className="mt-1 text-[14px] text-muted">{m.short}</div>
                </div>
                <div className="relative mt-auto flex items-center gap-1 pt-6 text-[13px] font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more <ArrowUpRight className="size-4" />
                </div>
              </Link>
            </Item>
          ))}
        </Stagger>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/products" variant="ghost" arrow>
            Explore all modules
          </ButtonLink>
        </div>
      </Container>
    </Section>
  )
}
