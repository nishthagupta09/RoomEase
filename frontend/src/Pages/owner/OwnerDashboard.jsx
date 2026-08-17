import { useEffect, useState } from "react";
import api from "../../services/api";
import propertyService from "../../services/propertyService";

import PropertyCard from "../../components/property/PropertyCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import OwnerStats from "./Components/OwnerStats";
import { useNavigate,useParams } from "react-router-dom";
import { User,LogOut } from "lucide-react";

function OwnerDashboard() {

    const [properties,setProperties]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [dashboardStats, setDashboardStats] = useState(null);

    const fullName = localStorage.getItem("fullName");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("fullName");

    navigate("/", { replace: true });
};

    useEffect(() => {
    fetchProperties();
    fetchDashboardStats();}, 
    []);

    const handleManage = (propertyId) => {
        navigate(`/owner/property/${propertyId}`);
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

const fetchDashboardStats = async () => {
    try {
        const response = await propertyService.getOwnerDashboard();

        console.log("Owner Dashboard:", response.data);

        setDashboardStats(response.data);
    } 
    catch (error) {
        console.error("Failed to load dashboard stats:", error);
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
        <div className="flex items-start justify-between mb-10">

            <div className="mb-13">
                    <h1 className="text-4xl font-bold text-emerald-600">
                        Hi, {fullName || "there"}!
                    </h1>
                </div>

            <div className="flex items-center gap-3">

                 <PrimaryButton disabled={loading} className="... disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => navigate("/owner/register-property")}>
                    Register Property
                </PrimaryButton>


                <button
                    onClick={() => navigate("/owner/profile")}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg
                       text-gray-700 hover:bg-gray-100 transition"
                >
                    <User size={20} />
                    Profile
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg
                       text-red-600 hover:bg-red-50 transition"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </div>

        </div>

        <OwnerStats stats={dashboardStats} />

        <div className="mb-8">
            <h1 className="text-3xl font-bold">
                My Properties
            </h1>

            <p className="text-gray-500 mt-1">
                Manage all your properties
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map(property => (

                    <PropertyCard
                        key={property.propertyId}
                        property={property}
                        onManage={()=> handleManage(property.propertyId )}
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