'use client'

import { getUserProfile } from "@/src/data/auth"
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function VolunteerProfile() {
    const [profile, setProfile] = useState()

    useEffect(() => {
        getUserProfile().then((res) => {
            setProfile(res)
        })
    }, [])

    return (
        <div className="flex flex-col items-center m-8 mt-14 space-y-8">
            <h1 className="text-4xl mb-4">{profile?.first_name} {profile?.last_name}</h1>
            
            <div>
                <h2 className="text-lg font-semibold">Skills:</h2>
                <ul className="list-disc pl-5 text-left">
                    {profile?.volunteer.skills.map((skill) => (
                        <li key={skill.id}>{skill.name}</li>
                    ))}
                </ul>
            </div>

            <div className="text-center">
                <h2 className="text-lg font-semibold">Contact Information:</h2>
                <p>Email: {profile?.email}</p>
                <p>Phone: {profile?.volunteer.phone_number}</p>
            </div>

            <div className="mt-4">
                <Button as="a" href="/volunteer/profile/edit" color="success">Edit Information</Button>
            </div>
        </div>
    )
}
