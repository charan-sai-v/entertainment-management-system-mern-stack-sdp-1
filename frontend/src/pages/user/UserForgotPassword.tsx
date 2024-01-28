import React, { useEffect, useState } from "react";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const UserForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect( () => {
    setLoading(false)

  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    const res = await fetch('/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    try {
      const data = await res.json()
      console.log(data)
      if (res.status === 200) {
        alert("Email Sent")
      } else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      setError(error.message)
      console.log(error)
    }    
    setSubmitted(false)
  }

  return (  
    <div>
      <NavBar />
      {loading && 
        <div className="flex items-center justify-center mt-10">
          <div className="loading loading-spinner"></div>
        </div>
      }
      <div className="flex  items-center justify-center">
        <div className="mt-10">
          {error && <p className="text-red-500 text-center">Something Went Wrong</p>}
          <Card  className="border-none md:w-[450px]">
            <CardHeader>
              <h1 className="text-center text-xl font-bold">User Forgot Password</h1>
            </CardHeader>
            <CardContent>
              <p className="mb-3">Enter your email address and we will send you a link to reset your password.</p>
              <form onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input className="mb-3" disabled={submitted} required  value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button type="submit" disabled={submitted}>
                  {submitted && 
                    <div className="loading loading-spinner mr-3">
                    </div>
                  }
                  Reset Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
 
export default UserForgotPassword;