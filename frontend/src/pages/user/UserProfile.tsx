
import { UserLayout } from '@/components/UserLayout'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import User from '@/models/User'
import React, { useEffect } from 'react'

export default function UserProfile() {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [user, setUser] = React.useState<User>()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8080/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await res.json()
                setUser(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(true)
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>
            
            

  return (
    <div>
        <UserLayout>
            <div className='p-10'>
                {/* <h1>User Profile</h1> */}
                <div className='flex items-center justify-center'>
                    <Card className='w-full max-w-2xl'>
                        <CardHeader>
                            <h1 className='text-2xl font-bold text-center'>User Profile</h1>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-2 gap-4'>
                                <p className=''>
                                    <span className='font-bold'>Name: </span> {user?.name}
                                </p>
                                <p>
                                    <span className='font-bold'>Email: </span> {user?.email}
                                </p>
                                <p>
                                    <span className='font-bold'>Gender: </span> {user?.gender}
                                </p>
                                <p>
                                    <span className='font-bold'>Phone: </span> {user?.phone}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </UserLayout>
    </div>
  )
}
