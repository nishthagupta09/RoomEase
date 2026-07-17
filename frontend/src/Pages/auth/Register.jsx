import { useState } from "react";
import { useLocation, Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Eye,EyeOff } from "lucide-react";

import authService from "../../services/authService";

function Register() {

    const location = useLocation();

    const role = location.pathname.includes("owner") ? "OWNER" : "TENANT";

    const [showPassword, setShowPassword]=useState(false);
    const[showConfirmPassword,setShowConfirmPassword]=useState(false);

    const[loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value,});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        if(formData.password!=formData.confirmPassword){
            alert("Passwords do not match")
            return;
        }

        try {
            const response = await authService.register({

            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: role,
            verificationMethod: "EMAIL"

            });
            console.log(response.data);
            
            navigate("/verify-otp", {
                state: {email: formData.email,role: role}
            });

        }

        catch (error) {
            console.error(error);
            alert(error.response?.data?.message ||"Registration Failed");
        }
        finally{
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex justify-center items-center p-6">

            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">

                <h1 className="text-4xl font-bold text-center text-emerald-600">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mt-3 mb-8">
                    Register as{" "}
                    <span className="font-semibold">
                        {role}
                    </span>
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <InputField
                        label="Full Name"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Phone"
                        name="phone"
                        placeholder="10-Digit Phone No"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-700">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>

                         </div>
                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                            <button
                                type="button"
                                onClick={() =>setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600">
                                {showConfirmPassword ? (<EyeOff size={20} />) : (<Eye size={20} />)}
                            </button>
                        </div>
                    </div>

                    <PrimaryButton type="submit" disabled={loading} className="w-full disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading?"Sending OTP...":"Register"}

                    </PrimaryButton>
                </form>

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?

                    <Link
                        to={role === "OWNER"? "/owner/login": "/tenant/login"}
                        className="ml-2 text-emerald-600 font-semibold">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;