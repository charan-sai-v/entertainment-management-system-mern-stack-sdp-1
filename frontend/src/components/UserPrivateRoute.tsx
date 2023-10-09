

import { Routes} from 'react-router-dom'

export default function UserPrivateRoute({children}: {children: React.ReactNode}) {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/login'
    return null
  }
  return (
    <Routes>
      {children}
    </Routes>
  )
}