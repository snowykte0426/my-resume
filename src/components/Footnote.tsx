import { useState, useId, createContext, useContext, useMemo, useRef, useEffect } from 'react'
import './Footnote.css'

interface FootnoteApi {
  getNumber: (id: string) => number
  register: (number: number, content: React.ReactNode) => void
  unregister: (number: number) => void
}

const FootnoteApiContext = createContext<FootnoteApi | null>(null)
const FootnoteItemsContext = createContext<[number, React.ReactNode][]>([])

interface FootnoteProviderProps {
  children: React.ReactNode
}

export function FootnoteProvider({ children }: FootnoteProviderProps) {
  const counterRef = useRef(0)
  const idMapRef = useRef<Map<string, number>>(new Map())
  const [footnotes, setFootnotes] = useState<Map<number, React.ReactNode>>(new Map())

  const api = useMemo<FootnoteApi>(() => ({
    getNumber: (id: string) => {
      if (!idMapRef.current.has(id)) {
        counterRef.current += 1
        idMapRef.current.set(id, counterRef.current)
      }
      return idMapRef.current.get(id)!
    },
    register: (number, content) => setFootnotes((prev) => {
      if (prev.get(number) === content) return prev
      const next = new Map(prev)
      next.set(number, content)
      return next
    }),
    unregister: (number) => setFootnotes((prev) => {
      if (!prev.has(number)) return prev
      const next = new Map(prev)
      next.delete(number)
      return next
    }),
  }), [])

  const items = useMemo(
    () => [...footnotes.entries()].sort((a, b) => a[0] - b[0]),
    [footnotes],
  )

  return (
    <FootnoteApiContext.Provider value={api}>
      <FootnoteItemsContext.Provider value={items}>
        {children}
      </FootnoteItemsContext.Provider>
    </FootnoteApiContext.Provider>
  )
}

interface FootnoteProps {
  children: React.ReactNode
}

export function Footnote({ children }: FootnoteProps) {
  const [isVisible, setIsVisible] = useState(false)
  const reactId = useId()
  const api = useContext(FootnoteApiContext)

  const number = api ? api.getNumber(reactId) : null
  const id = number ?? reactId

  useEffect(() => {
    if (!api || number == null) return
    api.register(number, children)
    return () => api.unregister(number)
  }, [api, number, children])

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

export function FootnoteList() {
  const items = useContext(FootnoteItemsContext)
  if (items.length === 0) return null

  return (
    <section className="footnote-list" aria-label="각주">
      <h2>각주</h2>
      <ul className="footnote-items">
        {items.map(([number, content]) => (
          <li key={number}>
            <span className="footnote-item-marker">{number}.</span>
            <span className="footnote-item-text">{content}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Footnote