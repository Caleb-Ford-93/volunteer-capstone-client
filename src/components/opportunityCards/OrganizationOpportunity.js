import { deleteOpportunity } from "@/src/data/opportunities"
import { Button, Link } from "@nextui-org/react"
import { formatTheDate } from "@/src/utils/formatDate"

export const OrganizationOpportunityCard = ({ opportunity, onDelete, showActions = true }) => {

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
        <div className="border rounded-lg shadow-md p-4 mb-4 flex items-start justify-between dark:bg-gray-950 dark:border-black">
            <div className="mr-8">
                <h1 className="text-2xl font-semibold mb-1">{opportunity.title}</h1>
                <p className="text-sm">
                    {formatTheDate(opportunity.start_date)} - {formatTheDate(opportunity.end_date)}
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
