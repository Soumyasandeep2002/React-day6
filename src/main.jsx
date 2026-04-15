import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from "./context/AppContext";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </AppProvider>
  </StrictMode>,
)
