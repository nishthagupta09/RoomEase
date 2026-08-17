import { useEffect, useState } from "react";
import { User, Mail, Phone, Shield, Lock } from "lucide-react";
import authService from "../../services/authService";
import TenantSidebar from "../../pages/tenant/Components/TenantSideBar";

const Profile = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        gender: "",
        currentPassword: "",
        newPassword: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const response = await authService.getProfile();

            const data = response.data;

            setProfile(data);

            setFormData({
                fullName: data.fullName || "",
                phone: data.phone || "",
                gender: data.gender || "",
                currentPassword: data.currentPassword || "",
                newPassword: data.newPassword || ""
            });

        } catch (error) {
            console.error("Failed to load profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {

        try {

            setSaving(true);

            const data = {
                fullName: formData.fullName,
                phone: formData.phone,
                gender: formData.gender
            };

            // Only send password if the user actually entered one
            if (formData.newPassword.trim() !== "") {
                data.currentPassword = formData.currentPassword;
                data.newPassword = formData.newPassword;
            }

            const response = await authService.updateProfile(data);

            setProfile(response.data);

            setFormData(prev => ({
                ...prev,
                password: ""
            }));

            setEditing(false);

        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {

        setFormData({
            fullName: profile.fullName || "",
            phone: profile.phone || "",
            gender: profile.gender || "",
            currentPassword: profile.currentPassword || "",
            newPassword:profile.newPassword || ""
        });

        setEditing(false);
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto py-10 text-center text-gray-500">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="max-w-3xl mx-auto py-10 text-center text-red-500">
                Unable to load profile.
            </div>
        );
    }

    return (

        <div className="max-w-3xl mx-auto py-8">

            {/* {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <TenantSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            /> */}

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Profile
                </h1>

                <p className="text-gray-500 mt-2">
                    View and manage your account information.
                </p>

            </div>


            {/* Profile Card */}
            <div className="bg-white rounded-2xl border shadow-sm p-8">

                {/* Profile Header */}
                <div className="flex items-center gap-5 pb-6 border-b">

                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                        <User
                            size={32}
                            className="text-emerald-600"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">
                            {profile.fullName}
                        </h2>

                        <p className="text-gray-500">
                            {profile.role}
                        </p>
                    </div>

                </div>


                {/* Personal Information */}
                <div className="mt-8">

                    <h3 className="text-lg font-semibold mb-5">
                        Personal Information
                    </h3>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <div>

                            <label className="text-sm text-gray-500">
                                Full Name
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full mt-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />

                            ) : (

                                <div className="flex items-center gap-3 mt-2">
                                    <User size={18} />
                                    <span className="font-medium">
                                        {profile.fullName}
                                    </span>
                                </div>

                            )}

                        </div>


                        {/* Email */}
                        <div>

                            <label className="text-sm text-gray-500">
                                Email
                            </label>

                            <div className="flex items-center gap-3 mt-2">
                                <Mail size={18} />

                                <span className="font-medium">
                                    {profile.email}
                                </span>
                            </div>

                        </div>


                        {/* Phone */}
                        <div>

                            <label className="text-sm text-gray-500">
                                Phone
                            </label>

                            {editing ? (

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full mt-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />

                            ) : (

                                <div className="flex items-center gap-3 mt-2">
                                    <Phone size={18} />

                                    <span className="font-medium">
                                        {profile.phone}
                                    </span>
                                </div>

                            )}

                        </div>


                        {/* Gender */}
                        <div>

                            <label className="text-sm text-gray-500">
                                Gender
                            </label>

                            {editing ? (

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full mt-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="MALE">
                                        Male
                                    </option>

                                    <option value="FEMALE">
                                        Female
                                    </option>

                                    <option value="OTHER">
                                        Other
                                    </option>

                                </select>

                            ) : (

                                <div className="flex items-center gap-3 mt-2">
                                    <User size={18} />

                                    <span className="font-medium">
                                        {profile.gender || "Not specified"}
                                    </span>
                                </div>

                            )}

                        </div>


                        {/* Account Type */}
                        <div>

                            <label className="text-sm text-gray-500">
                                Account Type
                            </label>

                            <div className="flex items-center gap-3 mt-2">
                                <Shield size={18} />

                                <span className="font-medium">
                                    {profile.role}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Password */}
                {editing && (

                    <div className="mt-8 pt-6 border-t">

                        <div className="flex items-center gap-2 mb-2">

                            <Lock size={18} />

                            <h3 className="text-lg font-semibold">
                                Change Password
                            </h3>

                        </div>

                        <p className="text-sm text-gray-500 mb-4">
                            Leave this blank if you don't want to change your password.
                        </p>

                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Current password"
                        />

                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New password"
                        />

                    </div>

                )}


                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-8">

                    {editing ? (

                        <>
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="px-5 py-2.5 border rounded-xl hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </>

                    ) : (

                        <button
                            onClick={() => setEditing(true)}
                            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                        >
                            Edit Profile
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
};

export default Profile;