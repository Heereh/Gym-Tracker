import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defaultSystem, ChakraProvider } from '@chakra-ui/react';
import App from './App.tsx';
import './styles/reset.css';
import './styles/globals.css';
/* import { BrowserRouter } from 'react-router'; */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
