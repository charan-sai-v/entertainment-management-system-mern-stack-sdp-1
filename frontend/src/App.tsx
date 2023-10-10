import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Routes
import AdminPrivateRoute from './components/AdminPrivateRoute'
import EmployeePrivateRoute from './components/EmployeePrivateRoute'
import OrganizerPrivateRoute from './components/OrganizerPrivateRouter'
import UserPrivateRoute from './components/UserPrivateRoute'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminViewEmployees from './pages/admin/AdminViewEmployees'
import AdminAddEmployee from './pages/admin/AdminAddEmployee'

import EmployeeLogin from './pages/employee/EmployeeLogin'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import EmployeeViewEvents from './pages/employee/EmployeeViewEvents'
import EmployeeEventById from './pages/employee/EmployeeEventById'

import OrganizerDashboard from './pages/organizer/OrganizerDashboard'
import OrganizerAddEvent from './pages/organizer/OrganizerAddEvent'
import OrganizerEvents from './pages/organizer/OrganizerEvents' 
import OrganizerEventById from './pages/organizer/OrganizerEventById'

import UserEventById from './pages/user/UserEventById'
import OrganizerEventEdit from './pages/organizer/OrganizerEventEdit'
import UserDashboard from './pages/user/UserDashboard'
import UserBookings from './pages/user/UserBookings'


export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
          <Route path='/events' element={<EmployeeViewEvents />} />
          <Route path='/event/:id' element={<EmployeeEventById />} />
        </EmployeePrivateRoute>
      </BrowserRouter>

      <BrowserRouter basename='/organizer'>
        <OrganizerPrivateRoute>
          <Route path='/dashboard' element={<OrganizerDashboard />} />
          <Route path='/events' element={<OrganizerEvents />} />
          <Route path='/event/add' element={<OrganizerAddEvent />} />
          <Route path='/event/:id' element={<OrganizerEventById />} />
          <Route path='/event/edit/:id' element={<OrganizerEventEdit />} />
        </OrganizerPrivateRoute>
      </BrowserRouter>

      <BrowserRouter basename='/user'>
        <UserPrivateRoute>
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/event/:id' element={<UserEventById />} />
          <Route path='/bookings' element={<UserBookings />} />
        </UserPrivateRoute>
      </BrowserRouter>

      
    </ThemeProvider>
  )
}
