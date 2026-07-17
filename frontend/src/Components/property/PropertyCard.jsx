import PrimaryButton from "../common/PrimaryButton";
import Button from "../common/Button";

function PropertyCard({
    property,
    onManage,
    onEdit,
    onDelete,
    onViewDetails,
    isOwner=true
}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 border">
            <div className="mb-4">

                <h2 className="text-xl font-semibold">
                    {property.propertyName}
                </h2>

                <p className="text-gray-500">
                    {property.city}, {property.state}
                </p>

                <p className="mt-2 font-medium">
                    ₹{property.minRent} - ₹{property.maxRent}
                </p>

            </div>

            <div className="flex gap-3">

                {isOwner ? (
                    <>
                        <PrimaryButton
                            onClick={() => onManage(property.propertyId)}
                        >
                            Manage
                        </PrimaryButton>

                        <Button
                            text="Edit"
                            onClick={() => onEdit(property.propertyId)}
                        />

                        <Button
                            text="Delete"
                            onClick={onDelete}
                        />
                    </>
                ) : (
                    <PrimaryButton
                        onClick={() => onViewDetails(property.propertyId)}
                    >
                        View Details
                    </PrimaryButton>
                )}
            </div>
            
        </div>

    );

}

export default PropertyCard;