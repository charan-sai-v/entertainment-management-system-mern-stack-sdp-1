import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminAddEmployee() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()
        const data = {
            name,
            email,
            phone,
            address,
            password
        }
        const response = await fetch('http://localhost:8080/admin/create-employee', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        const resData = await response.json()
        console.log(resData)

        navigate('/admin/employees')
        
    }

  return (
    <div>
        <NavBar />
        <h2 className='text-center text-2xl font-bold  mt-20'>Add Employee</h2>
        <div className='flex h-screen  item-center justify-center '>
            <form action="" className='w-full max-w-sm space-y-4' onSubmit={handleSubmit} >
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input id="name" name='name' type='text' onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input id="email" name='email' type='email' onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input id="password" name='password' type='password' onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input id="phone" name='phone' type='text' onChange={(e)=>setPhone(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor='address'>Address</Label>
                    <textarea name="address" id="address" rows={5} className='w-full p-2 border border-gray-300 rounded-md' onChange={(e)=>setAddress(e.target.value)}  required></textarea>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    </div>
  )
}
