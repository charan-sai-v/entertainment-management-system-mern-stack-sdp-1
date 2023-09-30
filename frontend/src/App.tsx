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

import AdminPrivateRoute from './components/AdminPrivateRoute'
import EmployeeLogin from './pages/employee/EmployeeLogin'
import EmployeePrivateRoute from './components/EmployeePrivateRoute'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'


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
         
        </Routes>
      </BrowserRouter>

      <BrowserRouter basename='/admin'>
        <Routes>
          <Route path='/login' element={<AdminLogin />} />
        </Routes>
        <AdminPrivateRoute>
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/employee/add' element={<AdminAddEmployee />} />
            <Route path='/employees' element={<AdminViewEmployees />} />
          </AdminPrivateRoute>
      </BrowserRouter>

      <BrowserRouter basename='/employee'>
        <Routes>
          <Route path='/login' element={<EmployeeLogin />} />
        </Routes>
        <EmployeePrivateRoute>
          <Route path='/dashboard' element={<EmployeeDashboard />} />
        </EmployeePrivateRoute>
      </BrowserRouter>

    </ThemeProvider>
  )
}
