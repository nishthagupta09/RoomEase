import {
    IndianRupee,
    Clock3,
    AlertTriangle,
    Wallet
} from "lucide-react";

const RentSummaryCard = ({ summary, loading }) => {

    if (loading) {
        return (
            <div className="grid grid-cols-4 gap-6">
                Loading...
            </div>
        );
    }

    const cards = [
        {
            title: "Collected",
            value: `₹${summary.totalCollected}`,
            icon: Wallet,
            color: "bg-green-50 text-green-700"
        },
        {
            title: "Pending",
            value: `₹${summary.pendingAmount}`,
            icon: Clock3,
            color: "bg-yellow-50 text-yellow-700"
        },
        {
            title: "Overdue",
            value: `₹${summary.overdueAmount}`,
            icon: AlertTriangle,
            color: "bg-red-50 text-red-700"
        },
        {
            title: "Paid Records",
            value: summary.totalPaid,
            icon: IndianRupee,
            color: "bg-blue-50 text-blue-700"
        }
    ];

    return (

        <div className="grid grid-cols-4 gap-6">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="bg-white rounded-2xl shadow-sm p-6"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500 text-sm">
                                    {card.title}
                                </p>

                                <h2 className="text-2xl font-bold mt-2">
                                    {card.value}
                                </h2>

                            </div>

                            <div className={`p-3 rounded-xl ${card.color}`}>
                                <Icon size={24} />
                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default RentSummaryCard;