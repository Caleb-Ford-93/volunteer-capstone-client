'use client'
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
  const [errorMessage, setErrorMessage] = useState("")
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
    setErrorMessage("")

    login(formData).then((res) => {
      if (res === "404"){
        setErrorMessage("Invalid Credentials, Please try again.")
      }
      if (res.token) {
        setToken(res.token)
        setUserType(res.user_type)
      }
    })
  }

  return (
      <div className="m-10 justify-self-center w-96">
        <form className="box w-full" onSubmit={submit}>
          <h1 className="title mb-2">Welcome Back!</h1>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input 
                  id="email" 
                  type="email" 
                  label="Email"
                  value={formData.username}
                  onValueChange={handleChange('username')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input 
                  id="password"
                  type="password" 
                  label="Password"
                  value={formData.password}
                  onValueChange={handleChange('password')}
                />
            </div>
            {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
          <div className="field is-grouped">
            <div className="control">
              <Button type="submit" color="success" className="button is-link">Login</Button>
            </div>
          </div>
        </form>
      </div>
  )
}