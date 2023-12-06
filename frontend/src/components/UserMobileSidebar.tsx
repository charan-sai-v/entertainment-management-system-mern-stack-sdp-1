"use client"

import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import UserSidebar from "./UserSidebar";


const UserMobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=> {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null
    }

  return (
      <Sheet>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'} className="md:hidden">
                <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <UserSidebar />
          </SheetContent>
      </Sheet>
  )
}

export default UserMobileSidebar;