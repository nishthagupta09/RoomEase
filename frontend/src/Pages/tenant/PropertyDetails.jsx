import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import propertyService from "../../services/propertyService";
import applicationService from "../../services/applicationService";

function PropertyDetails() {
    const [property, setProperty] = useState(null);
    const { propertyId } = useParams();
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        preferredRoomType: "",
        expectedMoveIn: "",
        message: ""
    });

    const fetchProperty = async () => {
        try {
            const response = await propertyService.getPropertyDetails(propertyId);
            setProperty(response.data);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProperty();
    }, []);

    if (!property) {
        return <h2>Loading...</h2>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicationData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                propertyId: property.propertyId,
                preferredRoomType: applicationData.preferredRoomType,
                expectedMoveIn: applicationData.expectedMoveIn,
                message: applicationData.message
            };

            const response = await applicationService.applyForProperty(payload);
            console.log(response.data);
            alert("Application submitted successfully!");

        }
        catch (error) {
            console.error(error);
            alert(error.response?.data || "Application failed.");
        }
    };

    return (

        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                {property.propertyName}
            </h1>

            <p>{property.description}</p>

            <p className="mt-4">
                {property.address}
            </p>

            <p>
                {property.city}, {property.state}
            </p>

            <p className="mt-4">
                ₹{property.minRent} - ₹{property.maxRent}
            </p>

            <div className="mt-8">
                <button
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    {showApplicationForm ? "Cancel" : "Apply for PG"}
                </button>
            </div>

            {showApplicationForm && (
                <div className="mt-8 bg-white rounded-2xl shadow-md border p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        Apply for this PG
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Preferred Room Type */}
                        <div>
                            <label className="block font-medium mb-2">
                                Preferred Room Type
                            </label>

                            <select
                                name="preferredRoomType"
                                value={applicationData.preferredRoomType}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="">Select Room Type</option>
                                <option value="SINGLE">Single Sharing</option>
                                <option value="DOUBLE">Double Sharing</option>
                                <option value="TRIPLE">Triple Sharing</option>
                                <option value="ANY">Any Available</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Expected Move-in Date
                            </label>

                            <input
                                type="date"
                                name="expectedMoveIn"
                                value={applicationData.expectedMoveIn}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Message to Owner
                            </label>

                            <textarea
                                rows={4}
                                name="message"
                                value={applicationData.message}
                                onChange={handleChange}
                                placeholder="Introduce yourself or mention any special requirements..."
                                className="w-full border rounded-lg px-4 py-3 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Submit Application
                        </button>

                    </form>
                </div>
            )}

        </div>

    );
}

export default PropertyDetails;