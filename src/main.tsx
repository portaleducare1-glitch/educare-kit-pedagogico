import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Fontes self-hosted (desempenho e funcionamento offline no wrapper nativo).
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';

import App from './App';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Elemento #root não encontrado.');

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
