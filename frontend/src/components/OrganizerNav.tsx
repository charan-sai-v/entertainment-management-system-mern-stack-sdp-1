


import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function OrganizerNav({children}: {children: React.ReactNode}) {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        navigate('/login')
    }
  return (
    <div>
         <div className="w-full navbar bg-base-300">
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div> 
                <div className="flex-1 px-2 mx-2">Admin</div>
                <div className="flex-none hidden lg:block">
                    <ul className="menu menu-horizontal">
                    {/* Navbar menu content here */}
                    <li><a>Navbar Item 1</a></li>
                    <li><a>Navbar Item 2</a></li>
                    </ul>
                </div>
                <div className='navbar-end'>
                    <ModeToggle />
                    <Button className='w-fit ml-3' variant='ghost' onClick={logout}>Logout</Button>
                </div>
        </div>
        <div className="drawer  lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                
                {/* Page content here */}
                {children}
            </div> 
            <div className="drawer-side border-r-2">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full gap-1">
                {/* Sidebar content here */}
                <Link to='/dashboard' className="w-full justify-start"><Button variant="ghost">Dashboard</Button></Link>
                <Link to='/events' className="w-full justify-start"><Button variant="ghost">Events</Button></Link>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
