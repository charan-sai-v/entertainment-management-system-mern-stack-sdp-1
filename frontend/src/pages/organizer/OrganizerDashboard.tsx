import { OrganizerLayout } from '@/components/organizer/OrganizerLayout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Event from '@/models/Event'
import { CalendarSearch, IndianRupee, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrganizerDashboard() {
  const navigate = useNavigate()
  const [mounting, setMounting] = useState(true)
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0)
  const [totalEvents, setTotalEvents] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalRegistrations, setTotalRegistrations] = useState(0)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [cancelledEvents, setCancelledEvents] = useState([])
  useEffect(() => {
    const fetchOrganizerDashboard = async () => {
      const res = await fetch('http://localhost:8080/organizer/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (res.status === 401) {
        navigate('/login')
      }
      if (res.status === 200) {
        const data = await res.json()
        setTotalEvents(data.totalEvents)
        setTotalRevenue(data.totalRevenue)
        setTotalRegistrations(data.totalRegistrations)
        setCurrentMonthRevenue(data.currentMonthRevenue)
        setUpcomingEvents(data.upcomingEvents)
        setPastEvents(data.pastEvents)
        setCancelledEvents(data.cancelledEvents)
        console.log(data)
      }
      setLoading(false)
    }
    fetchOrganizerDashboard()
    setMounting(false)
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    setCurrentMonth(month)
  }, [navigate])

  if (mounting) {
    return null
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div>
      <OrganizerLayout>
        <div className='px-8'>
          <h1>Organizer Dashboard</h1>
            <div className=''>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {currentMonth}&apos;s Revenue
                      </CardTitle>
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold flex items-center"><IndianRupee className="h-4 mr-2 w-4 text-muted-foreground" />
                      {currentMonthRevenue}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Events
                      </CardTitle>
                      <CalendarSearch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalEvents}</div>
                      {/* <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p> */}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Registrations
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalRegistrations}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold flex items-center">
                        <IndianRupee className="h-4 mr-2 w-4 text-muted-foreground" />
                        {totalRevenue}
                      </div>
                    </CardContent>
                  </Card>
              </div>
              <Separator className="my-8" />
              <div className=''>
                <h2 className='text-xl font-bold'>Upcoming Events</h2>
                {upcomingEvents.length === 0 && (
                    <div className='text-center  text-muted-foreground font-bold'>No upcoming events</div>
                  )}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  {upcomingEvents.map((event: Event) => (
                    <Card key={event._id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {event.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{(event.start_date.slice(0, 10)).split('-').reverse().join('-')}</div>
                        <Badge>
                          {event.location}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <Separator className="my-8" />
              <div className=''>
                <h2 className='text-xl font-bold'>Past Events</h2>
                {pastEvents.length === 0 && (
                    <div className='text-center  text-muted-foreground font-bold'>No past events</div>
                  )}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  {pastEvents.map((event: Event) => (
                    <Card key={event._id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {event.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{(event.start_date.slice(0, 10)).split('-').reverse().join('-')}</div>
                        <Badge>
                        {event.location}
                      </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <Separator className="my-8" />
              <div className=''>
                <h2 className='text-xl font-bold'>Cancelled Events</h2>
                {cancelledEvents.length === 0 && (
                    <div className='text-center  text-muted-foreground font-bold'>No cancelled events</div>
                  )}
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                  {cancelledEvents.map((event: Event) => (
                    <Card key={event._id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {event.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                      <div className="text-2xl font-bold">{(event.start_date.slice(0, 10)).split('-').reverse().join('-')}</div>
                      <Badge>
                        {event.location}
                      </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </OrganizerLayout>
    </div>
  )
}
