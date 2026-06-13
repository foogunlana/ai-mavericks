import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';
import './theme.css';
import App from './App';
import { ClerkProvider } from './auth/ClerkProvider';

// react-router basename: use Vite's BASE_URL directly.
// Keeping the trailing slash (e.g. '/ai-mavericks/') ensures that
// <Navigate to="/" replace /> resolves to '/ai-mavericks/' (with trailing slash).
// When BASE_URL is '/' (root deployment), use '' so BrowserRouter has no basename.
const base = import.meta.env.BASE_URL;
const basename = base === '/' ? '' : base;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
