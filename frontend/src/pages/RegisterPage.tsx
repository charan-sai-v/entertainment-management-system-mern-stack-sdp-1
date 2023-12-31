import React, { useEffect, useState } from 'react'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { absoluteUrl } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

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

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [gender, setGender] = useState("")
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const userHandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmit(true);
    console.log(name+ " "+ email+ " "+ phone+" "+gender+" "+password+" "+confirm_password)
    const data = await fetch(`${absoluteUrl('/user/register')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirm_password,
          gender
        })
      })
      const response = await data.json()
      if (data.status === 200) {
        setIsRegisterSuccess(true);
      } else if (response.message === 'Email already exists') {
        alert('Email already exists')
      } else if (response.message === 'Passwords do not match') {
        alert('Password not match')
      } else if (response.message === 'Phone number already exists') {
        alert('Phone number already exists')
      } else {
        alert('Something went wrong')
      }
      console.log(response)
      setIsSubmit(false);
  }

  const organizerHandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await fetch(`${absoluteUrl('/organizer/register')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          company
        })
      })
      const response = await data.json()
      if (data.status === 200) {
        navigate('/login')
      } else {
        alert('Email already exist')
      }
      console.log(response)
  }

  useEffect(() => {
    console.log(absoluteUrl('/user/register'))
  }, [])

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
        {isRegisterSuccess ? 
        <div className=''>
          <Card>
            <CardHeader>
              <CardTitle>Register Success</CardTitle>
              <CardDescription>
                Please check your email to verify your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className='flex items-center justify-center'>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </div>
            </CardContent>
            <CardFooter>
              
            </CardFooter>
          </Card>
        </div>
         : 
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
                <Input disabled={isSubmit} id="name" placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input disabled={isSubmit} id="email" placeholder='user@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input disabled={isSubmit} id="phone" placeholder='0123456789' value={phone} onChange={(e) => setPhone(e.target.value)} required/>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='gender'>Gender</Label>
                <Select disabled={isSubmit} required onValueChange={(value) => setGender(value as string)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Gender"  />
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input disabled={isSubmit} id="password" type='password' placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Confirm Password</Label>
                <Input disabled={isSubmit} id="confirm_password" type='password' placeholder='**********' value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} required/>
              </div>
              <div className='flex items-center justify-between space-y-1'>
                  <a href="/user/login" className='hover:link text-blue-500'>
                      Already have an account?
                  </a>
              </div>
              <div className='space-y-1'>
                <Button type='submit' className='mt-3' disabled={isSubmit}> {isSubmit && <Loader2 className='w-5 h-5 mr-2 animate-spin' />}Register</Button>
              </div>
              </form>
            </CardContent>
            <CardFooter>
              
            </CardFooter>
          </Card>
        }

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
            <div className='space-y-1'>
              <Label htmlFor='company'>Company (Optional)</Label>
              <Input id="company" type='text' placeholder='Company (Optional)' value={company} onChange={(e)=> setCompany(e.target.value)} />
            </div>
            <div className='flex items-center justify-between mb-3'>
                <a href="/organizer/register" className='hover:link text-blue-500'>
                    Already have an Account?
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
