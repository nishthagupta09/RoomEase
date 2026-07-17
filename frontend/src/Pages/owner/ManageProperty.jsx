import { useParams } from "react-router-dom";

function ManageProperty() {
    const { propertyId } = useParams();

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold">
                Manage Property
            </h1>

            <p className="text-gray-500 mt-2">
                Property ID: {propertyId}
            </p>
        </div>
    );
}

export default ManageProperty;