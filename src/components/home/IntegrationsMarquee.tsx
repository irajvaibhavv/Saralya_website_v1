import { INTEGRATIONS } from '../../content/site'
import { FadeIn } from '../ui/Motion'

/* "Plugs into" strip — integration partners are documented on saralya.in,
   unlike the customer logos from the prototype which were unverified. */
export function IntegrationsMarquee() {
  const row = [...INTEGRATIONS, ...INTEGRATIONS]
  return (
    <FadeIn className="py-6 md:py-10">
      <div className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-hint">
        Plugs into the rails you already use
      </div>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-ink2 shadow-sm whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
