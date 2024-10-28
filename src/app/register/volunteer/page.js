'use client'
import { register } from "@/src/data/auth"
import { useAuth } from "@/src/providers/context"
import { Button, Input } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterVolunteer() {
    const router = useRouter()
    const {setToken, setUserType, userType} = useAuth()
    const [registerData, setRegisterData] = useState({
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        location: ""
    })
    useEffect(() => {
        if (userType === "volunteer") {
            router.push("/volunteer");
        } else if (userType === "organization") {
            router.push("/organization");
        }
    }, [userType, router]);

    const handleChange = (name) => (value) => {
        setRegisterData(prev => ({
        ...prev,
        [name]: value
        }))
    }
    const submit = (e) => {  
        e.preventDefault()
        const user = {
            username: registerData.email,
            password: registerData.password,
            email: registerData.email,
            first_name: registerData.first_name,
            last_name: registerData.last_name,
            volunteer: {
                phone_number: registerData.phone_number,
                location: registerData.location
            }
        }
        register(user).then((res) => {
            if (res.token) {
                setToken(res.token)
                setUserType(res.user_type)
            }
        })
        .catch(error => {
        console.error('Register error:', error)
        })
    }
    return <div className="m-10 justify-self-center w-96">
        <form className="box w-full" onSubmit={submit}>
          <h1 className="title">Register an account as a Volunteer</h1>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="firstName" 
                  type="text" 
                  label="First Name"
                  value={registerData.first_name}
                  onValueChange={handleChange('first_name')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="lastName" 
                  type="text" 
                  label="Last Name"
                  value={registerData.last_name}
                  onValueChange={handleChange('last_name')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="email" 
                  type="email" 
                  label="Email"
                  value={registerData.email}
                  onValueChange={handleChange('email')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="phone_number" 
                  type="integer" 
                  label="Phone Number"
                  value={registerData.phone_number}
                  onValueChange={handleChange('phone_number')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="location"
                  type="text" 
                  label="Location"
                  value={registerData.location}
                  onValueChange={handleChange('location')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="password"
                  type="password" 
                  label="Password"
                  value={registerData.password}
                  onValueChange={handleChange('password')}
                />
            </div>
          <div className="field is-grouped">
            <div className="control">
              <Button type="submit" color="success">Create Account</Button>
              
            </div>
          </div>
        </form>
      </div>
}