

import { Navigate} from 'react-router-dom'

export default function UserPrivateRoute({children}: {children: React.ReactNode}) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to={'/login'} />
  }
  return children;
}