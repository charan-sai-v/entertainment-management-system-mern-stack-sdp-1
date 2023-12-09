import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import serverUrl from '@/lib/serverUrl'
import { UserLayout } from '@/components/UserLayout';


export default function UserPaymentCheck() {
  const server_url = serverUrl();
  // const { bookingId } = useParams<{ bookingId: string }>()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const session_id = searchParams.get('session_id')
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await fetch(`${server_url}/user/check-payment/${session_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await res.json()
        console.log(data)
        if (res.status === 200) {
          setSuccess(true)
          console.log('success')
        }else {
          console.log('fail')
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchPayment()
  }, [session_id, server_url])

  return (
    <UserLayout>
      <div className="flex flex-col items-center justify-center">
        {loading && <div>Loading...</div>}
        {!loading && success && <div className="text-3xl text-green-500">Payment Successful!</div>}
        {!loading && !success && <div className="text-3xl text-red-500">Payment Failed!</div>}
      </div>
    </UserLayout>
  )
}
