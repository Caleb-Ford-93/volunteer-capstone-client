'use client'
import { useEffect, useState } from 'react'
import { getOpportunityById, updateOpportunity } from '@/src/data/opportunities'
import { getSkills } from '@/src/data/skills'
import { Button, Input, Textarea, Checkbox } from "@nextui-org/react"
import { useRouter } from 'next/navigation'
import { formatTheDate } from '@/src/utils/formatDate'

export default function OpportunityDetails({ params }) {
    const [opportunity, setOpportunity] = useState(null)
    const [isEditVisible, setIsEditVisible] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        start_date: '',
        end_date: '',
        skills: []
    })
    const [skills, setSkills] = useState([]) 
    const [id, setId] = useState(null)
    const router = useRouter()
    useEffect(() => {
        async function resolveParams() {
            const resolvedParams = await params
            setId(resolvedParams.id)
        }
        resolveParams()
    }, [params])
    
    
    useEffect(() => {
        if (id) {
            getOpportunityById(id).then((data) => {
                setOpportunity(data)
                setFormData({
                    title: data.title,
                    location: data.location,
                    description: data.description,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    skills: data.skills.map(skill => skill.id) || [] 
                })
            })
            getSkills().then((availableSkills) => setSkills(availableSkills))
        }
    }, [id])


    const toggleEditForm = () => {
        setIsEditVisible(!isEditVisible)
    }

    const handleInputChange = (name) => (e) => {
        setFormData({
            ...formData,
            [name]: e.target.value
        })
    }


    const handleSkillChange = (skillId) => {
        setFormData((prevData) => {
            
            const updatedSkills = new Set(prevData.skills)
            
            if (updatedSkills.has(skillId)) {
                updatedSkills.delete(skillId)
            } else {
                updatedSkills.add(skillId)
            }

            return {
                ...prevData,
                skills: Array.from(updatedSkills)
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            
            const formattedData = {
                ...formData,
                skills: Array.from(new Set(formData.skills))
            }

            await updateOpportunity(id, formattedData)
            router.push('/organization/opportunities')
        } catch (error) {
            console.error("Failed to update opportunity:", error)
        }
    }

    if (!opportunity || skills.length === 0) return <p>Loading...</p>

    return (
        <div className="p-6 flex">

            <div className="w-full md:w-1/2 space-y-4">
                <h1 className="text-3xl font-semibold">{opportunity.title}</h1>
                <p><strong>Location:</strong> {opportunity.location}</p>
                <p><strong>Description:</strong> {opportunity.description}</p>
                <p><strong>Start Date:</strong> {formatTheDate(opportunity.start_date)}</p>
                <p><strong>End Date:</strong> {formatTheDate(opportunity.end_date)}</p>
                
                <p><strong>Skills:</strong> {opportunity.skills && opportunity.skills.length > 0 ? opportunity.skills.map(skillId => {
                    const skill = skills.find(s => s.id === skillId.id)
                    return skill ? skill.name : null
                }).filter(Boolean).join(", ") : "None"}</p>


                <Button color="success" onPress={toggleEditForm}>
                    Edit Opportunity
                </Button>
            </div>


            {isEditVisible && (
                <div className="w-full md:w-1/2 ml-6 border rounded-lg p-4 shadow-md bg-white dark:bg-gray-950 dark:border-black">
                    <h2 className="text-xl font-semibold mb-4">Edit Opportunity</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Title"
                            variant="bordered"
                            value={formData.title}
                            onChange={handleInputChange("title")}
                            required
                            className="w-full"
                        />
                        <Input
                            label="Location"
                            variant="bordered"
                            value={formData.location}
                            onChange={handleInputChange("location")}
                            required
                            className="w-full"
                        />
                        <Textarea
                            label="Description"
                            variant="bordered"
                            value={formData.description}
                            onChange={handleInputChange("description")}
                            required
                            className="w-full"
                        />
                        <Input
                            type="date"
                            variant="bordered"
                            label="Start Date"
                            value={formData.start_date}
                            onChange={handleInputChange("start_date")}
                            required
                            className="w-full"
                        />
                        <Input
                            type="date"
                            variant="bordered"
                            label="End Date"
                            value={formData.end_date}
                            onChange={handleInputChange("end_date")}
                            required
                            className="w-full"
                        />
                        
                        <div className="border rounded-md p-2 max-h-32 overflow-y-scroll dark:border-zinc-600">
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
            )}
        </div>
    )
}
