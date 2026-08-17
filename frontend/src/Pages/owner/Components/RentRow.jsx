import { Eye, CreditCard } from "lucide-react";
import { useState } from "react";

const RentRow = 
({ rent,
    onView,
    paymentRequests=[],
    onManagePayment }) => {

    const statusColor = {
        PAID: "bg-green-100 text-green-700",
        PARTIAL: "bg-yellow-100 text-yellow-700",
        PENDING: "bg-blue-100 text-blue-700",
        OVERDUE: "bg-red-100 text-red-700"
    };

    return (

        <tr className="border-t hover:bg-gray-50">

            <td className="px-6 py-4">
                {rent.tenantName}
            </td>

            <td className="px-6 py-4">
                {rent.roomNo} - {rent.bedLabel}
            </td>

            <td className="px-6 py-4">
                {new Date(rent.billingPeriod).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric"
                })}
            </td>

            <td className="px-6 py-4">
                {rent.dueDate}
            </td>

            <td className="px-6 py-4 font-semibold">
                ₹{rent.amountDue}
            </td>

            <td className="px-6 py-4">

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[rent.paymentStatus]}`}
                >
                    {rent.paymentStatus}
                </span>

            </td>

            <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                    <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                    </button>

                    <button 
                        onClick={() => {

                            const request = paymentRequests.find(
                                p => p.rentId === rent.rentId &&
                                    p.status === "PENDING"
                            );

                            console.log(request);

                            if (request) {
                                onManagePayment(request);
                            }

                        }}
                        className="text-green-600 hover:text-green-800">
                        <CreditCard size={18} />
                    </button>

                </div>

            </td>
        </tr>

    );

};

export default RentRow;