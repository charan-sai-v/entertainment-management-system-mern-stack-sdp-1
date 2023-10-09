import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OrganizerNav from '@/components/OrganizerNav'

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
    <div>
      <OrganizerNav>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Organizer Dashboard</h1>
        </div>
      </OrganizerNav>
    </div>
  )
}
