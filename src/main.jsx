import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from "./context/AppContext";
import { SnackbarProvider } from "notistack";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <SnackbarProvider maxSnack={3}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
      </SnackbarProvider>
    </AppProvider>
  </StrictMode>,
)
