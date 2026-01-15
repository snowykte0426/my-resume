 import { useState, useId, createContext, useContext, useMemo, useRef } from 'react'
import './Footnote.css'

const FootnoteContext = createContext<{ getNumber: (id: string) => number } | null>(null)

interface FootnoteProviderProps {
  children: React.ReactNode
}

export function FootnoteProvider({ children }: FootnoteProviderProps) {
  const counterRef = useRef(0)
  const idMapRef = useRef<Map<string, number>>(new Map())

  const value = useMemo(() => ({
    getNumber: (id: string) => {
      if (!idMapRef.current.has(id)) {
        counterRef.current += 1
        idMapRef.current.set(id, counterRef.current)
      }
      return idMapRef.current.get(id)!
    }
  }), [])

  return (
    <FootnoteContext.Provider value={value}>
      {children}
    </FootnoteContext.Provider>
  )
}

interface FootnoteProps {
  children: React.ReactNode
}

export function Footnote({ children }: FootnoteProps) {
  const [isVisible, setIsVisible] = useState(false)
  const reactId = useId()
  const context = useContext(FootnoteContext)

  // Context가 있으면 숫자 번호 사용, 없으면 React ID 사용
  const id = context ? context.getNumber(reactId) : reactId

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