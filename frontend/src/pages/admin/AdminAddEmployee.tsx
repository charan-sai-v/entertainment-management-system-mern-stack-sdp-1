import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function AdminAddEmployee() {
  return (
    <div>
        <div className=''>
            <form action="" onSubmit={()=>null}>
                <div>
                    <Label htmlFor='name'></Label>
                    <Input id="name" name='name' />
                </div>
                <div>
                    <Label htmlFor='name'></Label>
                    <Input id="name" name='name' />
                </div>
                <div>
                    <Label htmlFor='name'></Label>
                    <Input id="name" name='name' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    </div>
  )
}
