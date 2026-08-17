import RentRow from "./RentRow";

const RentTable = ({
    rents,
    loading,
    paymentRequests,
    onManagePayment
}) => {

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm p-8">
                Loading rent records...
            </div>
        );
    }

    if (!rents.length) {
        return (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
                No rent records found.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <table className="min-w-full">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Tenant
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Room
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Billing Month
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Due Date
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Amount
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Status
                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {rents.map((rent) => (

                        <RentRow
                            key={rent.rentId}
                            rent={rent}
                            paymentRequests={paymentRequests}
                            onManagePayment={onManagePayment}
                        />
                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default RentTable;