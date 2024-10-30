'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getOpportunityById, signUpVolunteer } from "@/src/data/opportunities"
import { Button } from "@nextui-org/react"
import { formatTheDate } from '@/src/utils/formatDate'

export default function OpportunityDetails({ params }) {
    const [opportunity, setOpportunity] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const fetchOpportunity = async () => {
            const resolvedParams = await params
            const opportunityData = await getOpportunityById(resolvedParams.id)
            setOpportunity(opportunityData)
        }
        
        fetchOpportunity()
    }, [params])

    
    const handleSignUp = (opportunityId) => {
        signUpVolunteer(opportunityId).then(()=>{
            router.push("/volunteer/calendar")
        })
    }


    if (!opportunity) return <p>Loading...</p>

    return (
        <div className="mt-4 p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2">{opportunity.title}</h1>
            <p className="text-xl text-gray-700 mb-4">{opportunity.organization.name}</p>

            <p className="text-gray-800 mb-6">{opportunity.description}</p>

            {/* Row for start date, end date, and location */}
            <div className="flex justify-between items-center mb-8">
                <p><strong>Start Date:</strong> {formatTheDate(opportunity.start_date)}</p>
                <p><strong>End Date:</strong> {formatTheDate(opportunity.end_date)}</p>
                <p><strong>Location:</strong> {opportunity.location}</p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <Button color="primary" onPress={() => router.push("/volunteer/opportunities")}>
                    Back to All Opportunities
                </Button>
                <Button color="success" onPress={() => handleSignUp(opportunity.id)}>
                    Sign Me Up!
                </Button>
            </div>
        </div>
    )
}

