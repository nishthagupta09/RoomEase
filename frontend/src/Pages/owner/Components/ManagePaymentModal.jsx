import paymentRequestService from "../../../services/paymentRequestService";

const ManagePaymentModal = ({
    paymentRequest,
    onClose,
    onSuccess
}) => {

    const handleApprove = async () => {

        try {

            await paymentRequestService.approvePaymentRequest(
                paymentRequest.paymentRequestId
            );

            onSuccess();

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleReject = async () => {

        try {

            await paymentRequestService.rejectPaymentRequest(
                paymentRequest.paymentRequestId
            );

            onSuccess();

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Payment Request
                </h2>

                <div className="space-y-5">

                    <div>
                        <p className="text-sm text-gray-500">Tenant</p>
                        <p className="font-semibold">
                            {paymentRequest.tenantName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Room</p>
                        <p className="font-semibold">
                            {paymentRequest.roomNo} • {paymentRequest.bedLabel}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-semibold">
                            ₹{paymentRequest.amount}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Payment Mode</p>
                        <p className="font-semibold">
                            {paymentRequest.paymentMode}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Transaction Reference
                        </p>
                        <p className="font-semibold">
                            {paymentRequest.transactionReference}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Remarks
                        </p>
                        <p>
                            {paymentRequest.remarks || "No remarks"}
                        </p>
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-xl"
                    >
                        Close
                    </button>

                    <button
                        onClick={handleReject}
                        className="px-5 py-2 rounded-xl bg-red-600 text-white"
                    >
                        Reject
                    </button>

                    <button
                        onClick={handleApprove}
                        className="px-5 py-2 rounded-xl bg-emerald-600 text-white"
                    >
                        Accept
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ManagePaymentModal;