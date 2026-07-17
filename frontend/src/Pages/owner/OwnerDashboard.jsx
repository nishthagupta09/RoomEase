import { useEffect, useState } from "react";
import api from "../../services/api";
import propertyService from "../../services/propertyService";

import PropertyCard from "../../components/property/PropertyCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigate,useParams } from "react-router-dom";

function OwnerDashboard() {

    const [properties,setProperties]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
    fetchProperties();}, 
    []);

    const handleManage = (propertyId) => {
    console.log(propertyId);
};

const handleEdit = (propertyId) => {
    navigate(`/owner/edit-property/${propertyId}`);
};

    const handleDelete = async (propertyId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmed) return;
        try {
            await propertyService.deleteProperty(propertyId);
            setProperties(prev =>
                prev.filter(property => property.propertyId !== propertyId)
            );
        } 
        catch (error) {
            alert("Unable to delete property.");
            console.error(error);
        }
    };

    const fetchProperties = async () => {
    try {
        const response =await propertyService.getMyProperties();
        setProperties(response.data);

    } 
    catch (err) {
        console.log(err);
        console.log(err.response);
        console.log(err.response?.data);
        setError("Unable to load properties.");
    } 
    finally {
        setLoading(false);
    }
};

if (loading) {
    return <h2>Loading...</h2>;
}

if (error) {
    return <h2>{error}</h2>;
}


return (

    <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
            <div>

                <h1 className="text-3xl font-bold">
                    My Properties
                </h1>

                <p className="text-gray-500">
                    Manage all your properties
                </p>

            </div>

            <PrimaryButton disabled={loading} className="... disabled:opacity-70 disabled:cursor-not-allowed" 
            onClick={() => navigate("/owner/register-property")}>
                Register Property
            </PrimaryButton>

        </div>

        
            

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map(property => (

                    <PropertyCard
                        key={property.propertyId}
                        property={property}
                        onManageRooms={handleManage}
                        onEdit={() => handleEdit(property.propertyId)}
                        onDelete={() => handleDelete(property.propertyId)}
                    />
                ))
            }

        </div>

    </div>

);

    
}

export default OwnerDashboard;