import {
    CalendarDays,
    IndianRupee,
    Home,
    BedDouble
} from "lucide-react";

const CurrentRentCard = ({
    rent,
    pendingRequest,
    onPay
}) => {
      if (!rent) {
        return (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-500">
                No current rent available.
            </div>
        );
    }

     const remainingAmount = Number(rent.amountDue) - Number(rent.amountPaid || 0);

    const getStatusColor = (status) => {
    switch (status) {
        case "PAID":
            return "bg-green-100 text-green-700";

        case "PARTIAL":
            return "bg-yellow-100 text-yellow-700";

        case "OVERDUE":
            return "bg-red-100 text-red-700";

        default: // PENDING
            return "bg-blue-100 text-blue-700";
    }
};

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-5xl mx-auto">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-bold">
                        {new Date(rent.billingPeriod).toLocaleDateString("en-IN", {
                            month: "long",
                            year: "numeric"
                        })}
                    </h2>

                </div>

                

                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    rent.paymentStatus
                )}`}
                >
                    {rent.paymentStatus}

                </span>

            </div>


            <div className="grid grid-cols-2 gap-8 mt-8">

                <div className="flex items-center gap-3">

                    <IndianRupee size={22} />

                    <div>

                        <p className="text-sm text-gray-500">
                            Amount Due
                        </p>

                        <p className="font-semibold text-lg">
                            ₹{remainingAmount}
                        </p>

                    </div>

                </div>


                <div className="flex items-center gap-3">

                    <CalendarDays size={22} />

                    <div>

                        <p className="text-sm text-gray-500">
                            Due Date
                        </p>

                        <p className="font-semibold">
                            {rent.dueDate}
                        </p>

                    </div>

                </div>


                <div className="flex items-center gap-3">

                    <Home size={22} />

                    <div>

                        <p className="text-sm text-gray-500">
                            Room
                        </p>

                        <p className="font-semibold">
                            {rent.roomNo}
                        </p>

                    </div>

                </div>


                <div className="flex items-center gap-3">

                    <BedDouble size={22} />

                    <div>

                        <p className="text-sm text-gray-500">
                            Bed
                        </p>

                        <p className="font-semibold">
                            {rent.bedLabel}
                        </p>

                    </div>

                </div>

            </div>


            <div className="mt-8 pt-6 border-t">

    {pendingRequest ? (

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">

            <h3 className="font-semibold text-yellow-800">

                ✓ Payment Request Submitted

            </h3>

            <p className="text-sm text-yellow-700 mt-1">

                Your payment request is awaiting owner approval.

            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">

                <div>

                    <p className="text-gray-500">
                        Payment Mode
                    </p>

                    <p className="font-medium">
                        {pendingRequest.paymentMode}
                    </p>

                </div>

                <div>

                    <p className="text-gray-500">
                        Submitted On
                    </p>

                    <p className="font-medium">
                        {pendingRequest.requestedAt?.substring(0,10)}
                    </p>

                </div>

            </div>

                    </div>

                ) : (

                    <button
                        onClick={onPay}
                        className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
                    >

                        Submit Payment Request

                    </button>

                )}

            </div>

        </div>

    );

};

export default CurrentRentCard;