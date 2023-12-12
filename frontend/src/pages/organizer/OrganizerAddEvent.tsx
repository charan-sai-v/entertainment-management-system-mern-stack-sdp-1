
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from '@/components/ui/checkbox'
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout'



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
    const [isCancelable, setIsCancelable] = useState(false)
    const [cancel_deadline, setCancel_deadline] = useState("")
    const [startRegistrationDate, setStartRegistrationDate] = useState("")
    const [endRegistrationDate, setEndRegistrationDate] = useState("")

    const navigate = useNavigate()

    const handleIsCancelable = () => {
        setIsCancelable(!isCancelable);
        if (isCancelable) {
            document.getElementById('cancel_deadline_div')!.classList.add('hidden');
        } else {
            document.getElementById('cancel_deadline_div')!.classList.remove('hidden');
        }
    }


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
    
        if (!image) {
            alert("Please select an image.");
            return;
        }
    
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("location", location);
        formData.append("price", price.toString());
        formData.append("capacity", capacity.toString());
        formData.append("category", category);
        formData.append("startRegistrationDate", startRegistrationDate);
        formData.append("endRegistrationDate", endRegistrationDate);
        formData.append("is_cancelable", isCancelable.toString());
        if (isCancelable) {
            formData.append("cancel_deadline", cancel_deadline);
        }

    
        // Print the form data
        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        
        try {
            const response = await fetch('http://localhost:8080/organizer/create-event', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (response.status===200) {
                alert("Event added successfully");
                navigate('/organizer/events');
            }
            if (data.message === 'Invalid Token') {
                alert("Session expired. Please login again.");
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                navigate('/login');
            }
            
        } catch (error) {
            console.log(error);
            alert("Error adding event");
        }
    }
    
    return (
        <div>
            <OrganizerLayout>
                <h2 className='text-center text-2xl font-bold  mt-10'>Add Event</h2>
                <div className='flex item-center justify-center'>
                    <form className='w-full max-w-sm space-y-4 mb-10' onSubmit={handleSubmit} >
                        <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input id="name" name='name' type='text' onChange={(e)=>setName(e.target.value)} required />                        
                        </div>
                        <div>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea id="description" name='description' onChange={(e)=>setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor='image'>Image</Label>
                            <Input id="image" name='image' type='file' onChange={handleImage} required accept='image/*' />
                        </div>
                        <div>
                            <Label htmlFor='startRegistrationDate'>Registration Start Date</Label>
                            <Input id="startRegistrationDate" name='startRegistrationDate' type='datetime-local' 
                            onChange={(e)=>setStartRegistrationDate(e.target.value)} required min={new Date().toISOString().slice(0,16)} />
                        </div>
                        <div>
                            <Label htmlFor='endRegistrationDate'>Registration End Date</Label>
                            <Input id="endRegistrationDate" name='endRegistrationDate' type='datetime-local' min={startRegistrationDate}
                            onChange={(e)=>setEndRegistrationDate(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor='startDate'>Event Start Date</Label>
                            <Input id="startDate" name='startDate' type='datetime-local' onChange={(e)=>setStartDate(e.target.value)} required min={endRegistrationDate} />
                        </div>
                        <div>
                            <Label htmlFor='endDate'>Event End Date</Label>
                            <Input id="endDate" name='endDate' type='datetime-local' onChange={(e)=>setEndDate(e.target.value)} required min={startDate} />
                        </div>
                        <div className='flex items-center justify-start'>
                            <Label htmlFor='is_cancelable' className='mr-2'>Is Cancelable?</Label>
                            <Checkbox id="is_cancelable" name='is_cancelable' checked={isCancelable} onCheckedChange={handleIsCancelable} />
                        </div>
                        <div className='hidden' id='cancel_deadline_div'>
                            <Label htmlFor='cancel_deadline'>Cancellation Deadline - For users to cancel their bookings</Label>
                            <Input id="cancel_deadline" name='cancel_deadline' type='datetime-local' onChange={(e)=>setCancel_deadline(e.target.value)} min={startRegistrationDate} max={startDate} />
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
            </OrganizerLayout>
        </div>
    )
}


