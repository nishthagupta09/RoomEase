import { useEffect, useState } from "react";
import tenantService from "../../../services/tenantService";

export default function TenantsTab({ propertyId }) {

    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTenants();
    }, [propertyId]);

    async function loadTenants() {
        try {
            const data =
                await tenantService.getTenantsByProperty(propertyId);

            setTenants(data);
        } 
        catch (err) {
            console.error(err);
        } 
        finally {
            setLoading(false);
        }
    }

    async function handleVacate(tenantId) {

        if (!window.confirm("Are you sure you want to vacate this tenant?")) {
            return;
        }

    try {

        await tenantService.vacateTenant(tenantId);

        setTenants(prev =>
            prev.filter(
                tenant => tenant.tenantId !== tenantId
            )
        );

    } catch (err) {

        console.error(err);

        alert(
            err.response?.data?.message ||
            "Unable to vacate tenant."
        );
    }

}

    if (loading) {
        return (
            <p className="text-gray-500">
                Loading tenants...
            </p>
        );
    }

    return (
        <div className="space-y-6">

            {tenants.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center text-gray-500">
                    No active tenants found.
                </div>
            ) : (

                tenants.map((tenant) => (

                    <div
                        key={tenant.tenantId}
                        className="bg-white rounded-2xl shadow-sm border p-6"
                    >

                        {/* Header */}

                        <div className="flex justify-between items-start">

                            <div>

                                <h2 className="text-3xl font-bold">
                                    {tenant.tenantName}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    📞 {tenant.phoneNo}
                                </p>

                                <p className="text-gray-500">
                                    ✉ {tenant.email}
                                </p>

                            </div>

                            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                                {tenant.status}
                            </span>

                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">

                            <div>
                                <p className="text-gray-500">Room</p>
                                <p className="font-semibold">
                                    {tenant.roomNo}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Bed</p>
                                <p className="font-semibold">
                                    {tenant.bedLabel}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Monthly Rent
                                </p>

                                <p className="font-semibold">
                                    ₹{tenant.monthlyRent}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Move In
                                </p>

                                <p className="font-semibold">
                                    {tenant.moveInDate}
                                </p>
                            </div>

                        </div>

                        <div className="flex justify-end gap-4 mt-8">

                            <button
                                className="px-5 py-2 rounded-lg border hover:bg-gray-50"
                            >
                                View Details
                            </button>

                            <button
                                onClick={() => handleVacate(tenant.tenantId)}
                                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                            >
                                Vacate
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>
    );
}