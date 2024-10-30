import { Button } from "@nextui-org/react"


export const VolunteerOpportunityCard = ({ opportunity, viewType, onDelete }) => {
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
                <p className="text-sm text-gray-500">Organization: {opportunity.organization.name}</p>
            </div>
            <div className="flex flex-col space-y-2">
                <Button color="primary" as="a" href={`/opportunities/${opportunity.id}`}>
                    View Details
                </Button>
                {viewType === "calendar" ? (
                    <Button color="danger" auto onPress={() => onDelete(opportunity.id)}>
                        Delete
                    </Button>
                ) : (
                    <Button color="success" auto as="a" href={`/organization/${opportunity.organization_id}`}>
                        View Organization
                    </Button>
                )}
            </div>
        </div>
    )
}
