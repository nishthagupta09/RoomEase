import {
    CalendarDays,
    IndianRupee
} from "lucide-react";

const RentHistoryTable = ({ rents }) => {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-5xl mx-auto">

            <h2 className="text-2xl font-bold mb-6">

                Rent History

            </h2>

            {rents.length === 0 ? (

                <div className="text-center py-10 text-gray-500">

                    No rent history available.

                </div>

            ) : (

                <div className="space-y-4">

                    {rents.map((rent) => (

                        <div
                            key={rent.rentId}
                            className="border rounded-xl p-5 flex justify-between items-center"
                        >

                            <div className="space-y-2">

                                <div className="flex items-center gap-2">

                                    <CalendarDays size={18} />

                                    <span className="font-medium">

                                        {rent.billingPeriod}

                                    </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    <IndianRupee size={18} />

                                    <span>

                                        ₹{rent.amountDue}

                                    </span>

                                </div>

                            </div>

                            <span
                                className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium"
                            >

                                {rent.paymentStatus}

                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default RentHistoryTable;