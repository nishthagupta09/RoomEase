import {
    User,
    BedDouble,
    IndianRupee,
    CreditCard,
    Eye
} from "lucide-react";

const getStatusColor = (status) => {

    switch (status) {

        case "APPROVED":
            return "bg-green-100 text-green-700";

        case "REJECTED":
            return "bg-red-100 text-red-700";

        default:
            return "bg-yellow-100 text-yellow-700";

    }

};

const PaymentRequestCard = ({
    paymentRequest,
    onManage
}) => {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-semibold">

                        {paymentRequest.tenantName}

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Room {paymentRequest.roomNo}
                        {" • "}
                        Bed {paymentRequest.bedLabel}

                    </p>

                </div>

                <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(paymentRequest.status)}`}
                >

                    {paymentRequest.status}

                </span>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">

                <div className="flex items-center gap-3">

                    <IndianRupee size={18}/>

                    <div>

                        <p className="text-xs text-gray-500">

                            Amount

                        </p>

                        <p className="font-medium">

                            ₹{paymentRequest.amount}

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <CreditCard size={18}/>

                    <div>

                        <p className="text-xs text-gray-500">

                            Payment Mode

                        </p>

                        <p className="font-medium">

                            {paymentRequest.paymentMode}

                        </p>

                    </div>

                </div>

            </div>

            <button
                onClick={() => onManage(paymentRequest)}
                className="mt-6 w-full flex justify-center items-center gap-2 border rounded-xl py-3 hover:bg-gray-100 transition"
            >

                <Eye size={18}/>

                Manage Request

            </button>

        </div>

    );

};

export default PaymentRequestCard;