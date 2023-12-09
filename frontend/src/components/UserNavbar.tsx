
import { LogOut } from "lucide-react";
import UserMobileSidebar from "./UserMobileSidebar";
import { Button } from "./ui/button";


const UserNavbar = () => {
    const logout = () => {
      localStorage.clear();
      window.location.href = '/';
    }
  return (
      <div className='flex items-center p-4'>
         <UserMobileSidebar  />
          <div className='mx-auto w-full'>
            <div className="flex items-center justify-end">
              <Button className="w-fit" onClick={logout}>
                <LogOut size={16}className="mr-1" />
                Logout
              </Button>
            </div>
          </div>
      </div>
  )
}

export default UserNavbar;