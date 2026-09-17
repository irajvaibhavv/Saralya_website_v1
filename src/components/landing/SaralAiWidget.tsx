import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { Starter } from '../../content/saral-ai'
import { Mark, SaralAiChat, type Role } from './SaralAiChat'
import { SaralAiPanel } from './SaralAiPanel'

/* Saral Saarthi lives in the corner. A launcher until it is opened; then a
   window that starts with four questions and becomes the conversation. */

const SHADOW = 'shadow-[0_0_0_1px_rgba(20,20,32,0.05),0_16px_40px_-20px_rgba(20,20,32,0.18)]'

export function SaralAiWidget({ open, pending, seat, onOpen, onAsk, onClose }: { open: boolean; pending: Starter | null; seat: Role | null; onOpen: () => void; onAsk: (s: Starter) => void; onClose: () => void }) {
  // a one-time nudge beside the launcher so a first visitor knows what it is
  const [hint, setHint] = useState(false)
  useEffect(() => {
    if (open) { setHint(false); return }
    const on = window.setTimeout(() => setHint(true), 2500)
    const off = window.setTimeout(() => setHint(false), 9000)
    return () => { window.clearTimeout(on); window.clearTimeout(off) }
  }, [open])

  return (
    <>
      <AnimatePresence>
        {hint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
            className="fixed bottom-[76px] right-5 z-[90] max-w-[240px] rounded-xl bg-white px-3.5 py-2.5 text-[13px] leading-snug text-ink2 shadow-md sm:bottom-[84px] sm:right-6"
          >
            Ask me anything about credit risk, collections or RBI norms.
            <span className="absolute -bottom-1 right-6 size-2 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.button
            key="launch"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, delay: 0.8 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-ink shadow-md sm:bottom-6 sm:right-6"
          >
            <span className="relative grid size-8 place-items-center rounded-full bg-accent text-white">
              <Mark className="text-[17px]" />
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-green ring-2 ring-white" />
            </span>
            <span className="text-[13.5px] font-medium">Saral Saarthi</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className={`fixed inset-x-3 bottom-3 z-[90] origin-bottom-right overflow-hidden rounded-3xl bg-bg sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[360px] ${SHADOW} ${pending ? 'h-[min(540px,88svh)]' : 'max-h-[88svh]'}`}
          >
            <button onClick={onClose} aria-label="Close Saral AI" className="absolute right-2.5 top-2.5 z-10 grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-ink">
              <X className="size-4" />
            </button>
            {pending ? <SaralAiChat pending={pending} seat={seat} /> : <SaralAiPanel onAsk={onAsk} seat={seat} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
