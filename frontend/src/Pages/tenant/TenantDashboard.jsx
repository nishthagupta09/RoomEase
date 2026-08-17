import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import propertyService from "../../services/propertyService";
import PropertyCard from "../../components/property/PropertyCard";
import SearchBar from "./Components/SearchBar";
import { Menu,Search,FileText,Building2,IndianRupee,Wrench,User} from "lucide-react";
import TenantSidebar from "./Components/TenantSideBar";

function TenantDashboard() {

    const [properties, setProperties] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fullName = localStorage.getItem("fullName");

    const [searchRequest, setSearchRequest] = useState({
        keyword: "",
        city: "",
        genderType: null,
        minRent: null,
        maxRent: null
    });

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

    const handleSearch = async () => {
         console.log("Search button clicked");

        try {
            const data =await propertyService.searchProperties(searchRequest);
            setProperties(data);

        } 
        catch (error) {
            console.error(error);
        }

};

    const clearFilters = async () => {

        const request = {
            keyword: "",
            city: "",
            genderType: null,
            minRent: null,
            maxRent: null
        };

        setSearchRequest(request);

        const data = await propertyService.searchProperties(request);

        setProperties(data);

    };

    return (

        <div className="relative min-h-screen bg-gray-100">

            <div className="flex items-center gap-4 mb-8 pt-4 p-6">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition"
                >
                    <Menu size={26} />
                </button>
            </div>

            <TenantSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />


            {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/10 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

            <div className="max-w-5xl mx-auto px-6 pb-8">

                <div className="mb-13">
                    <h1 className="text-4xl font-bold text-emerald-600">
                        Hi, {fullName || "there"}!
                    </h1>

                    <p className="text-gray-500 text-lg mt-2">
                        Looking for a PG? Find the perfect place for you.
                    </p>
                </div>
                

                <h2 className="text-3xl font-bold mb-8">
                    Available PGs
                </h2>

                <SearchBar
                    searchRequest={searchRequest}
                    setSearchRequest={setSearchRequest}
                    handleSearch={handleSearch}
                    clearFilters={clearFilters}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {properties.length === 0 ? (

                        <div className="text-center py-16 text-gray-500">
                            No PGs found.
                        </div>

                    ) : (

                        properties.map((property) => (
                            <PropertyCard
                                key={property.propertyId}
                                property={property}
                                isOwner={false}
                                onViewDetails={() => handleViewDetails(property.propertyId)}
                            />
                        ))
                    )}

                </div>
            </div>

        </div>

    );

}

export default TenantDashboard;