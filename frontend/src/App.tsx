import React from 'react'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashbaord from './pages/user/Dashboard'
import UserEventById from './pages/user/UserEventById'


export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/dashboard' element={<Dashbaord />} />
          <Route path="/event/1" element={<UserEventById />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
