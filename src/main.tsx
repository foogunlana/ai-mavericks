import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';
import './theme.css';
import App from './App';
import { ClerkProvider } from './auth/ClerkProvider';

// The app is served at the domain root (Cloudflare Pages), so no router basename.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
