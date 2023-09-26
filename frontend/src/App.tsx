import React from 'react'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashbaord from './pages/user/UsersDashboard'
import UserEventById from './pages/user/UserEventById'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAddEmployee from './pages/admin/AdminAddEmployee'
import AdminViewEmployees from './pages/admin/AdminViewEmployees'


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
          <Route path='/admin/employee/add' element={<AdminAddEmployee />} />
          <Route path='/admin/employees' element={<AdminViewEmployees />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
