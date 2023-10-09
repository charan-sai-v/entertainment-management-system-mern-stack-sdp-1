import React, { useEffect } from 'react'
import OrganizerNav from '@/components/OrganizerNav'
import { 
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody
 } from '@/components/ui/table'
 import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { MoreVerticalIcon, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Event = {
  _id: number
  name: string
  description: string
  image: string
  start_date: string
  end_date: string
  location: string
  price: number
  capacity: number
  category: string
  organizerId: number
  organizerName: string
}

export default function OrganizerEvents() {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [events, setEvents] = React.useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([])
  const [searchValue, setSearchValue] = React.useState('')

  const navigate = useNavigate()


  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/organizer/events', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (response.status !== 200) {
          navigate('/login')
        }
        console.log(data)
        setEvents(data)
        setFilteredEvents(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    getEvents()
  }, [navigate])

  // formatted date - 05-OCT-2023
  const formatDate = (date: string) => {
    const dataObject = new Date(date)
    const year = dataObject.getFullYear()
    const month = dataObject.toLocaleString('default', { month: 'short' })
    const day = dataObject.getDate()
    return `${day}-${month}-${year}`
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    const filteredEvents = events.filter((event) => {
      const searchRegex = new RegExp(e.target.value, 'gi')
      return event.name.match(searchRegex)
    })
    setFilteredEvents(filteredEvents)
  }



  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8080/organizer/event/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
      })
      const data = await response.json()
      if (response.status===200){
        toast.success(data.message)
        const newEvents = events.filter((event) => event._id !== id)
        setEvents(newEvents)
        setFilteredEvents(newEvents)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  }
  if (error) {
    return <h1>Error...</h1>
  }
  return (
    <div>
      <OrganizerNav>
      <div className=' px-4'>
        <div className='mt-10 space-y-5'>
          <h1 className='text-2xl font-bold'>Events</h1>
          <div className='flex justify-between items-center'>
            <Link to={'/event/add'}><Button size={'lg'}>Add Event</Button></Link>
            <div className='relative'>
              <Input
                value={searchValue}
                onChange={handleSearch}
                type='text'
                placeholder='Search'
                className='pl-10'
              />
              <Search className='absolute top-2 left-2' />
            </div>
          </div>
        <Table>
          <TableCaption>Events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Event Start Date</TableHead>
              <TableHead>Event End Date</TableHead>
              <TableHead>Event Category</TableHead>
              <TableHead>Event Price</TableHead>
              <TableHead>Event Capacity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length ? (
              filteredEvents.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{formatDate(event.start_date)}</TableCell>
                  <TableCell>{formatDate(event.end_date)}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>{event.price}</TableCell>
                  <TableCell>{event.capacity}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVerticalIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link to={`/event/${event._id}`} >
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </Link>
                        <Link to={`/event/edit/${event._id}`}>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-red-500 focus:bg-red-500 hover:bg-red-500 focus:text-white hover:text-white'
                        onClick={() => handleDelete(event._id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No Events Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
     
    </div>
      </OrganizerNav>
      <Toaster />
    </div>
   
  )
}
