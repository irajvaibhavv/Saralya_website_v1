import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SaralAi } from '../components/home/SaralAi'

/* The front door is a conversation. Everything else lives at /home. */
export function Landing() {
  return (
    <div className="flex min-h-[calc(100svh-64px)] flex-col justify-center pb-6">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-end justify-between gap-4 px-5 pt-6 sm:px-8 lg:px-10">
        <div>
          <div className="eyebrow mb-3">Lending infrastructure for India&rsquo;s banks &amp; NBFCs</div>
          <h1 className="display text-[clamp(32px,4.4vw,52px)]">
            Making Lending <span className="text-gradient">Saral</span> for Bharat.
          </h1>
        </div>
        <Link to="/home" className="flex items-center gap-1 pb-2 text-[13px] font-semibold text-muted hover:text-ink">
          Skip to the website <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <SaralAi />
    </div>
  )
}
