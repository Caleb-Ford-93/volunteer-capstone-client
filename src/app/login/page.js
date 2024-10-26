'use client'
import Link from "next/link"
import { useAuth } from "../../providers/context"
import { useRouter } from "next/navigation"
import { Input, Button } from "@nextui-org/react"
import { login } from "../../data/auth"
import { useEffect, useState } from "react"

export default function Login() {
  const {setToken, setUserType, userType} = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const router = useRouter()

  const handleChange = (name) => (value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  useEffect(() => {
  if (userType === "volunteer") {
    router.push("/volunteer");
  } else if (userType === "organization") {
    router.push("/organization");
  }
}, [userType, router]);

  const submit = (e) => {  
    e.preventDefault()
    
    login(formData).then((res) => {
      if (res.token) {
        setToken(res.token)
        setUserType(res.user_type)
      }
    })
    .catch(error => {
      console.error('Login error:', error)
    })
  }

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box" onSubmit={submit}>
          <h1 className="title">Welcome Back!</h1>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input 
                  id="email" 
                  type="email" 
                  label="Email"
                  value={formData.username}
                  onValueChange={handleChange('username')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input 
                  id="password"
                  type="password" 
                  label="Password"
                  value={formData.password}
                  onValueChange={handleChange('password')}
                />
            </div>
          <div className="field is-grouped">
            <div className="control">
              <Button type="submit" className="button is-link">Login</Button>
              <Link href="/register">
                <Button className="button is-link is-light">Register</Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}