import NavBar from "@/components/NavBar"
import P from "@/assets/p.jpg"
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Plus, Minus} from "lucide-react"

export default function UserEventById() {
    const [count, setCount] = useState(0)

  return (
    <div>
        <NavBar />
        
        <div className="p-10">
            <div className="flex flex-col items-center justify-center w-[750px] mx-auto">
            <h1 className="my-6">Event 1</h1>
              <div className="stack ">
                <img src={P} alt=""  className="rounded-lg h-[450px] w-[700px]" />
              </div>

                <div className="divider"></div>
                <div className="p-2">
                    <p>Entertainment is a form of activity that holds the attention and interest of an audience or gives pleasure and delight. It can be an idea or a task, but it is more likely to be one of the activities or events that have developed over thousands of years specifically for the purpose of keeping an audience's attention.
                    </p>
                </div>
                <h3>Tickets</h3>
                <p>Available Tickets: <small className="text-red-500 font-bold text-lg">10</small></p>
                <div className={'flex p-5 gap-2 items-center '}>
                    <Button size={'icon'} onClick={()=> setCount(count+1)}>
                        <Plus className={'h-4 w-4 '} />
                    </Button>
                    <p className="font-bold text-lg">{count}</p>
                    <Button size={'icon'}  onClick={()=> setCount(count-1)}>
                        <Minus className={'h-4 w-4'} />
                    </Button>
                </div>
                <div className="w-full">
                    <Button className="mx-auto ">Book Now</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
