import { useParams,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import {
    LayoutDashboard,
    DoorOpen,
    FileText,
    Users,
    BarChart3,
    ArrowLeft,
    ReceiptIndianRupee,
    Wrench
} from "lucide-react";

import ApplicationsTab from "./TabComponents/ApplicationsTab";
import RoomsTab from "./TabComponents/RoomTab";
import TenantsTab from "./TabComponents/TenantTab";
import RentTab from "./TabComponents/RentTab";
import propertyService from "../../services/propertyService";
import ComplaintsTab from "./TabComponents/ComplaintsTab";

const ManageProperty = () => {

    const navigate = useNavigate();
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);

    const [activeTab, setActiveTab] = useState("dashboard");

    useEffect(() => {
        fetchProperty();
    }, [propertyId]);

    const fetchProperty = async () => {

        try {
            const response = await propertyService.getPropertyDetails(propertyId);
            setProperty(response.data);
        } 
        catch (error) {
            console.error("Failed to fetch property", error);
        }

    };

    const tabs = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutDashboard
        },
        {
            id: "rooms",
            label: "Rooms",
            icon: DoorOpen
        },
        {
            id: "applications",
            label: "Applications",
            icon: FileText
        },
        {
            id: "tenants",
            label: "Tenants",
            icon: Users
        },
        {
            id: "rent",
            label: "Rent",
            icon: ReceiptIndianRupee
        },
        {
            id: "complaints",
            label: "Complaints",
            icon: Wrench
        },
    ];



     return (
        <div className="min-h-screen bg-gray-100">

            <div className="bg-white shadow">

                <div className="max-w-7xl mx-auto px-8 py-6">

                    <button
                        onClick={() => navigate("/owner/dashboard")}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <h1 className="text-3xl font-bold mt-4">
                        {property?.propertyName}
                    </h1>

                    <p className="text-gray-500">
                        Property ID : {property?.propertyId}
                    </p>

                </div>

            </div>

            <div className="bg-white border-b">

                <div className="max-w-7xl mx-auto flex">

                    {tabs.map((tab) => {

                        const Icon = tab.icon;

                        return (

                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all
                                
                                ${activeTab === tab.id
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-black"
                                    }
                                
                                `}
                            >

                                <Icon size={18} />

                                {tab.label}

                            </button>

                        );

                    })}

                </div>

            </div>

            <div className="max-w-7xl mx-auto p-8">

                {activeTab === "dashboard" &&
                    <div className="text-2xl font-semibold">
                        Dashboard
                    </div>
                }

                {activeTab === "rooms" &&
                    <RoomsTab propertyId={propertyId}/>
                }

                {activeTab === "applications" &&
                    <ApplicationsTab propertyId={propertyId} />
                }

                 {activeTab === "tenants" && (
                     <TenantsTab
                         propertyId={propertyId}
                     />
                 )}

                {activeTab === "rent" &&
                    <RentTab
                       propertyId={propertyId}
                    />
                }

                {activeTab === "complaints" &&
                    <ComplaintsTab
                       propertyId={propertyId}
                    />
                }

            </div>

        </div>
    );

};

export default ManageProperty;