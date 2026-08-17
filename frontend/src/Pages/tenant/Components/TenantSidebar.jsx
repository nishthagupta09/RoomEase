import {
    Search,
    FileText,
    Building2,
    IndianRupee,
    Wrench,
    User,
    X,
    LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";



const TenantSidebar = ({
    sidebarOpen,
    setSidebarOpen
}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("fullName");

        navigate("/");
    };

    return (

        <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-50 transform transition-transform duration-300 h-screen flex flex-col
                     ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >

            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-emerald-600">
                    RoomEase
                </h2>

            </div>

            <nav className="p-4 space-y-2">
                <button 
                    onClick={() => {
                        navigate("/tenant/dashboard");
                        setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                    <Search size={20} />
                    <span>Browse PGs</span>
                </button>

                <button
                    onClick={() => {
                        navigate("/tenant/applications");
                        setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                    <FileText size={20} />
                    <span>My Applications</span>
                </button>

                <button
                    onClick={() => {
                        navigate("/tenant/my-pg");
                        setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
                    <Building2 size={20} />
                    <span>My PG</span>
                </button>

                <button
                    onClick={() => {
                        navigate("/tenant/rent");
                        setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
                    <IndianRupee size={20} />
                    <span>Rent</span>
                </button>

                <button
                    onClick={() => {
                        navigate("/tenant/complaints");
                        setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
                    <Wrench size={20} />
                    <span>Complaints</span>
                </button>

                <button
                    onClick={() => {
                        navigate("/tenant/profile");
                        setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
                    <User size={20} />
                    <span>Profile</span>
                </button>
            </nav>

            <div className="mt-auto border-t p-4">
                <button
                    onClick={handleLogout}
                    className=" w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
                    <LogOut size={20} />
                    <span className="font-medium">
                        Logout
                    </span>

                </button>

            </div>
        </aside>


    );
};

export default TenantSidebar;
