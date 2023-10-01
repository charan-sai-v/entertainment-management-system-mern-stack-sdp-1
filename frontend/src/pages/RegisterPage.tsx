import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export function TabsDemo() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState("user")
  const handleTabChange = (tab: string) => {
    setEmail("")
    setPassword("")
    setName("")
    setPhone("")
    setActiveTab(tab)
  }

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")

  const userHandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      const response = await data.json()
      if (data.status === 200) {
        navigate('/user/login')
      }else{
        alert('Email already exist')
      }
      console.log(response)
  }

  const organizerHandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await fetch('http://localhost:8080/organizer/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone
        })
      })
      const response = await data.json()
      if (data.status === 200) {
        navigate('/organizer/login')
      } else {
        alert('Email already exist')
      }
      console.log(response)
  }



  return (
    <Tabs defaultValue={activeTab} className="w-[450px]" >
        <h1 className='my-6 text-3xl text-center '>Register Page</h1>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger onClick={() => handleTabChange("user")}
         value="user">User</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange("organizer")}
        value="organizer">Organizer</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to User Registration</CardTitle>
            <CardDescription>
              Please enter your email and password to register.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={userHandleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder='user@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type='password' placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className='flex items-center justify-between space-y-1'>
                <a href="/user/login" className='hover:link text-blue-500'>
                    Already have an account?
                </a>
            </div>
            <div className='space-y-1'>
              <Button type='submit' className='mt-3'>Register</Button>
            </div>
            </form>
          </CardContent>
          <CardFooter>
            
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="organizer">
      <Card>
          <CardHeader>
            <CardTitle>Welcome to Organizer Register</CardTitle>
            <CardDescription>
              Please enter your email and password to register
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={organizerHandleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className='space-y-1'>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder='0123456789' value={phone} onChange={(e) => setPhone(e.target.value)} required/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder='user@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type='password' placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className='flex items-center justify-between mb-3'>
                <a href="/user/forgot-password" className='hover:link text-orange-500'>
                    Forgot Password?
                </a>
                <a href="/user/register" className='hover:link text-blue-500'>
                    Register
                </a>
            </div>
            <div className='space-y-1'>
              <Button type='submit' className='mt-3'>Register</Button>
            </div>
            </form>
           

          </CardContent>

          <CardFooter>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}


export default function RegisterPage() {
  return (
    <div>
        <NavBar />
        <div className='flex items-center justify-center py-12'>
            <TabsDemo />
        </div>
    </div>
  )
}
