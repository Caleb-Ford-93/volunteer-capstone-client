'use client'

import { useEffect, useState } from 'react'
import { getAllOpportunities } from "@/src/data/opportunities"
import { VolunteerOpportunityCard } from "@/src/components/opportunityCards/VolunteerOpportunity"
import { Button } from '@nextui-org/react'

export default function VolunteerAllOpportunitiesView() {
    const [opportunities, setOpportunities] = useState([])
    const [selectedOrganization, setSelectedOrganization] = useState(null) // State to hold selected organization

    useEffect(() => {
        getAllOpportunities().then((res) => {
            setOpportunities(res)
        })
    }, [])

    const handleViewOrganization = (organization) => {
        setSelectedOrganization(organization)
    }

    return (
        <div className="p-6 flex">
            {/* Left Column: Opportunities List */}
            <div className="w-1/2 pr-6">
                <h1 className="text-3xl font-semibold mb-6">Available Opportunities</h1>
                <div className="grid gap-4">
                    {opportunities.length > 0 ? (
                        opportunities.map((opportunity) => (
                            <VolunteerOpportunityCard 
                                key={opportunity.id}
                                opportunity={opportunity}
                                viewType="all"
                                organizationName={opportunity.organization.name}
                                onViewOrganization={() => handleViewOrganization(opportunity.organization)}
                            />
                        ))
                    ) : (
                        <p>No available opportunities at the moment.</p>
                    )}
                </div>
            </div>

            {/* Right Column: Organization Details */}
            {selectedOrganization && (
                <div className="w-1/2 ml-6 border rounded-lg p-4 shadow-md bg-white dark:bg-gray-950 dark:border-black">
                    <h2 className="text-2xl font-semibold mb-4">Organization Details</h2>
                    <p><strong>Name:</strong> {selectedOrganization.name}</p>
                    <p><strong>Location:</strong> {selectedOrganization.location}</p>
                    <p><strong>Description:</strong> {selectedOrganization.description}</p>
                    <Button className="mt-4" onPress={() => setSelectedOrganization(null)}>Close Details</Button>
                </div>
            )}
        </div>
    )
}
