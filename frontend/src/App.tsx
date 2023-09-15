import React from 'react'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'


export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
