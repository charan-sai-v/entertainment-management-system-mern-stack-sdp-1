import OrganizerNav from '@/components/OrganizerNav'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

export default function OrganizerEventById() {
   const { id } = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState<Event | null>(null)

    React.useEffect(() => {
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

    const formatDate = (date: string | undefined) => {
      const dataObject = new Date(date as string)
      const year = dataObject.getFullYear()
      const month = dataObject.toLocaleString('default', { month: 'short' })
      const day = dataObject.getDate()
      return `${day}-${month}-${year}`
    }

    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
          <span className='loading loading-spinner text-primary'></span>
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
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Grid2X2 className='inline-block -mt-0.5 w-4 h-4 mr-1' />
                    Category
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event?.category}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Calendar className='inline-block w-4 h-4 mr-1' />
                    Start Date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event?.start_date)}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Calendar className='inline-block w-4 h-4 mr-1 -mt-0.5' />
                    End Date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event?.end_date)}
                  </p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
            </CardContent>
            <CardFooter className='justify-between'>
              <Link to={`/event/edit/${event?._id}`}>
                <Button variant={'secondary'} size={'lg'}>Edit</Button>
              </Link>
                <Button variant={'destructive'} size={'lg'}>Delete</Button>
            </CardFooter>
          </Card>
        </div>
      </OrganizerNav>
    </div>
  )
}
