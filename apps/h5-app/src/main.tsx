/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '@/app'
import '@/assets/index.scss'
import '@/locales'
import GlobalStyles from '@/styles/GlobalStyles'
import { TRPCReactProvider } from './providers'

enableMapSet()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <TRPCReactProvider>
      <Router>
        <App />
      </Router>
    </TRPCReactProvider>
  </React.StrictMode>,
)
