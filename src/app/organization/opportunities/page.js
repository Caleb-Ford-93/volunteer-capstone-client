'use client'
import { getOrganizationOpportunities } from "@/src/data/opportunities"
import { useEffect, useState } from "react"

export default function OrganizationOpportunities() {
    const [opportunities, setOpportunities] = useState()

    const getAndSetOpportunities = () => {
        getOrganizationOpportunities().then((res) => {
            setOpportunities(res)
        })
    }
    useEffect(()=>{
        getAndSetOpportunities()
    },[])

    return <>
    {opportunities?.map((opportunity) => {<h1>{opportunity.title}</h1>})}
    </>
}