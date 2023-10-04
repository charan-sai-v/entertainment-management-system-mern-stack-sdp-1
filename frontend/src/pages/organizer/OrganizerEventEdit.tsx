import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


type Event = {
  _id: string
  name: string
  description: string
  image: string
  start_date: string
  end_date: string
  location: string
  price: number
  capacity: number
  category: string
  organizerId: string
  organizerName: string
}

export default function OrganizerEventEdit() {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = React.useState(true)
  const [event, setEvent] = React.useState<Event | null>(null)
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/organizer/event/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        console.log(data)
        setEvent(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  if (loading) {
    return <div className='flex justify-center items-center'>
      <span className='loading loading-spinner text-primary'></span>
    </div>
  }

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div>

    </div>
  )
}
