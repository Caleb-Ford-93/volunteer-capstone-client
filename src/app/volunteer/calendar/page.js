'use client'

import { useEffect, useState } from 'react'
import { getSignedUpOpportunities, removeVolunteerFromOpportunity } from "@/src/data/opportunities"
import { VolunteerOpportunityCard } from "@/src/components/opportunityCards/VolunteerOpportunity"
import { Button } from '@nextui-org/react'
import { formatTheDate } from '@/src/utils/formatDate'

export default function VolunteerCalendar() {
    const [opportunities, setOpportunities] = useState([])
    const [selectedOpportunity, setSelectedOpportunity] = useState(null)

    const getAndSetOpportunities = () => {
        getSignedUpOpportunities().then((res) => {
            setOpportunities(res)
        })
    }
    useEffect(() => {
        getAndSetOpportunities()
    }, [])

    const handleViewDetails = (opportunity) => {
        setSelectedOpportunity(opportunity)
    }

    const handleRemoveOpportunity = (opportunityId) => {
        removeVolunteerFromOpportunity(opportunityId).then(()=>{
            getAndSetOpportunities()
        })
    }

    return (
        <div className="p-6 flex">
            {/* Left Column: Signed-Up Opportunities List */}
            <div className="w-1/2 pr-6">
                <h1 className="text-3xl font-semibold mb-6">My Signed-Up Opportunities</h1>
                <div className="grid gap-4">
                    {opportunities.length > 0 ? (
                        opportunities.map((opportunity) => (
                            <VolunteerOpportunityCard 
                                key={opportunity.id}
                                opportunity={opportunity.opportunity}
                                viewType="calendar" // Show "Delete" button in this view
                                onViewDetails={handleViewDetails}
                                onDelete={() => handleRemoveOpportunity(opportunity.opportunity.id)}
                                organizationName={opportunity.opportunity.organization.name}
                            />
                        ))
                    ) : (
                        <p>No signed-up opportunities at the moment.</p>
                    )}
                </div>
            </div>

            {/* Right Column: Selected Opportunity Details */}
            {selectedOpportunity && (
                <div className="w-1/2 ml-6 border rounded-lg p-4 shadow-md bg-white dark:bg-gray-950 dark:border-black">
                    <h2 className="text-2xl font-semibold mb-4">{selectedOpportunity.title}</h2>
                    <p className="text-lg mb-4">Organization: {selectedOpportunity.organization.name}</p>
                    <p className="mb-6">{selectedOpportunity.description}</p>
                    <div className="flex justify-between flex-col">
                        <p><strong>Start Date:</strong> {formatTheDate(selectedOpportunity.start_date)}</p>
                        <p><strong>End Date:</strong> {formatTheDate(selectedOpportunity.end_date)}</p>
                        <p><strong>Location:</strong> {selectedOpportunity.location}</p>
                    </div>
                    {/* Close Details Button */}
                    <Button 
                        onClick={() => setSelectedOpportunity(null)}
                        className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Close Details
                    </Button>
                </div>
            )}
        </div>
    )
}
