import { useEffect, useState } from "react";
import rentService from "../../../services/rentService";

import RentTable from "../Components/RentTable";
import RentSummaryCard from "../Components/RentSummaryCard";
import paymentRequestService from "../../../services/paymentRequestService";
import ManagePaymentModal from "../Components/ManagePaymentModal";


const RentTab = ({ propertyId }) => {

    const [summary, setSummary] = useState(null);
    const [rents, setRents] = useState([]);
    const [paymentRequests, setPaymentRequests] = useState([]);
    const [selectedPaymentRequest, setSelectedPaymentRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRentData();
    }, [propertyId]);

    const fetchRentData = async () => {

        try {
            setLoading(true);
            const [
                summaryResponse,
                rentResponse,
                paymentRequestResponse
            ] = await Promise.all([

                rentService.getRentSummary(propertyId),

                rentService.getPropertyRents(propertyId),

                paymentRequestService.getPaymentRequestsByProperty(propertyId)

            ]);

            console.log("Summary Response:", summaryResponse);
            console.log("Rent Response:", rentResponse);
            console.log("Payment Requests:", paymentRequestResponse);

            setSummary(summaryResponse);
            setRents(rentResponse);
            setPaymentRequests(paymentRequestResponse);

        } 
        catch (error) {
            console.error("Failed to fetch rent data", error);
        } 
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Rent Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage tenant rent payments and payment history.
                </p>
            </div>

            <RentSummaryCard
                summary={summary}
                loading={loading}
            />

            <RentTable
                rents={rents}
                loading={loading}
                paymentRequests={paymentRequests}
                onManagePayment={(request) =>
                    setSelectedPaymentRequest(request)}
            />

            {selectedPaymentRequest && (

                <ManagePaymentModal
                    paymentRequest={selectedPaymentRequest}
                    onClose={() =>setSelectedPaymentRequest(null)}
                    onSuccess={() => {
                        setSelectedPaymentRequest(null);
                        fetchRentData();
                    }}
                />
            )}

        </div>
    );
};

export default RentTab;