import { useEffect, useState } from "react";
import applicationService from "../../../services/applicationService";
import AssignTenantModal from "../Components/AssignTenantModal";

const ApplicationsTab = ({ propertyId }) => {

    const [applications, setApplications] = useState([]);

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);

    useEffect(() => {
        loadApplications();
    }, [propertyId]);

    const loadApplications = async () => {

        try {
            const data = await applicationService.getApplicationsForProperty(propertyId);
            setApplications(data);
        } 
        catch (error) {
            console.error(error);
        }
    };

    const handleApprove = async (applicationId) => {
        try {
            const updatedApplication =
                await applicationService.approveApplication(applicationId);

            setApplications((prevApplications) =>
                prevApplications.map((application) =>
                    application.appId === updatedApplication.appId
                        ? updatedApplication
                        : application
                )
            );

        } catch (error) {
            console.error("Failed to approve application", error);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            const updatedApplication =
                await applicationService.rejectApplication(applicationId);

            setApplications((prevApplications) =>
                prevApplications.map((application) =>
                    application.appId === updatedApplication.appId
                        ? updatedApplication
                        : application
                )
            );

        } catch (error) {
            console.error("Failed to reject application", error);
        }
    };

    if (applications.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow p-8 text-center">

                <h2 className="text-xl font-semibold">
                    No Applications Yet
                </h2>

                <p className="text-gray-500 mt-2">
                    Applications will appear here when tenants apply.
                </p>

            </div>

        );

    }

    return (

        <div className="max-w-4xl mx-auto space-y-6">
            {applications.map((application) => (
                <div
                    key={application.appId}
                    className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-start">

                        <div>

                            <h2 className="text-2xl font-bold">
                                {application.applicantName}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                📞 {application.phoneNumber}
                            </p>

                        </div>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${application.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : application.status === "APPROVED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                        >
                            {application.status}
                        </span>

                    </div>


                    <div className="grid grid-cols-3 gap-6 mt-6">

                        <div>

                            <p className="text-sm text-gray-500">
                                Preferred Room
                            </p>

                            <p className="font-semibold">
                                {application.preferredRoomType}
                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Expected Move In
                            </p>

                            <p className="font-semibold">
                                {application.expectedMoveIn}
                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Applied On
                            </p>

                            <p className="font-semibold">
                                {application.createdAt?.substring(0, 10)}
                            </p>

                        </div>

                    </div>

                    <div className="mt-6">

                        <p className="text-sm font-medium text-gray-500 mb-2">
                            Message
                        </p>

                        <div className="bg-gray-100 rounded-lg p-4">

                            {application.message}

                        </div>

                        {application.status === "PENDING" && (
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => handleReject(application.appId)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() => handleApprove(application.appId)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                                >
                                    Approve
                                </button>
                            </div>
                        )}

                        {application.status === "APPROVED" && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => {
                                        setSelectedApplication(application);
                                        setShowAssignModal(true);
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                                >
                                    Assign Room & Bed
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            ))}

            {showAssignModal && selectedApplication && (
                <AssignTenantModal
                    application={selectedApplication}
                    onClose={() => {
                        setShowAssignModal(false);
                        setSelectedApplication(null);
                    }}
                    onSuccess={() => {
                        loadApplications();
                    }}
                />
            )}
        </div>
    );

};

export default ApplicationsTab;