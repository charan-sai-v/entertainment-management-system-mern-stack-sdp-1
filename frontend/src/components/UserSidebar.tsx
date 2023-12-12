
import {cn} from "@/lib/utils";
import { LayoutDashboard, Library, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";


const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "My Bookings",
        icon: Library,
        href: "/bookings",
        color: "text-violet-500"
    },
    {
        label: "Profile",
        icon: User,
        href: "/profile",
    },

]



const UserSidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#F6F8FC] dark:bg-black text-black dark:text-white">
            <div className="px-3 py-2 flex-1">
                <Link to="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative h-8 w-8 mr-4">
                        {/* <Image fill alt="Logo" src="/logo.png" /> */}
                    </div>
                    <h1 className={cn('text-2xl font-bold')}>
                        EMS
                    </h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map((route)=> (
                        <NavLink
                            className={({ isActive }) =>
                                [
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition",
                                    isActive ? "bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20" : "",
                                ].join(" ")
                            }
                            to={route.href} 
                            key={route.href}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserSidebar;