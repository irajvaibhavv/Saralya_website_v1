import { UploadCloud } from 'lucide-react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { Starter } from '../../content/saral-ai'
import { fileStarter, Mark, SaralAiChat, type Role } from './SaralAiChat'
import { SaralAiPanel } from './SaralAiPanel'
import { scrollToEl } from '../../lib/scroll'

/* Saral Saarthi is a screen, not a dialog. It sits below the reel and rides
   up over it as the visitor scrolls — the hero is held in place by the
   sticky stage in Landing, so this layer covers it the way one page covers
   another. Scroll back and the reel returns. Files can be dropped anywhere
   on the page. */

export function SaralAiSection({
  pending,
  seat,
  onAsk,
  onReset,
}: {
  pending: Starter | null
  seat: Role | null
  onAsk: (s: Starter) => void
  onReset: () => void
}) {
  /* The corner launcher rides over the reel and steps aside once Saarthi
     is on screen; it is the shortcut for anyone who would rather not
     scroll. */
  const stage = useRef<HTMLElement>(null)
  const inView = useInView(stage, { amount: 0.25 })
  const [hint, setHint] = useState(false)
  useEffect(() => {
    if (inView) { setHint(false); return }
    const on = window.setTimeout(() => setHint(true), 2500)
    const off = window.setTimeout(() => setHint(false), 9000)
    return () => { window.clearTimeout(on); window.clearTimeout(off) }
  }, [inView])

  /* Drop a file anywhere on the page: the conversation opens with it, or
     takes it if one is already running. */
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

  return (
    <>
      <section ref={stage} id="saarthi" className="flex h-full min-h-[100svh] scroll-mt-0 flex-col justify-center bg-bg px-5 pt-16">
        <div className="mx-auto h-[80svh] w-full max-w-[1060px]">
          {pending ? <SaralAiChat pending={pending} seat={seat} dropped={dropped} /> : <SaralAiPanel onAsk={onAsk} seat={seat} />}
        </div>

        {pending && (
          <button
            type="button"
            onClick={onReset}
            className="mx-auto mt-4 block rounded-full bg-white px-5 py-2.5 text-small font-medium text-ink2 ring-1 ring-line transition-colors hover:bg-wash2"
          >
            Start over
          </button>
        )}
      </section>

      <AnimatePresence>
        {hint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
            className="fixed bottom-[76px] right-5 z-[90] max-w-[240px] rounded-xl bg-white px-3.5 py-2.5 text-small leading-snug text-ink2 shadow-md sm:bottom-[84px] sm:right-6"
          >
            Ask me anything about credit risk, collections or RBI norms.
            <span className="absolute -bottom-1 right-6 size-2 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!inView && (
          <motion.button
            key="launch"
            type="button"
            onClick={() => scrollToEl('saarthi')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, delay: 0.8 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-ink shadow-md sm:bottom-6 sm:right-6"
          >
            <span className="relative grid size-8 place-items-center rounded-full bg-accent text-white">
              <Mark className="text-lede" />
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-green ring-2 ring-white" />
            </span>
            <span className="text-small font-medium">Saral Saarthi</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dragging && (
          <motion.div key="drop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="pointer-events-none fixed inset-0 z-[95] grid place-items-center bg-ink/40 p-6 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.94, y: 8 }} animate={{ scale: 1, y: 0 }} className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-white/70 bg-white/10 px-12 py-10 text-center text-white">
              <UploadCloud className="size-10" strokeWidth={1.6} />
              <div className="text-h3 font-semibold tracking-tight">Drop it for Saral</div>
              <div className="text-body text-white/75">Policy docs, sample files, MIS sheets.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
