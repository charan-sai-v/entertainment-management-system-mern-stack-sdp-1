
import React, { useEffect } from 'react'

import serverUrl from '@/lib/serverUrl'
import { UserLayout } from '@/components/UserLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Event from '@/models/Event'
import { Badge } from '@/components/ui/badge'




export default function UserDashboard() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const server_url = serverUrl()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${server_url}/user/dashboard`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await res.json()
        // if (res.status !== 200) {
        //   localStorage.removeItem('token')
        //   localStorage.removeItem('id')
        //   window.location.href = '/login'
        // }
        console.log(data)
        setEvents(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchEvents()
  }
  , [server_url])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl font-bold text-red-500'>Something went wrong</h1>
      </div>
    )
  }

  return (
    <div>
      <UserLayout>
        <div className='px-10'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10'>
			{events.map((event) => (
        <a href={`/event/${event._id}`} key={event._id}>
          <div className="card card-compact shadow-xl" key={event._id}>
            <Card>
              <figure><img src={event.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">{event.name}</h2>
                <p>{event.description}</p>
                <div>
                <span className="text-gray-700 dark:text-gray-400 text-base">
                    Location:
                    <Badge className='ml-2'>{event.location}</Badge>
                  </span>
                </div>
                <div className="card-actions justify-end">
                <Button className='w-fit'>
                  ₹ {event.price}
                </Button>
                </div>
              </div>
            </Card>
          </div>
        </a>
			))}
			</div>

        </div>
      </UserLayout>
    </div>
  )
}
