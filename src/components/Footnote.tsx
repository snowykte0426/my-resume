 import { useState } from 'react'
import './Footnote.css'

interface FootnoteProps {
  children: React.ReactNode
}

let footnoteCounter = 0

export function Footnote({ children }: FootnoteProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [id] = useState(() => ++footnoteCounter)

  return (
    <span className="inline-footnote">
      <sup
        className="footnote-ref"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        role="button"
        tabIndex={0}
        aria-label={`각주 ${id}`}
      >
        [{id}]
      </sup>
      {isVisible && (
        <span className="footnote-tooltip" role="tooltip">
          {children}
        </span>
      )}
    </span>
  )
}

export default Footnote