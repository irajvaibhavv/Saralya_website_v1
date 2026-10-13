import { UploadCloud, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { Starter } from '../../content/saral-ai'
import { fileStarter, Mark, SaralAiChat, type Role } from './SaralAiChat'
import { SaralAiPanel } from './SaralAiPanel'

/* A launcher in the corner until it is opened; then Saral Saarthi takes the
   whole page. No panel: the reel keeps playing at full size and the
   conversation floats on it, carried by a wash dark enough to read against. */

export function SaralAiWidget({ open, pending, seat, onOpen, onAsk, onClose }: { open: boolean; pending: Starter | null; seat: Role | null; onOpen: () => void; onAsk: (s: Starter) => void; onClose: () => void }) {
  // a one-time nudge beside the launcher so a first visitor knows what it is
  const [hint, setHint] = useState(false)

  /* Drop a file anywhere on the page: the window opens with it, or takes it
     if it is already open. */
  const [dragging, setDragging] = useState(false)
  const [dropped, setDropped] = useState<FileList | null>(null)
  useEffect(() => {
    let depth = 0
    const has = (e: DragEvent) => [...(e.dataTransfer?.types ?? [])].includes('Files')
    const enter = (e: DragEvent) => { if (has(e)) { depth++; setDragging(true) } }
    const leave = (e: DragEvent) => { if (has(e) && --depth <= 0) { depth = 0; setDragging(false) } }
    const over = (e: DragEvent) => { if (has(e)) e.preventDefault() }
    const drop = (e: DragEvent) => {
      if (!has(e)) return
      e.preventDefault()
      depth = 0
      setDragging(false)
      const files = e.dataTransfer!.files
      if (pending) setDropped(files)
      else {
        const s = fileStarter(files)
        if (s) onAsk(s)
      }
    }
    window.addEventListener('dragenter', enter)
    window.addEventListener('dragleave', leave)
    window.addEventListener('dragover', over)
    window.addEventListener('drop', drop)
    return () => {
      window.removeEventListener('dragenter', enter)
      window.removeEventListener('dragleave', leave)
      window.removeEventListener('dragover', over)
      window.removeEventListener('drop', drop)
    }
  }, [pending, onAsk])
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('saarthi-open')
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = prev
      document.documentElement.classList.remove('saarthi-open')
    }
  }, [open, onClose])
  useEffect(() => {
    if (open) { setHint(false); return }
    const on = window.setTimeout(() => setHint(true), 2500)
    const off = window.setTimeout(() => setHint(false), 9000)
    return () => { window.clearTimeout(on); window.clearTimeout(off) }
  }, [open])

  return (
    <>
      <AnimatePresence>
        {dragging && (
          <motion.div key="drop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="pointer-events-none fixed inset-0 z-[95] grid place-items-center bg-ink/40 p-6 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.94, y: 8 }} animate={{ scale: 1, y: 0 }} className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-white/70 bg-white/10 px-12 py-10 text-center text-white">
              <UploadCloud className="size-10" strokeWidth={1.6} />
              <div className="text-[20px] font-semibold tracking-tight">Drop it for Saral</div>
              <div className="text-[14px] text-white/75">Policy docs, sample files, MIS sheets.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <>
            <motion.div
              key="sheet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.4 }}
              onClick={onClose}
              role="dialog"
              aria-modal="true"
              aria-label="Saral Saarthi"
              className="fixed inset-0 z-[90] overflow-hidden bg-gradient-to-b from-ink/40 via-ink/18 to-ink/65 backdrop-blur-[2px]"
            >
              <button onClick={onClose} aria-label="Close Saral Saarthi" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6">
                <X className="size-5" />
              </button>
              {/* only the column dims — the reel keeps its brightness either side */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_52%_at_50%_50%,rgba(10,10,16,0.62),rgba(10,10,16,0.18)_62%,transparent_78%)]" />

              {/* a reading column; clicks inside it stay inside */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative mx-auto h-full w-full max-w-[720px] px-5"
              >
                {pending ? <SaralAiChat pending={pending} seat={seat} dropped={dropped} /> : <SaralAiPanel onAsk={onAsk} seat={seat} />}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
