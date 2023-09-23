import React from 'react'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashbaord from './pages/user/Dashboard'
import UserEventById from './pages/user/UserEventById'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'


export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/user/dashboard' element={<Dashbaord />} />
          <Route path="/user/event/:id" element={<UserEventById />} />

          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard /> } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
