'use client'
import { OrganizationOpportunityCard } from "@/src/components/opportunityCards/OrganizationOpportunity"
import { createNewOpportunity, getOrganizationOpportunities } from "@/src/data/opportunities"
import { getSkills } from "@/src/data/skills"
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function OrganizationOpportunities() {
    const [opportunities, setOpportunities] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [skills, setSkills] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        start_date: "",
        end_date: "",
        location: "",
        description: "",
        skills: []
    })

    const getAndSetOpportunities = () => {
        getOrganizationOpportunities().then((res) => {
            setOpportunities(res)
        })
    }
    const getAndSetSkills = () => {
        getSkills().then((res)=> {
            setSkills(res)
        })
    }
    
    useEffect(() => {
        getAndSetOpportunities()
        getAndSetSkills()
    }, [])

    const removeOpportunity = (id) => {
        setOpportunities((prevOpportunities) =>
            prevOpportunities.filter((opportunity) => opportunity.id !== id)
        )
    }

    const handleInputChange = (name) => (e) => {
        const value = e.target.value
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleCheckboxChange = (skill) => {
        setFormData((prevData) => {
            const updatedSkills = prevData.skills.includes(skill)
                ? prevData.skills.filter((s) => s !== skill) 
                : [...prevData.skills, skill]

            return {
                ...prevData,
                skills: updatedSkills
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedData = {
            ...formData,
            start_date: formData.start_date,
            end_date: formData.end_date
        }

        createNewOpportunity(formattedData).then(() =>{
            setIsFormVisible(false)
            getAndSetOpportunities()
            }
        )
    }

    return (
        <div className="p-6 flex">
            <div className="w-1/2 pr-6">
                <div className="flex justify-end mb-4">
                    <Button color="success" onPress={() => setIsFormVisible(true)}>
                        Create Opportunity
                    </Button>
                </div>
                <div className="grid gap-4">
                    {opportunities.map((opportunity) => (
                        <OrganizationOpportunityCard key={opportunity.id} opportunity={opportunity} onDelete={removeOpportunity}/>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 mx-auto">
                {isFormVisible && (
                    <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md space-y-4">
                        <Input
                            label="Title"
                            placeholder="Enter title"
                            value={formData.title}
                            onChange={handleInputChange("title")}
                            required
                            className="w-full"
                        />
                        <Input
                            type="date"
                            label="Start Date"
                            value={formData.start_date}
                            onChange={handleInputChange("start_date")}
                            required
                            className="w-full"
                        />
                        <Input
                            type="date"
                            label="End Date"
                            value={formData.end_date}
                            onChange={handleInputChange("end_date")}
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
                        <Textarea
                            label="Description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleInputChange("description")}
                            required
                            className="w-full"
                        />
                        <div className="border rounded-md p-2 max-h-32 overflow-y-scroll">
                            <label className="block font-medium mb-2">Select Skills:</label>
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <Checkbox
                                        isSelected={formData.skills.includes(skill.id)}
                                        onChange={() => handleCheckboxChange(skill.id)}
                                    >
                                        {skill.name}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                        <Button type="submit" color="primary" className="w-full">
                            Submit
                        </Button>
                    </form>
                )}
            </div>

        </div>
    )
}
