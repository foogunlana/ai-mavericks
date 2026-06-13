import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './theme.css';
import App from './App';
import { ClerkProvider } from './auth/ClerkProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <App />
    </ClerkProvider>
  </StrictMode>,
);
