import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import propertyService from "../../services/propertyService";
import PropertyCard from "../../Components/property/PropertyCard";

function TenantDashboard() {

    const [properties, setProperties] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await propertyService.getAllAvailableProperties();
            setProperties(response.data);
        } 
        catch (error) {
            console.error(error);
        }
    };

    const handleViewDetails = (propertyId) => {
        navigate(`/tenant/property/${propertyId}`);
    };

    return (

        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Available PGs
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {properties.map(property => (

                    <PropertyCard
                        key={property.propertyId}
                        property={property}
                        isOwner={false}
                        onViewDetails={() => handleViewDetails(property.propertyId)}
                    />

                ))}

            </div>

        </div>

    );

}

export default TenantDashboard;