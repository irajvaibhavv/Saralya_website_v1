import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { Starter } from '../../content/saral-ai'
import { Mark, SaralAiChat } from './SaralAiChat'
import { SaralAiPanel } from './SaralAiPanel'

/* Saral Saarthi lives in the corner. A launcher until it is opened; then a
   window that starts with four questions and becomes the conversation. */

const SHADOW = 'shadow-[0_0_0_1px_rgba(20,20,32,0.06),0_28px_80px_-20px_rgba(20,20,32,0.5)]'

export function SaralAiWidget({ open, pending, onOpen, onAsk, onClose }: { open: boolean; pending: Starter | null; onOpen: () => void; onAsk: (s: Starter) => void; onClose: () => void }) {
  return (
    <>
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
            className="fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-ink py-2 pl-2 pr-5 text-white shadow-[0_16px_40px_-12px_rgba(20,20,32,0.6)] sm:bottom-6 sm:right-6"
          >
            <span className="relative grid size-9 place-items-center rounded-full bg-accent">
              <Mark className="text-[19px]" />
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-green ring-2 ring-ink" />
            </span>
            <span className="text-[14px] font-semibold">Ask Saral Saarthi</span>
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
            className={`fixed inset-x-3 bottom-3 z-[90] origin-bottom-right overflow-hidden rounded-3xl bg-bg sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px] ${SHADOW} ${pending ? 'h-[min(600px,88svh)]' : 'max-h-[88svh]'}`}
          >
            <button onClick={onClose} aria-label="Close Saral AI" className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-ink">
              <X className="size-4" />
            </button>
            {pending ? <SaralAiChat pending={pending} /> : <SaralAiPanel onAsk={onAsk} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
