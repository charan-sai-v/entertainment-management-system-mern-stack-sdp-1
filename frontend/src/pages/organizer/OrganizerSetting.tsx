import { OrganizerLayout } from '@/components/organizer/OrganizerLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function OrganizerSetting() {
  return (
    <OrganizerLayout>
      <div className='py-3 px-10'>
        <h1 className='text-2xl font-semibold mb-3'>Organizer Settings</h1>
        <div className=''>
          <div className=''>
            <Card className='w-full md:w-fit mb-5'>
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
                        Charan
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Email</Label>
                      <div className="max-w-xl mx-auto">
                        <p className="">
                          nickncherry2002@gmail.com
                        </p>

                      </div>
                      
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Phone</Label>
                      <p>
                        1234567890
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Company</Label>
                      <p>
                        ABC
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
            <Card className='w-full md:w-fit'>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <Separator className='w-full' />
              <CardContent>
                <div className='flex items-center justify-center p-10'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='w-fit'>
                      <Label>Bank Name</Label>
                      <p>
                        HDFC
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Account Number</Label>
                      <p>
                        1234567890
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>IFSC Code</Label>
                      <p>
                        HDFC000123
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                    <div className='w-fit'>
                      <Label>Account Holder Name</Label>
                      <p>
                        Charan
                      </p>
                      {/* <Input value={'Charan'}  /> */}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className='flex items-center justify-center space-x-2 w-full'>
                  <Button className=''>Update Bank Details</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
        </div>
      </div>
    </OrganizerLayout>
  )
}
