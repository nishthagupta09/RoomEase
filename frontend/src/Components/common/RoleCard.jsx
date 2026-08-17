
import { useNavigate } from "react-router-dom";

function RoleCard({ title, description, buttonText, navigateTo, icon : Icon }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 w-80"
        >
            <Icon
            size={40}
            className="text-emerald-600 group-hover:text-white transition"/>

            <h2 className="text-3xl font-bold text-center text-gray-800">
                {title}
            </h2>

            <p className="text-gray-500 text-center mt-4 mb-8 min-h-[72px]">
                {description}
            </p>

            <button
                onClick={() => navigate(navigateTo)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
            >
                {buttonText}
            </button>
        </div>
    );
}

export default RoleCard;