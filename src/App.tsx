import './App.css'
import './markdown.css'
import Resume from './content/resume.mdx'
import ThemeToggle from './components/ThemeToggle'
import PrintButton from './components/PrintButton'
import { FootnoteProvider, FootnoteList } from './components/Footnote'

function App() {
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