import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { SaralAi } from '../components/home/SaralAi'

/* The front door is a conversation. Everything else lives at /home. */
const EASE = [0.22, 1, 0.36, 1] as const
const WORDS = ['Making', 'Lending', 'Saral', 'for', 'Bharat.']

export function Landing() {
  const still = useReducedMotion()
  return (
    <div className="relative flex min-h-[calc(100svh-64px)] flex-col justify-center overflow-hidden pb-6">
      {/* two slow orbs behind the card: transforms only, no blur filters */}
      {!still && (
        <>
          <motion.div animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -left-40 top-10 -z-10 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(127,99,255,0.22),transparent_65%)]" />
          <motion.div animate={{ x: [0, -50, 0], y: [0, 50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(13,143,217,0.16),transparent_65%)]" />
        </>
      )}
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-end justify-between gap-4 px-5 pt-6 sm:px-8 lg:px-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="eyebrow mb-3">
            Lending infrastructure for India&rsquo;s banks &amp; NBFCs
          </motion.div>
          <h1 className="display flex flex-wrap gap-x-[0.28em] text-[clamp(32px,4.4vw,52px)]">
            {WORDS.map((w, i) => (
              <span key={w} className="overflow-hidden pb-1">
                <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.07 }} className={`block ${w === 'Saral' ? 'text-gradient' : ''}`}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Link to="/home" className="group flex items-center gap-1 pb-2 text-[13px] font-semibold text-muted hover:text-ink">
            Skip to the website <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}>
        <SaralAi />
      </motion.div>
    </div>
  )
}
