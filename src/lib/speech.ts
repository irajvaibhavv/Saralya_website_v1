import { useRef, useState } from 'react'

/* Speech-to-text via the browser's SpeechRecognition API (Chrome, Edge,
   Safari). `supported` is false where the API is missing. */
type Recogniser = { lang: string; interimResults: boolean; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; onerror: () => void; start: () => void; stop: () => void }
const SR = typeof window !== 'undefined' ? ((window as unknown as { SpeechRecognition?: new () => Recogniser; webkitSpeechRecognition?: new () => Recogniser }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => Recogniser }).webkitSpeechRecognition) : undefined

export function useSpeech(onText: (t: string) => void) {
  const [listening, setListening] = useState(false)
  const rec = useRef<Recogniser | null>(null)
  const toggle = () => {
    if (listening) {
      rec.current?.stop()
      return
    }
    if (!SR) return
    const r = new SR()
    r.lang = 'en-IN'
    r.interimResults = true
    r.onresult = (e) => onText(Array.from(e.results, (x) => x[0].transcript).join(''))
    r.onend = () => setListening(false)
    r.onerror = () => setListening(false)
    rec.current = r
    r.start()
    setListening(true)
  }
  return { supported: !!SR, listening, toggle }
}
