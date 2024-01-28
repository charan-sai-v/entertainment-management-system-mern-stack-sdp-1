import React from 'react'
import Img from "@/assets/img.jpg"
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div>
        <NavBar />
        <section className="bg-white dark:bg-gray-900 ">
            <div className="py-5 px-4 mx-auto max-w-screen-xl  text-center lg:pb-16 lg:px-12">
                <div className="flex flex-col items-center justify-center mb-4 space-x-4 sm:flex-row sm:space-x-0">
                <img src={Img} alt="" className='h-72' />
                </div>
               
                <span className="text-5xl font-semibold  [&amp;::selection]:text-base-content relative col-start-1 row-start-1 ">Welcome to EMS</span>
                <p className="my-5 text-muted-foreground lg:text-lg sm:px-16 xl:px-48 dark:text-gray-400">
                The event management system is a web application that allows organizers to create events and sell
                tickets for those events. The application also allows users to buy tickets for events created by
                organizers. The application is built using the MERN stack and uses the Stripe API for payment
                </p>
                <div className="flex items-center justify-center space-x-3">
                    <Button size={'lg'} >Register</Button>
                    <Button variant={'outline'} size={'lg'} >Login</Button>
                </div>
            
            </div>
        </section>
    </div>
  )
}
