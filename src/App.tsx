import './App.css'
import './markdown.css'
import Resume from './content/resume.mdx'
import ThemeToggle from './components/ThemeToggle'
import { FootnoteProvider } from './components/Footnote'

function App() {
  return (
    <FootnoteProvider>
      <ThemeToggle />
      <div className="mdx-content">
        <Resume />
      </div>
    </FootnoteProvider>
  )
}

export default App
