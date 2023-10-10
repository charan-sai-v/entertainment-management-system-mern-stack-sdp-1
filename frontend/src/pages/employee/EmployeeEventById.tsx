import OrganizerNav from '@/components/OrganizerNav'
import React, { useState } from 'react'
import {
  Calendar,
  Grid2X2, IndianRupee, Users, MapPin
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useParams, useNavigate } from 'react-router-dom'


type Event = {
    _id: string
    name: string
    description: string
    image: string
    start_date: string
    end_date: string
    start_registration: string
    end_registration: string
    location: string
    price: number
    capacity: number
    no_of_participants: number
    category: string
    organizerId: string
    organizerName: string
    organizerCompany: string
    is_active: boolean
    is_approved: boolean
    is_rejected: boolean
    is_cancelled: boolean
    is_deleted: boolean
    is_full: boolean
}

export default function OrganizerEventById() {
   const { id } = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState<Event | null>(null)

    const navigate = useNavigate()

    React.useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employee/event/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()
                if (data.message === 'Unauthorized' || data.message === 'Invalid Token') {
                    navigate('/login')
                }
                console.log(data)
                setEvent(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        fetchEvent()
    }, [id, navigate])


    const handleApprove = async () => {
      try {
        const res = await fetch(`http://localhost:8080/employee/event/update/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          'is_approved': 'true'
        })
    });
        const data = await res.json()
        if (data.message === 'Unauthorized' || data.message === 'Invalid Token') {
          navigate('/login')
        }
        console.log(data)
        setEvent(data)
      } catch (error) {
        console.log(error)
      }
    }


    const handleReject = async () => {
      try {
        const res = await fetch(`http://localhost:8080/employee/event/update/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({'is_rejected': 'true'})
        })
        const data = await res.json()
        if (data.message === 'Unauthorized' || data.message === 'Invalid Token') {
          navigate('/login')
        }
        console.log(data)
        setEvent(data)
      } catch (error) {
        console.log(error)
      }
    }


    const formatDate = (date: string | undefined) => {
      const dataObject = new Date(date as string)
      const year = dataObject.getFullYear()
      const month = dataObject.toLocaleString('default', { month: 'short' })
      const day = dataObject.getDate()
      // format hour-minutes-pm/am
      const time = dataObject.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true })
      return `${day}-${month}-${year} ${time}`
    }

    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
          <p className='loading loading-spinner text-primary'></p>
        </div>
    }
  return (
    <div>
      <OrganizerNav>
        <div className='mt-10 container'>
          <Card className='flex flex-col justify-center w-full max-w-2xl mx-auto'>
            <CardHeader>
              <CardTitle>{event?.name}</CardTitle>
              <CardDescription>{event?.description}</CardDescription>
            </CardHeader>
            <CardContent className='grid '>
                <img src={event?.image} alt="" className='rounded-md mb-10' />           
              
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Grid2X2 className='inline-block -mt-0.5 w-4 h-4 mr-1' />
                    Category
                  </p>
                  <p className="text-sm  text-muted-foreground">
                    {event?.category}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Users className='inline-block w-4 h-4 mr-1' /> 
                    Capacity
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event?.capacity}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Users className='inline-block w-4 h-4 mr-1' /> 
                    Number of Participants
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event?.no_of_participants}
                  </p>
                </div>
              </div>


              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <IndianRupee className='inline-block w-4 h-4 mr-1' />
                    Price
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event?.price}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Calendar className='inline-block w-4 h-4 mr-1' />
                    Registration Start Date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event?.start_registration)}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Calendar className='inline-block w-4 h-4 mr-1' />
                    Registration End Date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event?.end_registration)}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Calendar className='inline-block w-4 h-4 mr-1' />
                    Event Start Date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event?.start_date)}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Calendar className='inline-block w-4 h-4 mr-1 -mt-0.5' />
                    Event End Date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event?.end_date)}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <MapPin className='inline-block w-4 h-4 mr-1 -mt-0.5' />
                    Location
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event?.location}
                  </p>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <p className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <MapPin className='inline-block w-4 h-4 mr-1 -mt-0.5' />
                    Location
                  </p>
                  {
                    event?.is_approved ? (
                        <p className='text-green-500'>Approved</p>
                    ) : event?.is_rejected ? (
                        <p className='text-red-500'>Rejected</p>
                    ) : event?.is_cancelled ? (
                        <p className='text-red-500'>Cancelled</p>
                    ) : event?.is_deleted ? (
                        <p className='text-red-500'>Deleted</p>
                    ) : event?.is_active ? (
                        <p className='text-green-500'>Active</p>
                    ) : (
                        <p className='text-red-500'>Inactive</p>
                    )
                  }
                </div>
              </div>
            </CardContent>
            <CardFooter className=''>
              {
                event?.is_approved===true ? (
                  <p className=''>Already Approved</p>
                ) : event?.is_rejected===true ? (
                  <p className=''>Already Approved</p>
                )
                : (
                    <div className='flex justify-between'>
                      <Button  size={'lg'} onClick={handleApprove}>Approve</Button>
                      <Button variant={'destructive'} onClick={handleReject} size={'lg'}>Reject</Button>
                    </div>
                )
              }
                
            </CardFooter>
          </Card>
        </div>
      </OrganizerNav>
    </div>
  )
}
