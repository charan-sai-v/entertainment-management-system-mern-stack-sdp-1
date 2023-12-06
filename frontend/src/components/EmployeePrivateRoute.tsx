

import { Navigate  } from 'react-router-dom'

export default function EmployeePrivateRoute({children}: {children: React.ReactNode}) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to={'/login'} />
  }
  return children;
}