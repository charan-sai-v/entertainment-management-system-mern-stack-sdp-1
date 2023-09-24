import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function AdminAddEmployee() {
  return (
    <div>
        <NavBar />
        <h2 className='text-center text-2xl font-bold  mt-20'>Add Employee</h2>
        <div className='flex h-screen  item-center justify-center '>
            <form action="" className='w-full max-w-sm space-y-4' onSubmit={()=>null}>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input id="name" name='name' type='text' />
                </div>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input id="email" name='email' type='email' />
                </div>
                <div>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input id="phone" name='phone' type='text' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    </div>
  )
}
