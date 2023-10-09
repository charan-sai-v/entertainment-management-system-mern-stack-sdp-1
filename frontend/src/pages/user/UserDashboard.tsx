
import React, { useEffect } from 'react'

import NavBar from '@/components/NavBar'
import P from '@/assets/p.jpg'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

type Event = {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string[]
  organizer: string
  start_date: string
  end_date: string
  start_registration: string
  end_registration: string
  location: string
  no_of_participants: number
  created_at: string
  updated_at: string
}


export default function UserDashboard() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:8080/user/dashboard', {
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
  , [])

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
      <NavBar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

          <div className='p-8'>
            
            <h2 className='text-2xl font-bold '>Featured</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-4 mt-4'>
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={P} alt="Shoes" /></figure>
                <div className="card-body ">
                  <h3 className="card-title font-semibold">Mega Smart Event</h3>
                  <div className='card-actions justify-between'>
                    <div className='justify-start my-auto'>
                      <div className="badge badge-outline mr-2">Music</div> 
                      <div className="badge badge-outline">Dance</div>
                    </div>
                    <div className='justify-end'>
                      <Button>₹ 100</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={P} alt="Shoes" /></figure>
                <div className="card-body ">
                  <h3 className="card-title font-semibold">Mega Smart Event</h3>
                  <div className='card-actions justify-between'>
                    <div className='justify-start my-auto'>
                      <div className="badge badge-outline mr-2">Music</div> 
                      <div className="badge badge-outline">Dance</div>
                    </div>
                    <div className='justify-end'>
                      <Button >₹ 100</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={P} alt="Shoes" /></figure>
                <div className="card-body ">
                  <h3 className="card-title font-semibold">Mega Smart Event</h3>
                  <div className='card-actions justify-between'>
                    <div className='justify-start my-auto'>
                      <div className="badge badge-outline mr-2">Music</div> 
                      <div className="badge badge-outline">Dance</div>
                    </div>
                    <div className='justify-end'>
                      <Button>₹ 100</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={P} alt="Shoes" /></figure>
                <div className="card-body ">
                  <h3 className="card-title font-semibold">Mega Smart Event</h3>
                  <div className='card-actions justify-between'>
                    <div className='justify-start my-auto'>
                      <div className="badge badge-outline mr-2">Music</div> 
                      <div className="badge badge-outline">Dance</div>
                    </div>
                    <div className='justify-end'>
                      <Button>₹ 100</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className='text-2xl font-bold my-6'>All Events</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-4 mt-4'>
              {events.map((event) => (
                <Link to={`/event/${event._id}`} key={event._id}>
                <div className="card card-compact bg-base-100 shadow-xl">
                  <figure><img src={event.image} alt={event.name} className='object-cover' /></figure>
                  <div className="card-body ">
                    <h3 className="card-title font-semibold">{event.name}</h3>
                    <div className='card-actions justify-between'>
                      <div className='justify-start my-auto'>
                        <div className="badge badge-outline mr-2">{event.category}</div>
                      </div>
                      <div className='justify-end'>
                        <Button>₹ {event.price}</Button>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
              </div>
          </div>
          
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        
        </div>
      </div>
    </div>
  )
}
