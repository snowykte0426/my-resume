import './App.css'
import './markdown.css'
import Resume from './content/resume.mdx'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <>
      <ThemeToggle />
      <div className="mdx-content">
        <Resume />
      </div>
    </>
  )
}

export default App
