import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// biome-ignore lint/style/noNonNullAssertion: we know it exists for sure
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <div>
      <h1>Hello, World!</h1>
    </div>
  </StrictMode>,
)
