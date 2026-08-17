import { Clock3 } from "lucide-react";

const PaymentRequestBanner = ({ paymentRequest }) => {

    if (!paymentRequest) {
        return null;
    }

    return (

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex gap-4 items-start max-w-5xl mx-auto">

            <div className="bg-yellow-100 p-3 rounded-full">

                <Clock3
                    size={22}
                    className="text-yellow-700"
                />

            </div>

            <div>

                <h2 className="font-semibold text-yellow-800 text-lg">

                    Payment Request Pending

                </h2>

                <p className="text-yellow-700 mt-1">

                    Your payment request has been submitted and is awaiting owner approval.

                </p>

                <div className="mt-4 text-sm text-yellow-800 space-y-1">

                    <p>

                        Amount :
                        <span className="font-medium ml-2">

                            ₹{paymentRequest.amount}

                        </span>

                    </p>

                    <p>

                        Payment Mode :
                        <span className="font-medium ml-2">

                            {paymentRequest.paymentMode}

                        </span>

                    </p>

                    <p>

                        Submitted On :
                        <span className="font-medium ml-2">

                            {paymentRequest.requestedAt?.substring(0,10)}

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

};

export default PaymentRequestBanner;