import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';
import './theme.css';
import App from './App';
import { ClerkProvider } from './auth/ClerkProvider';

// react-router basename: strip the trailing slash from Vite's BASE_URL
// ('/ai-mavericks/' -> '/ai-mavericks'; '/' -> '' = no basename).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
