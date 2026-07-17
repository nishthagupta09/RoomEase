import RoleCard from "../../components/common/RoleCard";

import { Building2, BedDouble } from "lucide-react";

function Welcome() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">

            <h1 className="text-6xl font-extrabold text-emerald-600">
                RoomEase
            </h1>

            <p className="text-xl text-gray-600 mt-4 text-center max-w-xl">
                Find your perfect room or effortlessly manage your rental
                properties—all in one place.
            </p>

            <div className="flex flex-col md:flex-row gap-10 mt-16">

                <RoleCard
                    title="Owner"
                    description="List your rooms, manage property, and connect with tenants."
                    buttonText="Continue as Owner"
                    navigateTo="/owner/register"
                    icon={Building2}
                />

                <RoleCard
                    title="Tenant"
                    description="Browse rooms, book stays, and manage your living."
                    buttonText="Continue as Tenant"
                    navigateTo="/tenant/register"
                    icon={BedDouble}
                />

            </div>

        </div>
    );
}

export default Welcome;