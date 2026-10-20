import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento raiz não encontrado.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
