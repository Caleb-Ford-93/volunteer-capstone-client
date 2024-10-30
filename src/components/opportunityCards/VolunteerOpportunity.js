import { Button } from "@nextui-org/react"
import Link from "next/link";

export const VolunteerOpportunityCard = ({ 
    opportunity, 
    viewType, 
    onViewDetails, 
    organizationName,
    onViewOrganization,
    onDelete,
    showButtons = true 
    }) => {
    const formatDate = (dateString) => {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const monthName = monthNames[parseInt(month, 10) - 1];
    return `${monthName} ${parseInt(day, 10)}, ${year}`;
}

    return (
        <div className="border rounded-lg shadow-md p-4 mb-4 flex items-start justify-between">
            <div className="mr-8">
                <h1 className="text-2xl font-semibold mb-1">{opportunity.title}</h1>
                <p className="text-sm text-gray-500">
                    {formatDate(opportunity.start_date)} - {formatDate(opportunity.end_date)}
                </p>
                <p className="text-sm text-gray-500">Organization: {organizationName}</p>
            </div>
            {showButtons && (
                <div className="flex flex-col space-y-2">
                    {viewType === "calendar" ? (
                        <Button color="primary" auto onPress={() => onViewDetails(opportunity)}>
                            View Details
                        </Button>
                    ) : (
                        <Button color="primary" as={Link} href={`opportunities/${opportunity.id}`}>
                            View Details
                        </Button>
                    )}
                    {viewType === "calendar" ? (
                        <Button color="danger" auto onPress={()=> onDelete(opportunity.id)}>
                            Remove
                        </Button>
                    ) : (
                        <Button color="success" auto onPress={()=> onViewOrganization(opportunity.organization)}>
                            View Organization
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}
