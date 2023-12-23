import NavBar from '@/components/NavBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { absoluteUrl } from '@/lib/utils';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function UserVerify() {
    const { token } = useParams<{token: string}>()
    const [loading, setLoading] = React.useState(true)
    const [message, setMessage] = React.useState('')
    const [isSuccess, setIsSuccess] = React.useState(false)
    useEffect(() => {
        const checkToken = async () => {
            const res = await fetch(`${absoluteUrl('/user/verify')}/${token}`) 
            const data = await res.json()
            console.log(data)
            if (res.status === 200) {
                setIsSuccess(true)
            }
            setMessage(data.message)
            setLoading(false)
        }
        checkToken()
    }, [loading, message, token])
    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='loading loading-spinner'>
                </div>
            </div>
        )
    }
  return (
    <div>
        <NavBar />
            <h1 className='text-3xl text-center my-6'>User Verify</h1>
            <div className='flex justify-center item-center '>
                <div>
                    <Card className='w-96'>
                        <CardHeader>
                            <CardTitle className='text-xl text-center'>
                                Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent >
                            {isSuccess ?
                                <div className='flex flex-col items-center justify-center'>
                                    <span className='p-2 bg-success rounded-full mb-3'>{message}</span>
                                    <div className='flex'>
                                        <p className='mr-1'>Please go to</p><a className='link' href="/login"> Login</a>
                                    </div>
                                </div>
                                :
                                <div className='flex items-center justify-center'>
                                    <span className='p-2 bg-destructive text-white rounded-full'>{message}</span>
                                </div>
                            }
                             <div>
                            <div className='flex justify-between items-center mt-10'>
                                    <Link to='/register' className='link'>Register</Link>
                                    <Link to='/login' className='link'>Login</Link>
                            </div>
                        </div>
                        </CardContent>
                       
                    </Card>
                </div>
            </div>
    </div>
  )
}
