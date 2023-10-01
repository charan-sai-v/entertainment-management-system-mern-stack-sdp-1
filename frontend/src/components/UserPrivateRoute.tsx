

import { Navigate, Routes  } from 'react-router-dom'

export default function UserPrivateRoute({children}: {children: React.ReactNode}) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to='/login' />
  }
  return (
    <Routes>
      {children}
    </Routes>
  )
}