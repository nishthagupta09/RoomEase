import { useEffect, useState } from "react";
import roomService from "../../../services/roomService";
import bedService from "../../../services/bedService";
import tenantService from "../../../services/tenantService";

export default function AssignTenantModal({
    application,
    onClose,
    onSuccess,
}) {
    const [rooms, setRooms] = useState([]);
    const [beds, setBeds] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedBed, setSelectedBed] = useState("");
    const [moveInDate, setMoveInDate] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadRooms();
    }, []);

    async function loadRooms() {
        try {
            const data = await roomService.getRoomsByProperty(
                application.propertyId
            );

            console.log("Rooms:", data);
            setRooms(data);
        } 
        catch (err) {
            console.error(err);
        }
    }

    async function handleRoomChange(roomId) {
        setSelectedRoom(roomId);

        try {
            const data = await bedService.getBedsByRoom(roomId);

            setBeds(
                data.filter((bed) => bed.status === "AVAILABLE")
            );
        } catch (err) {
            console.error(err);
        }
    }

    async function handleAssign() {
        try {
            setLoading(true);

            const tenant = await tenantService.assignTenant(
                application.appId,
                {
                    bedId: selectedBed,
                    moveInDate,
                }
            );

            onSuccess(tenant);
            onClose();

        } 
        catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ||
                "Assignment failed."
            );
        } 
    }

    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">

            <h2 className="text-xl font-semibold mb-5">
                Assign Room & Bed
            </h2>

            <div className="space-y-4">

                <div>
                    <label className="block mb-1 font-medium">
                        Select Room
                    </label>

                    <select
                        className="w-full border rounded-lg p-2"
                        value={selectedRoom}
                        onChange={(e) =>
                            handleRoomChange(e.target.value)
                        }
                    >
                        <option value="">Choose Room</option>

                        {rooms.map((room) => (
                            <option
                                key={room.roomId}
                                value={room.roomId}
                            >
                                {room.roomNo}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Select Bed
                    </label>

                    <select
                        className="w-full border rounded-lg p-2"
                        value={selectedBed}
                        onChange={(e) =>
                            setSelectedBed(e.target.value)
                        }
                    >
                        <option value="">Choose Bed</option>

                        {beds.map((bed) => (
                            <option
                                key={bed.bedId}
                                value={bed.bedId}
                            >
                                {bed.bedLabel} (₹{bed.monthlyRent}/month)
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Move-in Date
                    </label>

                    <input
                        type="date"
                        className="w-full border rounded-lg p-2"
                        value={moveInDate}
                        onChange={(e) =>
                            setMoveInDate(e.target.value)
                        }
                    />
                </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

                <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg"
                >
                    Cancel
                </button>

                <button
                    onClick={handleAssign}
                    disabled={
                        loading ||
                        !selectedRoom ||
                        !selectedBed ||
                        !moveInDate
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                    {loading ? "Assigning..." : "Assign"}
                </button>

            </div>

        </div>
    </div>
);
}