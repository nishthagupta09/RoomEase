import { useState } from "react";
import bedService from "../../../services/bedService";

const AddBedModal = ({ roomId, onClose, onSuccess }) => {

    const [formData, setFormData] = useState({
        bedLabel: "",
        monthlyRent: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await bedService.createBed(roomId, formData);

            onSuccess();
            onClose();

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to add bed");
        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-full max-w-md p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Add Bed
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>

                        <label className="block mb-2">
                            Bed Label
                        </label>

                        <input
                            type="text"
                            name="bedLabel"
                            value={formData.bedLabel}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2"
                            placeholder="A"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2">
                            Monthly Rent
                        </label>

                        <input
                            type="number"
                            name="monthlyRent"
                            value={formData.monthlyRent}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2"
                            placeholder="8500"
                            required
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            Add Bed
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AddBedModal;