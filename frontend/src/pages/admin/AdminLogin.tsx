import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
// export default function AdminLogin() {
   
//   useEffect( () => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       window.location.href = '/admin/dashboard'
//     }
//   }, [])

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const data = await fetch('http://localhost:8080/admin/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({email, password})
//     })
//     const response = await data.json()
//     if (data.status === 200) {
//       localStorage.setItem('token', response.token)
      
//       window.location.href = '/admin/dashboard'
//     }
//     else {
//       alert('Invalid Credentials')
//     }
//     console.log(response)  
//   }

//   return (
//     <div>
//         <div className='flex h-screen items-center justify-center'>  
//             <div className="grid w-full max-w-sm items-center gap-5">
//                 <h1 className='text-2xl font-bold text-center'>Admin Login</h1>  
//                 <form onSubmit={submitHandler} > 
//                   <Label className='my-3'  htmlFor="email">Email</Label>
//                   <Input type="email" className='my-3' id="email" placeholder="admin@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
//                   <Label className='my-3' htmlFor="password">Password</Label>
//                   <Input className='my-4' type="password" id="password" placeholder="*********" value={password} onChange={(e)=>setPassword(e.target.value)} />
//                   <Button>Login</Button>
//                 </form>
               
//             </div>
//         </div>
//     </div>
//   )
// }

export default class AdminLogin extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      window.location.href = '/admin/dashboard'
    }
  }
  state = {
    email: '',
    password: ''
  }
  submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await fetch('http://localhost:8080/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    const response = await data.json()
    if (data.status === 200) {
      localStorage.setItem('token', response.token)
      
      window.location.href = '/admin/dashboard'
    }
    else {
      alert('Invalid Credentials')
    }
    console.log(response)  
  }
  render() {
    return (
      <div>
        <div className='flex h-screen items-center justify-center'>  
            <div className="grid w-full max-w-sm items-center gap-5">
                <h1 className='text-2xl font-bold text-center'>Admin Login</h1>  
                <form onSubmit={this.submitHandler} > 
                  <Label className='my-3'  htmlFor="email">Email</Label>
                  <Input type="email" className='my-3' id="email" placeholder="email" value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})} />
                  <Label className='my-3' htmlFor="password">Password</Label>
                  <Input className='my-4' type="password" id="password" placeholder="password" value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})} />
                  <Button>Login</Button>
                </form>
              </div>
            </div>
          </div>
    )

  }
}


