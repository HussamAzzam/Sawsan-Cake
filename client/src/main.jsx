import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "@fontsource/changa/200.css";
import "@fontsource/changa/300.css";
import "@fontsource/changa/400.css";
import "@fontsource/changa/500.css";
import "@fontsource/changa/600.css";
import "@fontsource/changa/700.css";
import "@fontsource/changa/800.css";
import "@fontsource/lalezar/400.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
