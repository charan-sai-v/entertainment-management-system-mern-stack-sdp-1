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

export function TabsDemo() {
  return (
    <Tabs defaultValue="user" className="w-[450px]">
        <h1 className='my-6 text-3xl text-center '>Register Page</h1>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="organizer">Organizer</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to User Registration</CardTitle>
            <CardDescription>
              Please enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder='John Doe'  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder='user@gmail.com'  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type='password' placeholder='**********' />
            </div>
            <div className='flex items-center justify-between'>
                <a href="/user/login" className='hover:link text-blue-500'>
                    Already have an account?
                </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="organizer">
      <Card>
          <CardHeader>
            <CardTitle>Welcome to Organizer Register</CardTitle>
            <CardDescription>
              Please enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder='John Doe'  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder='user@gmail.com'  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type='password' placeholder='**********' />
            </div>
            <div className='flex items-center justify-between'>
                <a href="/user/forgot-password" className='hover:link text-orange-500'>
                    Forgot Password?
                </a>
                <a href="/user/register" className='hover:link text-blue-500'>
                    Register
                </a>
            </div>

          </CardContent>

          <CardFooter>
            <Button>Register</Button>
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
