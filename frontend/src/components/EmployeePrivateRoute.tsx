

import { Navigate, Routes  } from 'react-router-dom'

export default function EmployeePrivateRoute({children}: {children: React.ReactNode}) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  if (!token && role !=='employee' ) {
    return <Navigate to='/login' />
  }
  return (
    <Routes>
      {children}
    </Routes>
  )
}