'use client'

import { useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from "@/src/data/auth"
import { getSkills } from "@/src/data/skills"
import { Button, Input, Textarea, Checkbox } from "@nextui-org/react"
import { useRouter } from 'next/navigation'

export default function EditVolunteerInformation() {
    const [profile, setProfile] = useState()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        location: "",
        skills: []
    })
    const [skills, setSkills] = useState([]) // Available skills for selection
    const router = useRouter()

    const fetchData = async () => {
        const profile = await getUserProfile()
        const availableSkills = await getSkills()
        setProfile(profile)
        setFormData({
            firstName: profile.first_name,
            lastName: profile.last_name,
            email: profile.email,
            phoneNumber: profile.volunteer.phone_number,
            location: profile.volunteer.location,
            skills: profile.volunteer.skills.map(skill => skill.id) || []
        })
        setSkills(availableSkills)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleInputChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        })
    }

    const handleSkillChange = (skillId) => {
        setFormData((prevData) => {
            const updatedSkills = prevData.skills.includes(skillId)
                ? prevData.skills.filter(id => id !== skillId) // Remove skill if already selected
                : [...prevData.skills, skillId] // Add skill if not selected

            return {
                ...prevData,
                skills: updatedSkills
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateUserProfile(formData, profile.id)
            router.push("/volunteer/profile/") // Redirect to profile view after successful update
        } catch (error) {
            console.error("Failed to update profile:", error)
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md dark:bg-gray-950">
            <h1 className="text-2xl font-semibold mb-6">Edit Volunteer Information</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    required
                    className="w-full"
                />
                <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    required
                    className="w-full"
                />
                <Input
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    required
                    className="w-full"
                />
                <Input
                    label="Phone Number"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange("phoneNumber")}
                    required
                    className="w-full"
                />
                <Input
                    label="Location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={handleInputChange("location")}
                    required
                    className="w-full"
                />
                
                {/* Skills Selection */}
                <div className="border rounded-md p-2 max-h-32 overflow-y-auto">
                    <label className="block font-medium mb-2">Select Skills:</label>
                    {skills.map((skill) => (
                        <div key={skill.id}>
                            <Checkbox
                                isSelected={formData.skills.includes(skill.id)}
                                onChange={() => handleSkillChange(skill.id)}
                            >
                                {skill.name}
                            </Checkbox>
                        </div>
                    ))}
                </div>
                
                <Button type="submit" color="primary" className="w-full">
                    Save Changes
                </Button>
            </form>
        </div>
    )
}
