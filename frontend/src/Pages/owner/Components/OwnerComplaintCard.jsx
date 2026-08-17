import {
    AlertCircle,
    Clock,
    CheckCircle2,
    User,
    BedDouble
} from "lucide-react";

import ManageComplaintModal from "./ManageComplaintModal";


const OwnerComplaintCard = ({
    complaint,
    onManage
}) => {

    const getStatusDetails = () => {

        switch (complaint.status) {

            case "RESOLVED":
                return {
                    label: "RESOLVED",
                    style: "bg-green-100 text-green-700",
                    icon: <CheckCircle2 size={16} />
                };

            case "IN_PROGRESS":
                return {
                    label: "IN PROGRESS",
                    style: "bg-blue-100 text-blue-700",
                    icon: <Clock size={16} />
                };

            default:
                return {
                    label: "OPEN",
                    style: "bg-yellow-100 text-yellow-700",
                    icon: <AlertCircle size={16} />
                };
        }
    };


    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };


    const status = getStatusDetails();


    return (

        <div className="bg-white border border-gray-200 rounded-2xl p-7">

            <div className="flex items-start justify-between gap-6">

                <div>

                    <h2 className="text-xl font-semibold">
                        {complaint.title}
                    </h2>

                    <div className="flex items-center gap-5 mt-2 text-sm text-gray-500">

                        <div className="flex items-center gap-1.5">
                            <User size={16} />
                            {complaint.tenantName}
                        </div>

                        <div className="flex items-center gap-1.5">
                            <BedDouble size={16} />
                            Room {complaint.roomNo}
                        </div>

                    </div>

                </div>


                <span
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${status.style}`}
                >
                    {status.icon}
                    {status.label}
                </span>

            </div>

            <div className="mt-6">

                <p className="text-sm text-gray-500 mb-2">
                    Complaint
                </p>

                <p className="text-gray-700 leading-relaxed">
                    {complaint.description}
                </p>

            </div>

            {complaint.response && (

                <div className="mt-6 bg-gray-50 rounded-xl p-5">

                    <p className="text-sm font-semibold mb-2">
                        Your Response
                    </p>

                    <p className="text-gray-600">
                        {complaint.response}
                    </p>

                </div>

            )}

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">

                <p className="text-sm text-gray-500">

                    Raised on{" "}

                    <span className="font-medium text-gray-700">
                        {formatDate(complaint.createdAt)}
                    </span>

                </p>

                <button
                    onClick={() => onManage(complaint)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                >
                    Manage Complaint
                </button>

            </div>

        </div>
    );
};


export default OwnerComplaintCard;