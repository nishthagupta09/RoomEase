import { useState } from "react";
import { X } from "lucide-react";

import paymentRequestService from "../../../services/paymentRequestService";

const PayRentModal = ({
    rent,
    onClose,
    onSuccess
}) => {

    const remainingAmount =
    Number(rent.amountDue) - Number(rent.amountPaid || 0);

    const [formData, setFormData] = useState({

        amount: rent.amountDue,

        paymentMode: "UPI",

        transactionReference: "",

        remarks: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setError("");

            await paymentRequestService.createPaymentRequest({

                rentId: rent.rentId,

                amount: formData.amount,

                paymentMode: formData.paymentMode,

                transactionReference: formData.transactionReference,

                remarks: formData.remarks

            });

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to submit payment request."

            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="fixed inset-0 bg-black/20 z-50 flex justify-center items-center px-4"
            onClick={onClose}
        >

            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-7"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        Submit Payment Request

                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >

                        <X size={20} />

                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="font-medium text-gray-700">

                            Amount

                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full mt-2 border rounded-xl px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="font-medium text-gray-700">

                            Payment Mode

                        </label>

                        <select
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            className="w-full mt-2 border rounded-xl px-4 py-3"
                        >

                            <option value="UPI">

                                UPI

                            </option>

                            <option value="BANK_TRANSFER">

                                Bank Transfer

                            </option>

                            <option value="CASH">

                                Cash

                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="font-medium text-gray-700">

                            Transaction Reference

                        </label>

                        <input
                            type="text"
                            name="transactionReference"
                            value={formData.transactionReference}
                            onChange={handleChange}
                            placeholder="UTR / Transaction ID"
                            className="w-full mt-2 border rounded-xl px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="font-medium text-gray-700">

                            Remarks

                        </label>

                        <textarea
                            rows={4}
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            className="w-full mt-2 border rounded-xl px-4 py-3 resize-none"
                        />

                    </div>


                    {error && (

                        <p className="text-red-600 text-sm">

                            {error}

                        </p>

                    )}


                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border rounded-xl px-5 py-2"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 disabled:opacity-60"
                        >

                            {loading
                                ? "Submitting..."
                                : "Submit Request"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default PayRentModal;