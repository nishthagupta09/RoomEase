import {
    Home,
    CalendarDays,
    BedDouble,
    User,
    MessageSquare,
    Eye
} from "lucide-react";

const getStatusColor = (status) => {

    switch (status) {

        case "APPROVED":
            return "bg-green-100 text-green-700";

        case "REJECTED":
            return "bg-red-100 text-red-700";

        default:
            return "bg-yellow-100 text-yellow-700";
    }

};

const ApplicationCard = ({ application, onView }) => {

    return (

        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

            <div className="flex justify-between items-start p-6">

                <div>

                    <h2 className="text-xl font-semibold flex items-center gap-2">

                        <Home size={20} />

                        {application.propertyName}

                    </h2>

                </div>

                <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}
                >
                    {application.status}
                </span>

            </div>

          <div className="grid md:grid-cols-2 gap-5 mt-8">

                <div className="flex items-center gap-3">

                    <User size={18}/>

                    <div>

                        <p className="text-xs text-gray-500">
                            Applicant
                        </p>

                        <p className="font-medium">
                            {application.applicantName}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <BedDouble size={18}/>

                    <div>

                        <p className="text-xs text-gray-500">
                            Preferred Room
                        </p>

                        <p className="font-medium">
                            {application.preferredRoomType}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <CalendarDays size={18}/>

                    <div>

                        <p className="text-xs text-gray-500">
                            Expected Move In
                        </p>

                        <p className="font-medium">
                            {application.expectedMoveIn}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <CalendarDays size={18}/>

                    <div>

                        <p className="text-xs text-gray-500">
                            Applied On
                        </p>

                        <p className="font-medium">
                            {application.createdAt?.substring(0,10)}
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-8">

                <div className="flex items-center gap-2 mb-3">

                    <MessageSquare size={18}/>

                    <span className="font-semibold">
                        Your Message
                    </span>

                </div>

                <p className="text-gray-600">

                    {application.message || "No message provided."}

                </p>

            </div>

            <div className="mt-8">

                <h3 className="font-semibold mb-2">

                    Owner Remark

                </h3>

                <p className="text-gray-600">

                    {application.ownerRemark || "Not reviewed yet."}

                </p>

            </div>

        </div>

    );

};

export default ApplicationCard;