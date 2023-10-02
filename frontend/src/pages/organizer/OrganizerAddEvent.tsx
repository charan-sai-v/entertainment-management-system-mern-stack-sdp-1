
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'



export default function OrganizerAddEvent() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File | null>(null);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState(0)
    const [capacity, setCapacity] = useState(0)
    const [category, setCategory] = useState("")

    // const navigate = useNavigate()

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const organizerId = localStorage.getItem("id")
        const organizerName = "mohan sai"
        const formData = new FormData()
        formData.append("image", image!)
        formData.append("name", name)
        formData.append("description", description)
        formData.append("startDate", startDate)
        formData.append("endDate", endDate)
        formData.append("location", location)
        formData.append("price", price.toString())
        formData.append("capacity", capacity.toString())
        formData.append("category", category)
        formData.append("organizerId", organizerId!)
        formData.append("organizerName", organizerName)
        // print the form data
        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const response = await fetch('http://localhost:8080/organizer/create-event', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",

            },
            method: "POST",
            body: formData
        })
        const resData = await response.json()
        console.log(resData)
    }

    

    return (
        <div>
            <NavBar />
            <h2 className='text-center text-2xl font-bold  mt-20'>Add Event</h2>
            <div className='flex item-center justify-center  '>
                <form className='w-full max-w-sm space-y-4 mb-10' onSubmit={handleSubmit} encType='multipart/form-data' >
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input id="name" name='name' type='text' onChange={(e)=>setName(e.target.value)} required />                        
                    </div>
                    <div>
                        <Label htmlFor='description'>Description</Label>
                        <Input id="description" name='description' type='text' onChange={(e)=>setDescription(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor='image'>Image</Label>
                        <Input id="image" name='image' type='file' onChange={handleImage} required accept='image/*' />
                    </div>
                    <div>
                        <Label htmlFor='startDate'>Start Date</Label>
                        <Input id="startDate" name='startDate' type='date' onChange={(e)=>setStartDate(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor='endDate'>End Date</Label>
                        <Input id="endDate" name='endDate' type='date' onChange={(e)=>setEndDate(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor='location'>Location</Label>
                        <Input id="location" name='location' type='text' onChange={(e)=>setLocation(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor='price'>Price</Label>
                        <Input id="price" name='price' type='number' onChange={(e)=>setPrice(parseInt(e.target.value))} required />
                    </div>
                    <div>
                        <Label htmlFor='capacity'>Capacity</Label>
                        <Input id="capacity" name='capacity' type='number' onChange={(e)=>setCapacity(parseInt(e.target.value))} required />
                    </div>
                    <div>
                        <Label htmlFor='category'>Category</Label>
                        <Select onValueChange={(e)=>setCategory(e)} required>
                            <SelectTrigger  >
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="movies">Movies</SelectItem>
                                    <SelectItem value="games">Games</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="art">Art</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                    </div>
                    <div>
                        <Button type='submit'>Add Event</Button>
                    </div>

                </form>
            </div>

        </div>
    )
}


