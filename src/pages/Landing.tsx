import { motion, useReducedMotion } from 'motion/react'
import { SaralAi } from '../components/home/SaralAi'

/* The front door is a conversation. Everything else lives at /home. */
const EASE = [0.22, 1, 0.36, 1] as const

export function Landing() {
  const still = useReducedMotion()
  return (
    <div className="relative flex h-[calc(100svh-64px)] min-h-[620px] flex-col overflow-hidden pb-4 pt-2">
      {/* two slow orbs behind the card: transforms only, no blur filters */}
      {!still && (
        <>
          <motion.div animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -left-40 top-10 -z-10 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(127,99,255,0.22),transparent_65%)]" />
          <motion.div animate={{ x: [0, -50, 0], y: [0, 50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(13,143,217,0.16),transparent_65%)]" />
        </>
      )}
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.35 }} className="min-h-0 flex-1">
        <SaralAi />
      </motion.div>
    </div>
  )
}
