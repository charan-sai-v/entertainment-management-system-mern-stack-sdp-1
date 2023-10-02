import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrganizerDashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    // const id = localStorage.getItem('id')
    if (!token || role!=='organizer') {
      navigate('/login')
    }
  }, [navigate])
  return (
    <div>OrganizerDashboard</div>
  )
}
