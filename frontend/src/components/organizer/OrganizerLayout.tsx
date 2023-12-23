import React from 'react'
import OrganizerSidebar from './OrganizerSidebar'
import OrganizerNavbar from './OrganizerNavbar'
import { CrispChat } from './crisp-chat'

export const OrganizerLayout = ({
    children
}: {children: React.ReactNode}) => {
  return (
    <div>
      <CrispChat />
        <div className='h-full  relative'>
          <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
            <OrganizerSidebar />
          </div>
          <main className='md:pl-72'>
              <OrganizerNavbar />
              {children}
          </main>
      </div>
    </div>
  )
}
