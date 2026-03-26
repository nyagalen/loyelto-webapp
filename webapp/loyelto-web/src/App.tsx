import './App.css'
import LandingPage from './landing/LandingPage'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import './i18n'
import BusinessMain from './business-app/BusinessMain'
import ClientPage from './business-app/ClientPage'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './business-app/MainLayout'

import SignupMain from './BusinessSignup/SignupMain'
import { PrivyProvider } from '@privy-io/react-auth';
import AuthLayout from './AuthLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ENV } from './config/env'


function App() {
  return (
    <ErrorBoundary>
      <PrivyProvider appId={ENV.PRIVY_APP_ID}>
        <ThemeProvider theme={theme} defaultMode='light'>
          <Routes>
            <Route index path="/" element={<LandingPage />} />
            <Route element={<AuthLayout />}>
              <Route element={<MainLayout />} >
                <Route path="/client-page" element={<ClientPage />} />
                <Route path="/business-main" element={<BusinessMain />} />
              </Route>
            </Route>
            <Route path='/signup-main' element={<SignupMain />} />
            {/* You can also add a 404 Not Found page */}
            <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
          </Routes>

        </ThemeProvider>
      </PrivyProvider>
    </ErrorBoundary>
  )
}

export default App
