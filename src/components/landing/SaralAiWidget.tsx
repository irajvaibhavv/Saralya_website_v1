import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { Starter } from '../../content/saral-ai'
import { SaralAiChat } from './SaralAiChat'

/* The conversation, as a small window in the corner. It only exists once a
   question has been asked; closing it clears the question. */
export function SaralAiWidget({ pending, onClose }: { pending: Starter | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {pending && (
        <motion.div
          key="widget"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-[90] h-[min(560px,85svh)] origin-bottom-right sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px]"
        >
          <button onClick={onClose} aria-label="Close Saral AI" className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-wash2 hover:text-ink">
            <X className="size-4" />
          </button>
          <SaralAiChat pending={pending} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
