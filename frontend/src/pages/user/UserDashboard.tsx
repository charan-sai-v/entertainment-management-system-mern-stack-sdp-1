
import React, { useEffect } from 'react'

import serverUrl from '@/lib/serverUrl'
import { UserLayout } from '@/components/UserLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Event from '@/models/Event'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'





export default function UserDashboard() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [category, setCategory] = React.useState('all')
  const server_url = serverUrl()

  const fetchEventsByCategory = async (category: string) => {
    if (category === 'all') {
      fetchEvents()
      return;
    }
	try {
		const res = await fetch(`${server_url}/user/dashboard/${category}`, {
		headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
		}
        })
        const data = await res.json()
        setEvents(data)
        setLoading(false)
    } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
    }
}

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

  

  useEffect(() => {
    fetchEvents()
  }, [])

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
          {/* <h1 className='text-2xl font-bold'>Dashboard</h1> */}
          <div>
			<RadioGroup
				onValueChange={(value) => {
					setCategory(value)
					fetchEventsByCategory(value)
				} }
				value={category}
				aria-labelledby="categories"
				className="flex flex-wrap items-center justify-center gap-4 p-4 dark:border-gray-800"
				>
				<h3 className="w-full text-center font-semibold leading-none" id="categories">
					Categories
				</h3>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="all">
					<RadioGroupItem className="peer sr-only" id="all" value="all" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>🌐</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					All
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="music">
					<RadioGroupItem className="peer sr-only" id="music" value="music" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>🎵</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Music
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="food">
					<RadioGroupItem className="peer sr-only" id="food" value="food" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>🍔</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Food
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="business">
					<RadioGroupItem className="peer sr-only" id="business" value="business" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>💼</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Business
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="games">
					<RadioGroupItem className="peer sr-only" id="games" value="games" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>🎮</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Games
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="sports">
					<RadioGroupItem className="peer sr-only" id="sports" value="sports" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>⚽</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Sports
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="technology">
					<RadioGroupItem className="peer sr-only" id="technology" value="technology" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>💻</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Technology
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="arts">
					<RadioGroupItem className="peer sr-only" id="arts" value="arts" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>🎨</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Arts
					</span>
				</Label>
				<Label className="aspect-square flex flex-col w-20 items-center gap-2 cursor-pointer" htmlFor="others">
					<RadioGroupItem className="peer sr-only" id="others" value="others" />
					<div className="aspect-content flex-1 border border-gray-200 transition-colors rounded-lg peer-aria-checked:border-gray-900 peer-aria-checked:ring-gray-900 ring-1 ring-transparent w-full text-gray-500 flex items-center justify-center peer-aria-checked:text-gray-900 dark:border-gray-800 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:ring-gray-50 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					<span>🔮</span>
					</div>
					<span className="text-xs transition-colors text-gray-500 peer-aria-checked:font-semibold peer-aria-checked:text-gray-900 dark:text-gray-400 dark:peer-aria-checked:text-gray-50">
					Others
					</span>
				</Label>
			</RadioGroup>
          </div>
        
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
                    Category:
                    <Badge className='ml-2'>{event.category}</Badge>
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
