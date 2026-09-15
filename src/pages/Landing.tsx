import { Database, FileText, Lightbulb, ShieldCheck, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'
import { SaralAi } from '../components/home/SaralAi'
import { ButtonLink } from '../components/ui/Button'

/* The front door: copy on the left, Saral AI on the right. Everything else
   lives at /home. */

const EASE = [0.22, 1, 0.36, 1] as const
const CAN = [
  { icon: FileText, label: 'RBI & regulatory' },
  { icon: TrendingUp, label: 'Credit & risk' },
  { icon: Database, label: 'Collections & recovery' },
  { icon: Lightbulb, label: 'Product & integration' },
]

export function Landing() {
  return (
    <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 py-10 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-10 lg:py-12">
      <div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-accent" /> Lending intelligence for India
        </motion.div>
        <h1 className="display mt-5 text-[clamp(34px,3.6vw,54px)]">
          {['Get answers to your', 'lending questions.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.1 }} className={`block ${i === 1 ? 'text-accent' : ''}`}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE, delay: 0.35 }} className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink2 md:text-[19px]">
          Ask Saral — your AI copilot for credit, collections and compliance. Built on RBI guidelines, industry practice and Saralya&rsquo;s lending infrastructure.
        </motion.p>

        <motion.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.06, delayChildren: 0.45 }} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {CAN.map((c) => (
            <motion.li key={c.label} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="flex items-center gap-3 text-[13px] font-medium leading-snug text-ink2">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-accent ring-1 ring-line">
                <c.icon className="size-5" strokeWidth={1.8} />
              </span>
              {c.label}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex items-center gap-4 rounded-2xl bg-wash2 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-accent ring-1 ring-line">
            <ShieldCheck className="size-5" strokeWidth={1.8} />
          </span>
          <div>
            <div className="text-[15px] font-semibold">Built for banks, NBFCs and financial institutions.</div>
            <div className="text-[13px] text-muted">Context aware. Nothing you type leaves your browser.</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/home" variant="ink" arrow>
            Explore Saralya
          </ButtonLink>
          <ButtonLink to="/demo" variant="ghost">
            Try the live demo
          </ButtonLink>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 }} className="h-[640px] max-h-[calc(100svh-120px)] min-h-[520px]">
        <SaralAi />
      </motion.div>
    </div>
  )
}
