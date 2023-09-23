import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function AdminLogin() {
  return (
    <div>
        <div className='flex h-screen items-center justify-center'>  
            <div className="grid w-full max-w-sm items-center gap-5">
                <h1 className='text-2xl font-bold text-center'>Admin Login</h1>  
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="admin@gmail.com" />
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="*********" />
                <Button>Login</Button>
            </div>
        </div>
    </div>
  )
}
