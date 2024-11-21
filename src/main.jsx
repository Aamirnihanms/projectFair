import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './bootstrap.min1.css';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/AuthContext.jsx';
import ContextShare from './context/ContextShare.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <ContextShare>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextShare>
    </AuthContext>
  </StrictMode>
);
