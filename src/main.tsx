import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { installGlobalErrorListeners } from './errorLogger'
import { ErrorBoundary } from './components/ErrorBoundary'

// Install global error capture listeners as early as possible
// (before React mount so even initialization errors are caught)
installGlobalErrorListeners();

// Force manual scroll restoration at top-level before DOM renders
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

