// write the code for UserBookings component here

import React from 'react';


import Booking from '@/models/Booking';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserLayout } from '@/components/UserLayout';
import { Badge } from '@/components/ui/badge';

export default function UserDashboard() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:8080/user/all-bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        // if (res.status !== 200) {
        //   localStorage.removeItem('token')
        //   localStorage.removeItem('id')
        //   window.location.href = '/login'
        // }
        console.log(data);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // const handleDelete = async (id: string) => {
  //   try {
  //     const res = await fetch(`http://localhost:8080/user/bookings/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     });
  //     const data = await res.json();
  //     if (res.status !== 200) {
  //       throw new Error(data.message);
  //     }
  //     const newEvents = events.filter((event) => event._id !== id);
  //     setEvents(newEvents);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <UserLayout>
        <div className="px-10">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <div className="">
            {loading && (
              <div className="flex items-center justify-center ">
                <div className='loading loading-spinner'>

                </div>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold">Error</p>
              </div>
            )}
            {!loading && !error && (
              <Table>
                <TableHeader >
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Event Image</TableHead>
                    <TableHead>No of Tickets</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>               
                <TableBody>
                    {bookings.length > 0 && (
                    bookings.map((booking) => (
                        <TableRow>
                            <TableCell>{booking.event.name}</TableCell>
                            <TableCell>
                            <img src={booking.event.image} alt="" className="w-20 h-20 object-cover rounded" />
                            </TableCell>
                            <TableCell>{booking.no_of_tickets}</TableCell>
                            <TableCell>{booking.payment_amount}</TableCell>
                            <TableCell>{
                            (booking.payment_status === "paid") ? (
                              <Badge  variant={'success'} >Paid</Badge>
                            ) : (booking.payment_status === "pending") ? (
                              <Badge variant={'warning'} >Pending</Badge>
                            ) : (
                              <Badge variant={'destructive'} >Not Paid</Badge>
                            )
                            }</TableCell>
                        </TableRow>
                    ))
                )}
                </TableBody>
              </Table>
            )}
            <div className='mt-5'>
                {bookings.length === 0 && (
                  <p className=" text-center ">No bookings found</p>
                )}
            </div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
}

