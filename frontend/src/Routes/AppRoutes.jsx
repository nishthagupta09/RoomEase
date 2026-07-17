import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "../pages/auth/Welcome";
import Login from "../Pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import TenantDashboard from "../pages/tenant/TenantDashboard";
import RegisterProperty from "../Pages/owner/RegisterProperty";
import PropertyDetails from "../Pages/tenant/PropertyDetails";
import ManageProperty from "../Pages/owner/ManageProperty";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Welcome />} />

                <Route path="/owner/login" element={<Login />} />
                <Route path="/tenant/login" element={<Login />} />

                <Route path="/owner/register" element={<Register />} />
                <Route path="/tenant/register" element={<Register />} />

                <Route path="/verify-otp" element={<VerifyOtp />} />

                <Route path="/owner/dashboard" element={<OwnerDashboard />}/>

                <Route path="/tenant/dashboard" element={<TenantDashboard />}/>
                <Route path="/owner/register-property" element={<RegisterProperty/>}/>
                <Route path="/owner/edit-property/:propertyId" element={<RegisterProperty/>}/>
                {/* <Route path="/owner/property/:propertyId/manage" element={<ManageProperty />}/> */}

                <Route path="/tenant/property/:propertyId" element={<PropertyDetails />}/>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;