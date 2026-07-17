import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useLocation,useNavigate } from "react-router";
import authService from "../../services/authService";

function VerifyOtp() {

    const location=useLocation();
    const navigate=useNavigate();
    const role=location.state?.role;

    const email=location.state?.email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [loading,setLoading]=useState(false);

    const inputRefs = useRef([]);

    useEffect(() => {

        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const handleChange = (value, index) => {

        if (!/^[0-9]?$/.test(value))
            return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }

    };

    const handleKeyDown = (e, index) => {
        if (
            e.key === "Backspace" &&
            otp[index] === "" &&
            index > 0
        ) {
            inputRefs.current[index - 1].focus();
        }

    };

    const handlePaste = (e) => {

        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .slice(0, 6);

        if (!/^\d+$/.test(pasted))
            return;

        const newOtp = pasted.split("");

        while (newOtp.length < 6)
            newOtp.push("");
        setOtp(newOtp);

    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const otpValue=otp.join("");
            const response =await authService.verifyOtp({
                identifier:email,
                otp:otpValue,
                verificationMethod:"EMAIL"
            })

            alert(response.data);
            navigate(
                role === "OWNER"
                ? "/owner/login"
                : "/tenant/login");
        }
        catch(error){
            console.error(error);
            alert(
                error.response?.data?.message || "Invalid OTP"
            )
        }
        finally{
            setLoading(false);
        }

    };

    const resendOtp = () => {

        setTimer(30);

        console.log("Resend OTP");

        // API later

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex justify-center items-center p-6">

            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg">

                <h1 className="text-4xl font-bold text-center text-emerald-600">
                    Verify Email
                </h1>

                <p className="text-gray-500 text-center mt-4">
                    Enter the 6-digit verification code sent to your email.
                </p>

                <div
                    className="flex justify-center gap-3 mt-10"
                    onPaste={handlePaste}
                >

                    {otp.map((digit, index) => (

                        <input
                            key={index}
                            ref={(el) =>
                                inputRefs.current[index] = el
                            }
                            value={digit}
                            onChange={(e) =>
                                handleChange(
                                    e.target.value,
                                    index
                                )
                            }
                            onKeyDown={(e) =>
                                handleKeyDown(e, index)
                            }
                            maxLength={1}
                            className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />

                    ))}

                </div>

                <div className="mt-10">

                    <PrimaryButton onClick={handleSubmit} className="w-full">

                        Verify OTP

                    </PrimaryButton>

                </div>

                <div className="text-center mt-8">

                    {timer > 0 ? (

                        <p className="text-gray-500">

                            Resend OTP in

                            <span className="font-semibold ml-2">

                                {timer}s

                            </span>

                        </p>

                    ) : (

                        <button
                            onClick={resendOtp}
                            className="text-emerald-600 font-semibold hover:underline"
                        >

                            Resend OTP

                        </button>

                    )}

                </div>

            </div>

        </div>

    );

}

export default VerifyOtp;