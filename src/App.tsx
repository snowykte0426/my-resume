import './App.css'
import './markdown.css'
import Resume from './content/resume.mdx'
import ThemeToggle from './components/ThemeToggle'
import PrintButton from './components/PrintButton'
import OpenSourceList from './components/OpenSourceList'
import { FootnoteProvider, FootnoteList } from './components/Footnote'
import { useHashRoute } from './hooks/useHashRoute'

function App() {
  const route = useHashRoute()

  if (route === '/open-source') {
    return (
      <>
        <ThemeToggle />
        <OpenSourceList />
      </>
    )
  }

  return (
    <FootnoteProvider>
      <PrintButton />
      <ThemeToggle />
      <div className="mdx-content">
        <Resume />
        <FootnoteList />
      </div>
    </FootnoteProvider>
  )
}

export default App
