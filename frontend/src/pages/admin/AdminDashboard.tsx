// import { Overview } from '@/components/overview'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/AdminNav'
import React, { useEffect } from 'react'
// navigation from react-router-dom
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  React.Component.prototype.componentDidMount = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
    }
  }

  useEffect(
    () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/admin/login')
      }
      const fetchUser = async() => {
        const data = await fetch('http://localhost:8080/admin/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const response = await data.json()
        console.log(response)
      }
      fetchUser()

    }, []
  )
  
  return (
    <div className=''>
     <AdminNav>

     </AdminNav>
    </div>
  )
}
