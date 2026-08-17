import React from "react";
import { useState,useEffect } from "react";
import bedService from "../../services/bedService";
import AddBedModal from "./Components/AddBedModal";

const RoomDetails = ({ room, onBack }) => {

    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const loadBeds = async () => {
        try {
            const response = await bedService.getBedsByRoom(room.roomId);
            setBeds(response);
        } 
        catch (err) {
            console.error(err);
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBeds();
    }, [room.roomId]);

    return (
        <div>
            <button
                onClick={onBack}
                className="mb-6 text-blue-600 hover:underline"
            >
                ← Back to Rooms
            </button>

            <h1 className="text-3xl font-bold">
                Room {room.roomNo}
            </h1>

            <p className="text-gray-500 mt-2">
                Floor {room.floorNo}
            </p>

            <hr className="my-8" />

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                    Beds
                </h2>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Add Bed
                </button>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : beds.length === 0 ? (

                <p>No beds added yet.</p>

            ) : (

                beds.map((bed) => (
                    <div
                        key={bed.bedId}
                        className="border rounded-lg p-4 mb-3"
                    >
                        <h3>{bed.bedNo}</h3>

                        <p>₹{bed.monthlyRent}</p>

                        <p>{bed.status}</p>
                    </div>
                ))

            )}

            {showAddModal && (
                <AddBedModal
                    roomId={room.roomId}
                    onClose={() => setShowAddModal(false)}
                    onSuccess={loadBeds}
                />
            )}

        </div>
    );
};

export default RoomDetails;