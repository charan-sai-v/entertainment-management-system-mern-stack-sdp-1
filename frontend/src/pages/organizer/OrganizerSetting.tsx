import { OrganizerLayout } from '@/components/organizer/OrganizerLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Organizer from '@/models/Organizer'
import React, { useEffect, useState } from 'react'
import { absoluteUrl } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export default function OrganizerSetting() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [organizer, setOrganizer] = useState<Organizer>()
  const [bankDetails, setBankDetails] = useState({
    is_bank_account: false,
    bank_account_name: '',
    bank_account_number: '',
    bank_ifsc_code: '',
    bank_name: '',
  })

  useEffect(() => {
    const getOrganizer = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${absoluteUrl('/organizer/profile')}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (response.status !== 200) {
          // navigate('/login')
        }
        console.log(data)
        setOrganizer(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    getOrganizer()
  }, [])

  const handleBankDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
  
      // Assuming you have bankDetails state in your component.
      bankDetails.is_bank_account = true;
  
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${absoluteUrl('/organizer/bank-account')}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set content type
        },
        body: JSON.stringify({
          is_bank_account: bankDetails.is_bank_account, // Consistent property name
          bank_account_name: bankDetails.bank_account_name,
          bank_account_number: bankDetails.bank_account_number,
          bank_ifsc_code: bankDetails.bank_ifsc_code,
          bank_name: bankDetails.bank_name,
        }),
      });
  
      const data = await response.json();
  
      if (response.status !== 200) {
        // Handle non-200 status code, navigate, show an error, etc.
        // Example: navigate('/login');
      }
  
      console.log(data);
      setOrganizer(data);
      setLoading(false);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError(true);
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <OrganizerLayout>
        <div className='flex items-center justify-center h-screen'>
          <p>Loading...</p>
        </div>
      </OrganizerLayout>
    )
  }

  if (error) {
    return (
      <OrganizerLayout>
        <div className='flex items-center justify-center h-screen'>
          <p>Something went wrong! Please try again later.</p>
        </div>
      </OrganizerLayout>
    )
  }
            

  return (
    <OrganizerLayout>
      <div className='py-3 px-10'>
        <h1 className='text-2xl font-semibold mb-3'>Organizer Settings</h1>
        <div className='flex items-center justify-center'>
        <Tabs defaultValue="profile" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Account</TabsTrigger>
              <TabsTrigger value="payment">Bank Details</TabsTrigger>
            </TabsList>
          <TabsContent value="profile">
            <div className='flex items-center justify-center'>
            <Card className=' mb-5'>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <Separator className='w-full' />
              <CardContent>
                <div className='flex items-center justify-center p-10'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='w-fit'>
                      <Label>Name</Label>
                      <p>
                        {organizer?.name}
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Email</Label>
                      <div className="max-w-xl mx-auto">
                        <p className="">
                          {organizer?.email}
                        </p>

                      </div>
                      
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Phone</Label>
                      <p>
                        {organizer?.phone}
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Company</Label>
                      <p>
                        {organizer?.company}
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className='flex items-center justify-center space-x-2 w-full'>
                  <Button className='' variant={'ghost'} >Reset Password</Button>
                  <Button className=''>Update Profile</Button>
                </div>
              </CardFooter>
            </Card>
            </div>
          </TabsContent>
          <TabsContent value="payment">
            <Card className='w-max'>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <Separator className='w-full' />
              <CardContent>
                <form onSubmit={handleBankDetails}>
                  <div className='flex items-center justify-center p-10'>
                    {
                      organizer?.is_bank_account ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='w-fit'>
                            <Label>Bank Name</Label>
                            <p>
                              {organizer?.bank_account_name}
                            </p>
                            {/* <Input value={'Charan'}  /> */}
                          </div>
                          <div className='w-fit'>
                            <Label>Account Number</Label>
                            <p>
                              {organizer?.bank_account_number}
                            </p>
                            {/* <Input value={'Charan'}  /> */}
                          </div>
                          <div className='w-fit'>
                            <Label>IFSC Code</Label>
                            <p>
                              {organizer?.bank_ifsc_code}
                            </p>
                            {/* <Input value={'Charan'}  /> */}
                          </div>
                          <div className='w-fit'>
                            <Label>Account Holder Name</Label>
                            <p>
                              {organizer?.bank_account_name}
                            </p>
                            {/* <Input value={'Charan'}  /> */}
                          </div>
                        </div>
                      ) : (
                        <div className='flex items-center justify-center space-x-2 w-full'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='w-fit'>
                        <Label>Bank Name</Label>
                        <Input placeholder='HDFC' onChange={(e) => setBankDetails({...bankDetails, bank_name: e.target.value})} required />
                      </div>
                      <div className='w-fit'>
                        <Label>Account Number</Label>
                        <Input placeholder='1234567890' required onChange={(e) => setBankDetails({...bankDetails, bank_account_number: e.target.value})} />
                      </div>
                      <div className='w-fit'>
                        <Label>IFSC Code</Label>
                        <Input placeholder='HDFC0000001' required onChange={(e) => setBankDetails({...bankDetails, bank_ifsc_code: e.target.value})} />
                      </div>
                      <div className='w-fit'>
                        <Label>Account Holder Name</Label>
                        <Input placeholder='Charan' required onChange={(e) => setBankDetails({...bankDetails, bank_account_name: e.target.value})} />
                      </div>
                    </div>
                        </div>
                      )
                    }
                  </div>
                  <div className='flex items-center justify-center space-x-2 w-full'>
                    {
                      organizer?.is_bank_account ? (
                        <Button className='' type='submit'>Update Bank Details</Button>
                      ) : (
                        <Button className='' type='submit' >Add Bank Details</Button>
                      )
                    }
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
        <div className=''>
          <div className=''>
          </div>
          
        </div>
      </div>
    </OrganizerLayout>
  )
}
