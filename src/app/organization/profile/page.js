'use client'

import { getUserProfile } from "@/src/data/auth"
import { Button } from "@nextui-org/react"
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react"

export default function OrganizationProfile() {
    const [profile, setProfile] = useState()

    useEffect(()=>{
        getUserProfile().then((res)=>{
            setProfile(res)
        })
    },[])
    
        
    
    return <div className="flex flex-col m-8 mt-14 justify-self-center place-items-center" >
            <h1 className="text-4xl mb-4">{profile?.organization.name}</h1>
            <p>{profile?.organization.location}</p>
            <p>{profile?.organization.description}</p>
            <div className="m-8">
                <h1>Contact Information:</h1>
                <h1>Email: {profile?.email}</h1>
            </div>
            <div>
                <Button as={Link} href="/organization/profile/edit" color="success">Edit Information</Button>
            </div>
        </div>
}