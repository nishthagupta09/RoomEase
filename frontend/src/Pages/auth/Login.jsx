import { useState } from "react";
import { useLocation,Link, useNavigate } from "react-router";
import InputField from "../../components/common/InputField";
import authService from "../../services/authService";
import PrimaryButton from "../../components/common/PrimaryButton";

import { Eye,EyeOff } from "lucide-react";

function Login() {

    const location =useLocation();
    const role=location.pathname.includes("owner")? "OWNER":"TENANT";

    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showPassword,setShowPassword]=useState(false);

    const[formData,setFormData]=useState({
        identifier:"",
        password:"",
    });

    const handleChange=(e) =>{
        setFormData({...formData , [e.target.name]: e.target.value});

        setError("");
    };

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const response =await authService.login({
                identifier:formData.identifier,
                password:formData.password
            })

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("fullName", response.data.fullName);

            console.log("Login Successful")

            if (response.data.role === "OWNER") {
                navigate("/owner/dashboard");
            } else {
                navigate("/tenant/dashboard");
            }
        }

        catch(error){

            console.error("Login Failed:", error);

            if (error.response?.status === 401) {
                setError("Invalid email or password.");
            }
             else {
                setError(
                    error.response?.data?.message ||
                    "Unable to login. Please try again."
                );
            }
        }
        finally{
            setLoading(false);
        }
    }

    return(

         <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex justify-center items-center p-6">

            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">

                <h1 className="text-4xl font-bold text-center text-emerald-600">
                    Welcome
                </h1>

                <p className="text-center text-gray-500 mt-3 mb-8">
                    Login as
                    <span className="font-semibold ml-1">
                        {role}
                    </span>

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">

                    <InputField
                    label="Email or Phone"
                    name="identifier"
                    placeholder="Enter Email or Phone"
                    value={formData.identifier}
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
                                onClick={() =>setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                        </div>
                    </div>

                    <div className="flex justify-end">

                        <button
                            type="button"
                            className="text-sm text-emerald-600 hover:underline">
                            Forgot Password?
                        </button>

                    </div>

                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <PrimaryButton type="submit" disabled={loading} className="w-full disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading?"Logging In...":"Log In"}
                    </PrimaryButton>
    
                </form>

                 <p className="text-center mt-6 text-gray-600">
                    Don't have an account?
                    <Link
                        to={
                            role === "OWNER"
                                ? "/owner/register"
                                : "/tenant/register"
                        }
                        className="ml-2 text-emerald-600 font-semibold hover:underline">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );
    
}

export default Login;