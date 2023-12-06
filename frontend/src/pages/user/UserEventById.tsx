import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import { MapPin, Calendar, Users, Grid2X2, IndianRupee, Plus, Minus} from "lucide-react"
import {useParams} from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Event from "@/models/Event";
import { UserLayout } from "@/components/UserLayout";

export default function UserEventById() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false)

  const [tickets, setTickets] = useState(1)

  const bookEvent = async () => {
    if (tickets === 0) return alert('Please select number of tickets')
    try {
      const res = await fetch(`http://localhost:8080/user/book-event/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({tickets})
      })
      const data = await res.json()
      console.log(data)
      if (res.status === 200) {
        alert('Event Booked')
        window.location.href = '/user/dashboard'
      } else {
        alert('Something went wrong')
      }
    } catch (error) {
      console.log(error)
      alert('Something went wrong')
    }
  }


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/event/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await res.json()
        if (data.message === 'Already booked') {
          setIsAlreadyBooked(true)
        }
        console.log(data)
        setEvent(data.event)
        console.log(isAlreadyBooked)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchEvent()
  }
  , [id, isAlreadyBooked])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl text-red-500'>Something went wrong</h1>
      </div>
    )
  }

  const formatDate = (date: string | undefined) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toDateString()
  }


  return (
    <div>
        <UserLayout>
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
                    <p className="text-sm  text-muted-foreground">
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
                      {event?.capacity }
                    </p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
                      Registration Start Date
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event?.start_registration)}
                    </p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
                {
                  event?.no_of_participants === event?.capacity ? (
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <MapPin className='inline-block w-4 h-4 mr-1 -mt-0.5' />
                          Status
                        </p>
                        <p className="text-sm text-red-500">
                          Event Full
                        </p>
                      </div>
                    </div>
                  ) : isAlreadyBooked ? (
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <MapPin className='inline-block w-4 h-4 mr-1 -mt-0.5' />
                          Status
                        </p>
                        <p className="text-sm text-red-500">
                          Already Booked
                        </p>
                      </div>
                    </div>
                  ) : null
                }
                <div className="space-y-1">
                  <Label htmlFor="tickets" className="mr-5">Tickets (Max 5)</Label>
                  <Button size={'icon'} variant='destructive' onClick={() => setTickets(tickets - 1)} disabled={tickets === 1}>
                    <Minus size={16} className="mr-1" />
                  </Button>
                  <p className='inline-block w-10 text-center'>{tickets}</p>
                  <Button  variant='secondary' size={'icon'} onClick={() => setTickets(tickets + 1)} disabled={tickets === 5}>
                    <Plus className=' w-4 h-4 mr-1' />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className='justify-between'>
                { event?.no_of_participants === event?.capacity ? (
                  <Button disabled>Event Full</Button>
                ) : isAlreadyBooked ? (
                  <Button disabled variant={"secondary"}>Already Booked</Button>
                ) : (
                  <Button onClick={bookEvent}>Book Event</Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </UserLayout>
    </div>
  )
}
