import React from 'react'
import Img from "@/assets/img.jpg"
import NavBar from '@/components/NavBar'

export default function HomePage() {
  return (
    <div>
        <NavBar />
        <section className="bg-white dark:bg-gray-900 ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl  text-center lg:pb-16 lg:px-12">
                <div className="flex flex-col items-center justify-center mb-4 space-x-4 sm:flex-row sm:space-x-0">
                <img src={Img} alt="" className='h-80' />
                </div>
               
                <span className="text-7xl font-bold  [&amp;::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&amp;::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]">Welcome to Entertainment Management System</span>
                <p className="my-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente similique cupiditate nam voluptas maiores itaque saepe, consequatur iste ratione perspiciatis tempora, praesentium ducimus consectetur natus dolores dolorum sequi quam soluta!</p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Sign Up
                    </a>
                    <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Login 
                    </a>  
                </div>
            
            </div>
        </section>
    </div>
  )
}
