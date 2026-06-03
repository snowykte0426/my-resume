import { useEffect, useState } from 'react'
import { exportResumePdf } from '../utils/exportPdf'
import './PrintButton.css'

export function PrintButton() {
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        void download()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const download = async () => {
    if (busy) return
    setBusy(true)
    try {
      await exportResumePdf()
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      className="print-button"
      onClick={() => void download()}
      disabled={busy}
      aria-label="PDF로 저장"
      aria-busy={busy}
      title="PDF로 저장 (단축키: P)"
    >
      {busy ? (
        <svg className="print-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )}
    </button>
  )
}

export default PrintButton