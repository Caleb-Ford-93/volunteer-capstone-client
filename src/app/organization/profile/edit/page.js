'use client'
import { getUserProfile, updateUserProfile } from "@/src/data/auth"
import { Button, Input, Textarea } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EditOrganization() {
    const router = useRouter()
    const [profile, setProfile] = useState()
    const [updateData, setUpdateData] = useState({})

    useEffect(()=>{
        getUserProfile().then((res)=>{
            setProfile(res)
            setUpdateData({
                email: res.email,
                name: res.organization.name,
                location: res.organization.location,
                description: res.organization.description
            })
        })
    },[])

    const handleChange = (name) => (value) => {
        setUpdateData(prev => ({
        ...prev,
        [name]: value
        }))
    }
    const submit = (e) => {  
        e.preventDefault()
        updateUserProfile(updateData, profile.id).then((res) => {
            router.push("/organization/profile")
        })
        .catch(error => {
        console.error('Update error:', error)
        })
    }
    return <div className="m-10 justify-self-center w-96">
        <form className="box w-full" onSubmit={submit}>
          <h1 className="title">Edit Your Information</h1>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="email" 
                  type="email" 
                  label="Email"
                  value={updateData?.email}
                  onValueChange={handleChange('email')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="name"
                  type="text" 
                  label="Organization Name"
                  value={updateData?.name}
                  onValueChange={handleChange('name')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Textarea
                  isRequired 
                  id="description"
                  label="Description of your Organization"
                  value={updateData?.description}
                  onValueChange={handleChange('description')}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                <Input
                  isRequired 
                  id="location"
                  type="text" 
                  label="Location"
                  value={updateData?.location}
                  onValueChange={handleChange('location')}
                />
            </div>
          <div className="field is-grouped">
            <div className="control">
              <Button type="submit" color="success">Submit</Button>
              
            </div>
          </div>
        </form>
      </div>
}