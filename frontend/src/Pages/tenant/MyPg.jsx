import { useEffect, useState } from "react";
import {
    Menu,
    Building2,
    MapPin,
    BedDouble,
    CalendarDays,
    IndianRupee,
    User,
    Phone,
    Mail,
    Home
} from "lucide-react";

import tenantService from "../../services/tenantService";
import TenantSidebar from "./Components/TenantSideBar";

const MyPg = () => {

    const [pg, setPg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        loadMyPg();
    }, []);

    const loadMyPg = async () => {

        try {

            setLoading(true);

            const data = await tenantService.getMyPg();

            console.log("My PG:", data);

            setPg(data);

        } catch (error) {

            console.error("Failed to load My PG:", error);

            setError(
                error.response?.data?.message ||
                "You are not currently staying in any PG."
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Loading your PG...
                </p>
            </div>
        );
    }


    return (

        <div className="relative min-h-screen bg-gray-100">

            <TenantSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {sidebarOpen && (

                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setSidebarOpen(false)}
                />

            )}

            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-6 left-6 z-30 p-2 rounded-xl hover:bg-gray-200 transition"
            >
                <Menu size={28} />
            </button>

            <main className="max-w-6xl mx-auto px-8 py-10">

                <div className="mb-10">

                    <h1 className="text-4xl font-bold">
                        My PG
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        View your current accommodation and room details.
                    </p>

                </div>

                {error && (

                    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">

                        <div className="flex justify-center mb-5">

                            <div className="bg-emerald-50 p-4 rounded-full">

                                <Home
                                    size={32}
                                    className="text-emerald-600"
                                />

                            </div>

                        </div>

                        <h2 className="text-2xl font-semibold">
                            No Active PG
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {error}
                        </p>

                    </div>

                )}

                {pg && (

                    <div className="space-y-6">

                        <div className="bg-white border border-gray-200 rounded-2xl p-8">

                            <div className="flex items-start justify-between">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <Building2
                                            size={28}
                                            className="text-emerald-600"
                                        />

                                        <h2 className="text-3xl font-bold">
                                            {pg.propertyName}
                                        </h2>

                                    </div>


                                    <div className="flex items-center gap-2 mt-4 text-gray-500">

                                        <MapPin size={18} />

                                        <span>
                                            {pg.address}, {pg.city}, {pg.state}
                                        </span>

                                    </div>

                                </div>


                                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">

                                    Active Tenant

                                </span>

                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="bg-white border border-gray-200 rounded-2xl p-7">

                                <div className="flex items-center gap-3 mb-6">

                                    <BedDouble
                                        size={23}
                                        className="text-emerald-600"
                                    />

                                    <h3 className="text-xl font-semibold">
                                        My Room
                                    </h3>

                                </div>


                                <div className="space-y-5">


                                    <InfoRow
                                        label="Room Number"
                                        value={pg.roomNo}
                                    />


                                    <InfoRow
                                        label="Bed"
                                        value={pg.bedLabel}
                                    />


                                    <InfoRow
                                        label="Room Type"
                                        value={pg.roomType}
                                    />


                                </div>

                            </div>

                            <div className="bg-white border border-gray-200 rounded-2xl p-7">

                                <div className="flex items-center gap-3 mb-6">

                                    <CalendarDays
                                        size={23}
                                        className="text-emerald-600"
                                    />

                                    <h3 className="text-xl font-semibold">
                                        Stay Details
                                    </h3>

                                </div>


                                <div className="space-y-5">


                                    <InfoRow
                                        label="Move In Date"
                                        value={pg.moveInDate}
                                    />


                                    <div className="flex justify-between items-center">

                                        <span className="text-gray-500">
                                            Monthly Rent
                                        </span>

                                        <div className="flex items-center font-semibold">

                                            <IndianRupee size={16} />

                                            {pg.monthlyRent}

                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-7">

                            <div className="flex items-center gap-3 mb-7">

                                <User
                                    size={23}
                                    className="text-emerald-600"
                                />

                                <h3 className="text-xl font-semibold">
                                    Owner Details
                                </h3>

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                                <div>

                                    <p className="text-sm text-gray-500 mb-2">
                                        Owner
                                    </p>

                                    <div className="flex items-center gap-2 font-medium">

                                        <User size={18} />

                                        {pg.ownerName}

                                    </div>

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500 mb-2">
                                        Phone
                                    </p>

                                    <div className="flex items-center gap-2 font-medium">

                                        <Phone size={18} />

                                        {pg.ownerPhone}

                                    </div>

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500 mb-2">
                                        Email
                                    </p>

                                    <div className="flex items-center gap-2 font-medium">

                                        <Mail size={18} />

                                        {pg.ownerEmail}

                                    </div>

                                </div>


                            </div>

                        </div>


                    </div>

                )}

            </main>

        </div>

    );

};


const InfoRow = ({ label, value }) => {

    return (

        <div className="flex justify-between items-center">

            <span className="text-gray-500">
                {label}
            </span>

            <span className="font-semibold">
                {value || "—"}
            </span>

        </div>

    );

};


export default MyPg;