import {
    Building2,
    Users,
    BedDouble,
    IndianRupee
} from "lucide-react";

const OwnerStats = ({ stats }) => {

    if (!stats) {
        return null;
    }

    const cards = [
        {
            title: "Total Properties",
            value: stats.totalProperties,
            icon: Building2
        },
        {
            title: "Active Tenants",
            value: stats.activeTenants,
            icon: Users
        },
        {
            title: "Occupancy Rate",
            value: `${stats.occupancyRate}%`,
            icon: BedDouble
        },
        {
            title: "Expected Monthly Revenue",
            value: `₹${Number(stats.expectedMonthlyRevenue || 0).toLocaleString("en-IN")}`,
            icon: IndianRupee
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {cards.map(({ title, value, icon: Icon }) => (

                <div
                    key={title}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500 mb-2">
                                {title}
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                                {value}
                            </p>
                        </div>

                        <div className="bg-emerald-50 p-3 rounded-xl">
                            <Icon
                                size={24}
                                className="text-emerald-600"
                            />
                        </div>

                    </div>
                </div>

            ))}

        </div>
    );
};

export default OwnerStats;