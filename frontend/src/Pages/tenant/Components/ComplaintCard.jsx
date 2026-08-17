import {
    Clock,
    CheckCircle2,
    AlertCircle
} from "lucide-react";


const ComplaintCard = ({ complaint }) => {

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

        <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">

            <div className="flex items-start justify-between gap-6">

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        {complaint.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Room {complaint.roomNo}
                    </p>

                </div>

                <span
                    className={`
                        flex items-center gap-1.5
                        px-3 py-1.5
                        rounded-full
                        text-sm font-semibold
                        ${status.style}
                    `}
                >

                    {status.icon}

                    {status.label}

                </span>

            </div>

            <div className="mt-6">

                <p className="text-sm text-gray-500 mb-2">
                    Issue
                </p>

                <p className="text-gray-700 leading-relaxed">
                    {complaint.description}
                </p>

            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-5">

                <p className="text-sm font-semibold text-gray-800 mb-2">
                    Owner Response
                </p>

                <p className="text-gray-600">

                    {complaint.response ||
                        "The owner has not responded yet."}

                </p>

            </div>


            <div className="mt-5 pt-5 border-t border-gray-100">

                <p className="text-sm text-gray-500">

                    Raised on{" "}

                    <span className="font-medium text-gray-700">

                        {formatDate(
                            complaint.createdAt
                        )}

                    </span>

                </p>

            </div>

        </div>

    );
};


export default ComplaintCard;