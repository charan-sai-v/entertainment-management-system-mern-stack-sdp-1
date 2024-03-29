import React from 'react'
import UserSidebar from './UserSidebar'
import UserNavbar from './UserNavbar'

export const UserLayout = ({
    children
}: {children: React.ReactNode}) => {
  return (
    <div>
        <div className='h-full relative'>
          <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
            <UserSidebar  />
          </div>
          <main className='md:pl-72 '>
              <UserNavbar />
              {children}
          </main>
      </div>
    </div>
  )
}
