import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setPct(Math.min(100, (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100))
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return <div className="progress" style={{ width: `${pct}%` }} />
}
