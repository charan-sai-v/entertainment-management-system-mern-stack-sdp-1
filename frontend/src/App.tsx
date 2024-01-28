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
import UserVerify from './pages/user/UserVerify'
import UserProfile from './pages/user/UserProfile'
import UserPaymentCheck from './pages/user/UserPaymentCheck'
import OrganizerSetting from './pages/organizer/OrganizerSetting'
import UserForgotPassword from './pages/user/UserForgotPassword'
import OrganizerForgotPassword from './pages/organizer/OrganizerForgotPassword'


export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route path='/login' element={<AdminLogin />} />
          {/* Admin Private Routes */}
          <Route path='/admin/dashboard' element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute> } />
          <Route path='/admin/employee/add' element={<AdminPrivateRoute><AdminAddEmployee /></AdminPrivateRoute> } />
          <Route path='/admin/employees' element={<AdminPrivateRoute><AdminViewEmployees /></AdminPrivateRoute>} />


          {/* Employee Routes */}
          <Route path='/login' element={<EmployeeLogin />} />
          {/* Employee Private Routes */}
          <Route path='/employee/dashboard' element={<EmployeePrivateRoute><EmployeeDashboard /></EmployeePrivateRoute> } />
          <Route path='/employee/events' element={<EmployeePrivateRoute><EmployeeViewEvents /></EmployeePrivateRoute>} />
          <Route path='/employee/event/:id' element={<EmployeePrivateRoute><EmployeeEventById/> </EmployeePrivateRoute> } />

          {/* Organizer Routes */}
          <Route path='/organizer/forgot-password' element={<OrganizerForgotPassword /> } />
          {/* Organizer Private Routes */}
          <Route path='/organizer/dashboard' element={<OrganizerPrivateRoute><OrganizerDashboard /></OrganizerPrivateRoute> } />
          <Route path='/organizer/events' element={<OrganizerPrivateRoute><OrganizerEvents /></OrganizerPrivateRoute>} />
          <Route path='/organizer/event/add' element={<OrganizerPrivateRoute><OrganizerAddEvent /></OrganizerPrivateRoute>} />
          <Route path='/organizer/event/:id' element={<OrganizerPrivateRoute><OrganizerEventById /></OrganizerPrivateRoute>} />
          <Route path='/organizer/event/edit/:id' element={<OrganizerPrivateRoute><OrganizerEventEdit /></OrganizerPrivateRoute>} />
          <Route path='/organizer/settings' element={<OrganizerPrivateRoute><OrganizerSetting /></OrganizerPrivateRoute>} />

          {/* User Routes */}
          <Route path='/forgot-password' element={<UserForgotPassword /> } /> 
          <Route path='/verify/:token' element={<UserVerify />} />
          {/* User Private Routes */}
          <Route path='/dashboard' element={<UserPrivateRoute><UserDashboard /></UserPrivateRoute> } />
          <Route path='/event/:id' element={<UserPrivateRoute><UserEventById /></UserPrivateRoute>} />
          <Route path='/bookings' element={<UserPrivateRoute><UserBookings /></UserPrivateRoute>} />
          <Route path='/payment/success/:bookingId' element={<UserPrivateRoute><UserPaymentCheck /></UserPrivateRoute>} />
          <Route path='/payment/cancel/:bookingId' element={<UserPrivateRoute><UserPaymentCheck /></UserPrivateRoute>} />
          <Route path='/profile' element={<UserPrivateRoute><UserProfile /></UserPrivateRoute>} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
