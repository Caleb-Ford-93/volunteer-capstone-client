'use client'
import { useEffect, useState } from 'react'
import { getOrganizationOpportunities } from '@/src/data/opportunities'
import { OrganizationOpportunityCard } from '@/src/components/opportunityCards/OrganizationOpportunity'

export default function OrganizationDashboard() {
    const [currentWeekOpportunities, setCurrentWeekOpportunities] = useState([])
    const [recentlyPassedOpportunities, setRecentlyPassedOpportunities] = useState([])

    useEffect(() => {
        const fetchOpportunities = async () => {
            const allOpportunities = await getOrganizationOpportunities()
            const today = new Date()
            const startOfCurrentWeek = new Date(today)
            startOfCurrentWeek.setDate(today.getDate() - today.getDay())
            const endOfCurrentWeek = new Date(startOfCurrentWeek)
            endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 6) 


            const twoWeeksAgo = new Date(today)
            twoWeeksAgo.setDate(today.getDate() - 14)


            const currentWeek = allOpportunities.filter((opportunity) => {
                const startDate = new Date(opportunity.start_date)
                const endDate = new Date(opportunity.end_date)
                return (
                    (startDate >= startOfCurrentWeek && startDate <= endOfCurrentWeek) ||
                    (endDate >= startOfCurrentWeek && endDate <= endOfCurrentWeek)
                )
            })

            const recentlyPassed = allOpportunities.filter((opportunity) => {
                const endDate = new Date(opportunity.end_date)
                return endDate >= twoWeeksAgo && endDate < today
            })

            setCurrentWeekOpportunities(currentWeek)
            setRecentlyPassedOpportunities(recentlyPassed)
        }

        fetchOpportunities()
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Organization Dashboard</h1>
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Opportunities This Week</h2>
                {currentWeekOpportunities.length > 0 ? (
                    currentWeekOpportunities.map((opportunity) => (
                        <OrganizationOpportunityCard key={opportunity.id} opportunity={opportunity} showActions={false}/>
                    ))
                ) : (
                    <p>No opportunities this week.</p>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Recently Passed Opportunities</h2>
                {recentlyPassedOpportunities.length > 0 ? (
                    recentlyPassedOpportunities.map((opportunity) => (
                        <OrganizationOpportunityCard key={opportunity.id} opportunity={opportunity} showActions={false}/>
                    ))
                ) : (
                    <p>No recently passed opportunities.</p>
                )}
            </div>
        </div>
    )
}
