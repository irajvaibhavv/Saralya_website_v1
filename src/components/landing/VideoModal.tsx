import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'

/* The full-screen player: black, the film, one close. Esc or the backdrop closes it. */
export function VideoModal({ src, open, onClose }: { src: string; open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal
          aria-label="Saralya video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-4 sm:p-10"
        >
          <button onClick={onClose} aria-label="Close video" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6">
            <X className="size-5" />
          </button>
          <motion.video
            src={src}
            controls
            autoPlay
            playsInline
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-6xl rounded-xl bg-black shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] outline-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
