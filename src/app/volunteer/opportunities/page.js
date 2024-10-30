'use client'

import { useEffect, useState } from 'react'
import { getAllOpportunities } from "@/src/data/opportunities"
import { getUserProfile } from "@/src/data/auth"
import { VolunteerOpportunityCard } from "@/src/components/opportunityCards/VolunteerOpportunity"

export default function VolunteerAllOpportunitiesView() {
    const [opportunities, setOpportunities] = useState([])
    const [registeredOpportunityIds, setRegisteredOpportunityIds] = useState([])

    useEffect(() => {
        // Fetch all opportunities and the volunteer's profile
        const fetchOpportunities = async () => {
            const [allOpportunities, profile] = await Promise.all([
                getAllOpportunities(),
                getUserProfile()
            ])
            
            // Extract IDs of opportunities the volunteer is signed up for
            const registeredIds = profile.volunteer.opportunities.map(opportunity => opportunity.id)
            
            // Filter out registered opportunities
            const filteredOpportunities = allOpportunities.filter(
                (opportunity) => !registeredIds.includes(opportunity.id)
            )

            setOpportunities(filteredOpportunities)
            setRegisteredOpportunityIds(registeredIds)
        }

        fetchOpportunities()
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Available Opportunities</h1>
            <div className="grid gap-4">
                {opportunities.length > 0 ? (
                    opportunities.map((opportunity) => (
                        <VolunteerOpportunityCard 
                            key={opportunity.id}
                            opportunity={opportunity}
                            viewType="all" // Show "View Organization" button in this view
                            organizationName={opportunity.organization.name}
                        />
                    ))
                ) : (
                    <p>No available opportunities at the moment.</p>
                )}
            </div>
        </div>
    )
}
