import { deleteOpportunity } from "@/src/data/opportunities"
import { Button, Link } from "@nextui-org/react"

export const OrganizationOpportunityCard = ({ opportunity, onDelete, showActions = true }) => {
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

    const handleDelete = async () => {
        try {
            await deleteOpportunity(opportunity.id)
            onDelete(opportunity.id)
        } catch (error) {
            console.error("Failed to delete opportunity:", error)
            alert("Failed to delete opportunity")
        }
    }

    return (
        <div className="border rounded-lg shadow-md p-4 mb-4 flex items-start justify-between">
            <div className="mr-8">
                <h1 className="text-2xl font-semibold mb-1">{opportunity.title}</h1>
                <p className="text-sm text-gray-500">
                    {formatDate(opportunity.start_date)} - {formatDate(opportunity.end_date)}
                </p>
            </div>
            {showActions && (
            <div className="flex flex-col space-y-2">
                <Button color="success" as={Link} href={`/organization/opportunities/${opportunity.id}`}>
                    Details
                </Button>
                <Button color="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
            )}
        </div>
    )
}
