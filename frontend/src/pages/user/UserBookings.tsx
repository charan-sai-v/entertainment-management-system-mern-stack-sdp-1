// write the code for UserBookings component here

import React from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '@/components/NavBar';
import P from '@/assets/p.jpg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Event = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string[];
  organizer: string;
  start_date: string;
  end_date: string;
  start_registration: string;
  end_registration: string;
  location: string;
  no_of_participants: number;
  created_at: string;
  updated_at: string;
};


export default function UserDashboard() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:8080/user/dashboard', {
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
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/user/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message);
      }
      const newEvents = events.filter((event) => event._id !== id);
      setEvents(newEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl font-bold">My Bookings</h1>
        <div className="flex flex-col items-center mt-8">
          {loading && (
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold">Loading...</p>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold">Error</p>
            </div>
          )}
          {!loading && !error && (
            <div className="flex flex-col items-center">
              {events.length === 0 && (
                <div className="
                flex flex-col items-center
                bg-white shadow-md rounded-md
                w-96 p-4
                ">
                  <p className="text-2xl font-bold">No Bookings</p>
                  <img src={P} alt="No Bookings" className="w-96" />
                </div>
                )}
                {events.map((event) => (
                    <div className="flex flex-col items-center" key={event._id}>
                        <div className="
                        flex flex-col items-center
                        bg-white shadow-md rounded-md
                        w-96 p-4
                        ">
                        <p className="text-2xl font-bold">{event.name}</p>
                        <p className="text-xl font-bold">{event.description}</p>
                        <p className="text-xl font-bold">{event.price}</p>
                        <p className="text-xl font-bold">{event.location}</p>
                        <p className="text-xl font-bold">{event.start_date}</p>
                        <p className="text-xl font-bold">{event.end_date}</p>
                        <p className="text-xl font-bold">{event.start_registration}</p>
                        <p className="text-xl font-bold">{event.end_registration}</p>
                        <p className="text-xl font-bold">{event.no_of_participants}</p>
                        <p className="text-xl font-bold">{event.category}</p>
                        <p className="text-xl font-bold">{event.organizer}</p>
                        <p className="text-xl font-bold">{event.created_at}</p>
                        <p className="text-xl font-bold">{event.updated_at}</p>
                        <div className="flex flex-row items-center">
                            <Link to={`/event/${event._id}`}>
                            <Button
                                type="button"
                                className="bg-green-500 hover:bg-green-600"
                            >
                                View
                            </Button>
                            </Link>
                            <Button
                            type="button"
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(event._id)}
                            >
                            Delete
                            </Button>
                        </div>
                        </div>
                    </div>
                    ))}
            </div>
            )}
        </div>
        </div>
    </div>
    );
}
