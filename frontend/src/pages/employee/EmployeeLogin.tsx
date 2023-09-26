import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'



export default function EmployeeLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await fetch('localhost:8000/api/employee/login', {
        body: JSON.stringify({
            email,
            password
        }),
      })
    const response = await data.json()
    console.log(response)  
  }

  return (
    <div>
        <div className='flex h-screen items-center justify-center'>  
            <div className="grid w-full max-w-sm items-center gap-5">
                <h1 className='text-2xl font-bold text-center'>Admin Login</h1>  
                <form onSubmit={submitHandler} > 
                  <Label className='my-3'  htmlFor="email">Email</Label>
                  <Input type="email" className='my-3' id="email" placeholder="employee@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                  <Label className='my-3' htmlFor="password">Password</Label>
                  <Input className='my-4' type="password" id="password" placeholder="*********" value={password} onChange={(e)=>setPassword(e.target.value)} />
                  <Button>Login</Button>
                </form>
               
            </div>
        </div>
    </div>
  )
}
