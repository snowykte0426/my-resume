import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/pretendard/400.css'  // Regular
import '@fontsource/pretendard/500.css'  // Medium
import '@fontsource/pretendard/600.css'  // Semi-bold
import '@fontsource/pretendard/700.css'  // Bold
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
