import { motion } from 'motion/react'
import { SaralAi } from '../components/home/SaralAi'

/* The front door is a conversation. Everything else lives at /home. */
const EASE = [0.22, 1, 0.36, 1] as const

export function Landing() {
  return (
    <div className="relative flex h-[calc(100svh-64px)] min-h-[620px] flex-col overflow-hidden pb-4 pt-2">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.35 }} className="min-h-0 flex-1">
        <SaralAi />
      </motion.div>
    </div>
  )
}
