import { useEffect, useState } from "react";
import applicationService from "../../services/applicationService";
import TenantSidebar from "./Components/TenantSideBar";
import { Menu,FileText } from "lucide-react";
import ApplicationCard from "./Components/ApplicationCard";

const MyApplications = () => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const response = await applicationService.getMyApplications();
            setApplications(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
    <div className="min-h-screen bg-gray-100">

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

        <div className="max-w-5xl mx-auto px-6 py-8">

            <div className="flex items-start gap-4 mb-10">

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-6 left-6 z-30 p-2 rounded-xl hover:bg-gray-200 transition"
                >
                    <Menu size={26} />
                </button>

                <div>

                    <h1 className="text-4xl font-bold">
                        My Applications
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Track the status of all your PG applications.
                    </p>

                </div>

            </div>

            {applications.length === 0 ? (

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">

                    <h2 className="text-xl font-semibold">
                        No Applications Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Browse PGs and submit your first application.
                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {applications.map((application) => (

                        <ApplicationCard
                            key={application.appId}
                            application={application}
                        />

                    ))}

                </div>

            )}

        </div>

    </div>
);
};

export default MyApplications;