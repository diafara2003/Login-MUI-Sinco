import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginPages from './Pages/Login/views/LoginPages';
import { SincoTheme } from '@sinco/react';
import { ThemeProvider } from '@emotion/react'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={SincoTheme}>
      <LoginPages />
    </ThemeProvider>
  </React.StrictMode>,
)
