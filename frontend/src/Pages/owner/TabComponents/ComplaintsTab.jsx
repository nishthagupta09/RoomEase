import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

import complaintService from "../../../services/complaintService";
import OwnerComplaintCard from "../Components/OwnerComplaintCard";
import ManageComplaintModal from "../Components/ManageComplaintModal";

const ComplaintsTab = ({ propertyId }) => {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedComplaint, setSelectedComplaint] = useState(null);


    useEffect(() => {
        loadComplaints();
    }, [propertyId]);


    const loadComplaints = async () => {

        try {

            setLoading(true);

            const data =
                await complaintService.getPropertyComplaints(
                    propertyId
                );

            setComplaints(data);

        } catch (error) {

            console.error(
                "Failed to load property complaints",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    const filteredComplaints =
        statusFilter === "ALL"
            ? complaints
            : complaints.filter(
                complaint =>
                    complaint.status === statusFilter
            );


    if (loading) {

        return (

            <div className="bg-white rounded-2xl border border-gray-200 p-8">

                <p className="text-gray-500">
                    Loading complaints...
                </p>

            </div>

        );
    }


    return (

        <div className="space-y-8">

            <div className="flex items-start justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Complaints
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage tenant complaints and maintenance issues.
                    </p>

                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >

                    <option value="ALL">
                        All Complaints
                    </option>

                    <option value="OPEN">
                        OPEN
                    </option>

                    <option value="IN_PROGRESS">
                        IN PROGRESS
                    </option>

                    <option value="RESOLVED">
                        RESOLVED
                    </option>

                </select>

            </div>

            {filteredComplaints.length === 0 ? (

                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">

                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">

                        <Wrench
                            size={26}
                            className="text-gray-500"
                        />

                    </div>

                    <h2 className="text-xl font-semibold">

                        {statusFilter === "ALL"
                            ? "No Complaints"
                            : `No ${statusFilter
                                .replace("_", " ")
                                .toLowerCase()} complaints`
                        }

                    </h2>

                    <p className="text-gray-500 mt-2">
                        Tenant complaints for this property will appear here.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {filteredComplaints.map(
                        complaint => (

                            <OwnerComplaintCard
                                key={complaint.complaintId}
                                complaint={complaint}
                                onManage={setSelectedComplaint}
                            />

                        )
                    )}

                </div>

            )}

            {selectedComplaint && (

                <ManageComplaintModal
                    complaint={selectedComplaint}
                    onClose={() => setSelectedComplaint(null)}
                    onUpdated={loadComplaints}
                />

            )}

        </div>

    );
};


export default ComplaintsTab;