import React, { useEffect } from 'react'
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

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { MoreVerticalIcon } from 'lucide-react'
import OrganizerNav from '@/components/OrganizerNav'

type Event = {
  _id: string
  name: string
  startDate: string
  endDate: string
  location: string
  category: string
  price: number
  capacity: number
  is_active: boolean
  is_approved: boolean
  is_rejected: boolean
  is_cancelled: boolean
  is_deleted: boolean
  is_full: boolean
}


export default function EmployeeViewEvents() {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [events, setEvents] = React.useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = React.useState<Event[]>([])
  const [searchValue, setSearchValue] = React.useState('')
  // const navigate = useNavigate()

  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/employee/events', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (response.status !== 200) {
          // navigate('/login')
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
  }, [])

  // formatted date - 05-OCT-2023
  // const formatDate = (date: string) => {
  //   const dataObject = new Date(date)
  //   const year = dataObject.getFullYear()
  //   const month = dataObject.toLocaleString('default', { month: 'short' })
  //   const day = dataObject.getDate()
  //   return `${day}-${month}-${year}`
  // }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    const filteredEvents = events.filter((event) =>
      event.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredEvents(filteredEvents)
  }


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
        <h1 className='text-2xl font-semibold text-red-500'>Something went wrong</h1>
      </div>
    )
  }

  return (
    <div>
      <OrganizerNav>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Events</h1>
          <div className='flex items-center'>
            <Input
              placeholder='Search events'
              value={searchValue}
              onChange={handleSearch}
              type='search'
              className='pl-10'
            />

          </div>
        </div>
        <Table>
          <TableCaption>Events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approved Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>{event.capacity}</TableCell>
                <TableCell>
                  {event.is_active ? (
                    <span className='text-green-500'>Active</span>
                  ) : (
                    <span className='text-red-500'>Inactive</span>
                  )}
                </TableCell>
                <TableCell>
                  {event.is_approved ? (
                    <span className='text-green-500'>Approved</span>
                  ) : (
                    <span className='text-red-500'>Not Approved</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size={'icon'}>
                        <MoreVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='center'>
                      <DropdownMenuItem>
                        <Link to={`/event/${event._id}`}>
                          <DropdownMenuLabel>View</DropdownMenuLabel>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to={`/events/${event._id}/edit`}>
                          <DropdownMenuLabel>Edit</DropdownMenuLabel>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DropdownMenuLabel>Delete</DropdownMenuLabel>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </OrganizerNav>
    </div>
  )
}
