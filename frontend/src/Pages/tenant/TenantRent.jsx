import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import TenantSidebar from "./Components/TenantSideBar";

import CurrentRentCard from "./Components/CurrentRentCard";
import RentHistoryTable from "./Components/RentHistoryTable";
import PaymentRequestBanner from "./Components/PaymentRequestBanner";
import PayRentModal from "./Components/PayRentModal";

import rentService from "../../services/rentService";
import paymentRequestService from "../../services/paymentRequestService";

const TenantRent = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [rentHistory, setRentHistory] = useState([]);

    const [currentRent, setCurrentRent] = useState(null);

    const [pendingRequest, setPendingRequest] = useState(null);

    const [selectedRent, setSelectedRent] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            setLoading(true);

            const rents = await rentService.getMyRent();
            setRentHistory(rents);

            const activeRent = rents.find(
                rent =>
                    rent.paymentStatus === "PENDING" ||
                    rent.paymentStatus === "PARTIAL" ||
                    rent.paymentStatus === "OVERDUE"
            );

            setCurrentRent(activeRent || null);

            const paymentResponse = await paymentRequestService.getMyPaymentRequests();

            const pending =
                paymentResponse.find(
                    request =>
                        request.status === "PENDING"
                );

            setPendingRequest(pending || null);

        }

        catch (error) {
            console.error(error);
        }

        finally {
            setLoading(false);
        }

    };

    if (loading) {

        return (

            <div className="flex justify-center py-20">
                Loading...
            </div>

        );

    }

    const history = rentHistory.filter( rent => rent.rentId !== currentRent?.rentId);

    return (

        <div className="relative min-h-screen bg-gray-50">

            {sidebarOpen && (

                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setSidebarOpen(false)}
                />

            )}

            <TenantSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {!sidebarOpen && (

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-8 left-8 z-50 p-2 rounded-xl hover:bg-gray-200 transition"
                >

                    <Menu size={26} />

                </button>

            )}

            <div className="max-w-5xl mx-auto px-8 pt-10 pb-16">

                <h1 className="text-4xl font-bold">
                    Rent
                </h1>

                <p className="text-gray-500 mt-2 text-lg mb-8">
                    View your rent details and payment history.
                </p>

                <div className="space-y-8">

                    <CurrentRentCard
                        rent={currentRent}
                        pendingRequest={pendingRequest}
                        onPay={() => setSelectedRent(currentRent)}
                    />

                    <RentHistoryTable
                        rents={history}
                    />

                </div>

            </div>

            {selectedRent && (

                <PayRentModal
                    rent={selectedRent}
                    onClose={() => setSelectedRent(null)}
                    onSuccess={() => {
                        setSelectedRent(null);
                        loadData();
                    }}
                />

            )}

        </div>

    );

};

export default TenantRent;