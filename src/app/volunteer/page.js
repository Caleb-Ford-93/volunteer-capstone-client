'use client'

import { useEffect, useState } from 'react'
import { getSignedUpOpportunities } from "@/src/data/opportunities"
import { VolunteerOpportunityCard } from "@/src/components/opportunityCards/VolunteerOpportunity"

export default function VolunteerDashboard() {
    const [upcomingOpportunities, setUpcomingOpportunities] = useState([])
    const [passedOpportunities, setPassedOpportunities] = useState([])

    useEffect(() => {
        getSignedUpOpportunities().then((opportunities) => {
            const now = new Date()
            const upcoming = []
            const passed = []

            opportunities.forEach(opportunity => {
                const endDate = new Date(opportunity.opportunity.end_date)
                if (endDate >= now) {
                    upcoming.push(opportunity.opportunity)
                } else {
                    passed.push(opportunity.opportunity)
                }
            })

            setUpcomingOpportunities(upcoming)
            setPassedOpportunities(passed)
        })
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Volunteer Dashboard</h1>

            {/* Upcoming Opportunities Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Opportunities</h2>
                <div className="grid gap-4">
                    {upcomingOpportunities.length > 0 ? (
                        upcomingOpportunities.map(opportunity => (
                            <VolunteerOpportunityCard 
                                key={opportunity.id} 
                                opportunity={opportunity}
                                viewType="calendar"
                                organizationName={opportunity.organization.name}
                                showButtons={false}
                            />
                        ))
                    ) : (
                        <p>No upcoming opportunities.</p>
                    )}
                </div>
            </div>

            {/* Recently Passed Opportunities Section */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Recently Passed Opportunities</h2>
                <div className="grid gap-4">
                    {passedOpportunities.length > 0 ? (
                        passedOpportunities.map(opportunity => (
                            <VolunteerOpportunityCard 
                                key={opportunity.id} 
                                opportunity={opportunity}
                                viewType="calendar"
                                organizationName={opportunity.organization.name}
                            />
                        ))
                    ) : (
                        <p>No recently passed opportunities.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
