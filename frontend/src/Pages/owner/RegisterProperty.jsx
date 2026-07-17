import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";

import InputField from "../../Components/common/InputField";
import PrimaryButton from "../../Components/common/PrimaryButton";

import propertyService from "../../services/propertyService";

function RegisterProperty(){

    const navigate = useNavigate();
    const params = useParams();
    const{ propertyId }=useParams();
    console.log("Params:", params);
    console.log("Property ID:", params.propertyId)

    const [formData, setFormData] = useState({
        propertyName: "",
        description: "",

        address: "",
        city: "",
        state: "",
        pincode: "",

        contactInfo: "",

        totalRooms: "",
        minRent: "",
        maxRent: "",

        genderType: "CO_ED",
        propertyStatus: "AVAILABLE",

        hasWifi: false,
        hasFood: false,
        hasParking: false
    });

    useEffect(() => {
        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);

    const fetchProperty = async () => {
        try {
            const response = await propertyService.getProperty(propertyId);
            setFormData(response.data);
        } 
        catch (error) {
            console.error(error);
            alert("Unable to load property");
        }
    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (propertyId) {
                await propertyService.updateProperty(
                    propertyId,
                    formData
                );
                alert("Property updated successfully");

            }
            else {
                await propertyService.createProperty(formData);
                alert("Property registered successfully");
            }

            navigate("/owner/dashboard");
        }
        catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const handleEdit = (propertyId) => {
        navigate(`/owner/edit-property/${propertyId}`);
    };

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-2">
                {propertyId ? "Edit Property" : "Register Property"}
            </h1>

            <p className="text-gray-500 mb-8">
                Add your property details
            </p>

            <form onSubmit={handleSubmit}>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-6">
                        Basic Information
                    </h2>
                    <div className="grid grid-rows-1 md:grid-rows-2 space-y-2">

                        <InputField
                            label="Property Name"
                            name="propertyName"
                            value={formData.propertyName}
                            onChange={handleChange}
                        />
                        <div className="space-y-1">
                            <label className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>

                        <textarea
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="block w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-6">
                        Location
                    </h2>

                    <div className="space-y-6">

                        <InputField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                        <InputField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                        <InputField
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-6">
                        Property Details
                    </h2>

                    <div className="space-y-6">

                        <InputField
                            label="Contact Information"
                            name="contactInfo"
                            value={formData.contactInfo}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Total Rooms"
                            type="number"
                            name="totalRooms"
                            value={formData.totalRooms}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Minimum Rent"
                            type="number"
                            name="minRent"
                            value={formData.minRent}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Maximum Rent"
                            type="number"
                            name="maxRent"
                            value={formData.maxRent}
                            onChange={handleChange}
                        />

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Gender Type
                            </label>

                            <select
                                name="genderType"
                                value={formData.genderType}
                                onChange={handleChange}
                                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="CO_ED">Co-ed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Property Status
                            </label>

                            <select
                                name="propertyStatus"
                                value={formData.propertyStatus}
                                onChange={handleChange}
                                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="AVAILABLE">Available</option>
                                <option value="FULLY_OCCUPIED">Fully Occupied</option>
                                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                            </select>
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-6">
                        Amenities
                    </h2>

                    <div className="space-y-4">

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="hasWifi"
                                checked={formData.hasWifi}
                                onChange={handleChange}
                                className="w-5 h-5 accent-emerald-600"
                            />
                            <span>WiFi Available</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="hasFood"
                                checked={formData.hasFood}
                                onChange={handleChange}
                                className="w-5 h-5 accent-emerald-600"
                            />
                            <span>Food Available</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="hasParking"
                                checked={formData.hasParking}
                                onChange={handleChange}
                                className="w-5 h-5 accent-emerald-600"
                            />
                            <span>Parking Available</span>
                        </label>

                    </div>

                </div>

                <div className="flex justify-end">

                    <PrimaryButton type="submit">
                        {propertyId? "Update Propety":"Register Property"}
                    </PrimaryButton>

                </div>

            </form>

        </div>

    );
}

export default RegisterProperty;