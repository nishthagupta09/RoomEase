import { useState } from "react";
import roomService from "../../../services/roomService";

const AddRoomModal = ({ propertyId, onClose, onSuccess }) => {

    const [formData, setFormData] = useState({
        roomNo: "",
        floorNo: "",
        capacity: "",
        hasAc: false,
        hasAttachedBathroom: false
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await roomService.createRoom(propertyId, formData);

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-8 w-[450px]">

                <h2 className="text-2xl font-bold mb-6">
                    Add Room
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="roomNo"
                        placeholder="Room Number"
                        value={formData.roomNo}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        name="floorNo"
                        placeholder="Floor Number"
                        value={formData.floorNo}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="number"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="hasAc"
                            checked={formData.hasAc}
                            onChange={handleChange}
                        />

                        Air Conditioned

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="hasAttachedBathroom"
                            checked={formData.hasAttachedBathroom}
                            onChange={handleChange}
                        />

                        Attached Bathroom

                    </label>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AddRoomModal;