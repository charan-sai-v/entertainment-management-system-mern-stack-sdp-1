import { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import NavBar from '@/components/NavBar'
import { useNavigate } from 'react-router-dom'
import { absoluteUrl } from '@/lib/utils'



export function TabsDemo() {
  const [active, setActive] = useState("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isUserNotVerified, setIsUserNotVerified] = useState(false)
  const handleTabChange = (tab: string) => {
    setEmail("")
    setPassword("")
    setActive(tab)
  }

  const navigate = useNavigate()

  const userHandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`${absoluteUrl('/user/login')}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const data = await res.json()
      console.log(data)
      if (res.status === 200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.id)
        navigate('/dashboard')
      } else if(data.message === 'User is not verified') {
        alert("Please verify your email")
        setIsUserNotVerified(true)
      } else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const organizerHandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`${absoluteUrl('/organizer/login')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const data = await res.json()
      if (res.status===200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('id', data.id)
        navigate('/organizer/dashboard')
      } else {
        alert("Invalid Credentials")
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <Tabs defaultValue={active} className="w-[450px]">
        <h1 className='my-6 text-3xl text-center '>Login Page</h1>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger onClick={() => handleTabChange("user")}  value="user">User</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange("organizer")}  value="organizer">Organizer</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        {isUserNotVerified ? 
          <Card>
          <CardHeader>
            <CardTitle>User Email is not verified</CardTitle>
            <CardDescription>
              Please check your email to verify your account or click the link below to resend the verification email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className='flex items-center justify-center mb-3'>
              <Button onClick={() => navigate('/user/resend-verification-email')}>Go to Resend Verification Email</Button>
            </div>
            <div className='flex items-center justify-between'>
              <a href='/login' className='hover:link text-blue-500'>Login</a>
              <a href='/user/forgot-password' className='hover:link text-orange-500'>Forgot Password?</a>
            </div>
          </CardContent>
        </Card>
          :
        <Card>
          <CardHeader>
            <CardTitle>Welcome to User Login</CardTitle>
            <CardDescription>
              Please enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={userHandleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder='user@gmail.com'  value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type='password' placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className='flex items-center justify-between'>
                  <a href="/user/forgot-password" className='hover:link text-orange-500'>
                      Forgot Password?
                  </a>
                  <a href="/register" className='hover:link text-blue-500'>
                      Register
                  </a>
              </div>
              <div className='space-y-1'>
                <Button type='submit' className='mt-3'>Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        }
      </TabsContent>
      <TabsContent value="organizer">
      <Card>
          <CardHeader>
            <CardTitle>Welcome to Organizer Login</CardTitle>
            <CardDescription>
              Please enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={organizerHandleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder='user@gmail.com'  value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type='password' placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className='flex items-center justify-between'>
                  <a href="/organizer/forgot-password" className='hover:link text-orange-500'>
                      Forgot Password?
                  </a>
                  <a href="/register" className='hover:link text-blue-500'>
                      Register
                  </a>
              </div>
              <div className='space-y-1'>
                <Button type='submit' className='mt-3'>Login</Button>
              </div>
            </form>
          </CardContent>
         
        </Card>
      </TabsContent>
    </Tabs>
  )
}


export default function LoginPage() {
  return (
    <div>
        <NavBar />
        <div className='flex items-center justify-center py-12'>
            <TabsDemo />
        </div>
    </div>
  )
}
