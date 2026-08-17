import { useEffect, useState } from "react";
import roomService from "../../../services/roomService";
import { Plus, Pencil, Trash2, Snowflake, Bath } from "lucide-react";
import AddRoomModal from "../Components/AddRoomModal";
import RoomDetails from "../RoomDetails";

const RoomsTab = ({ propertyId }) => {

    const [rooms, setRooms] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        loadRooms();
    }, [propertyId]);

    const loadRooms = async () => {

        try {

            const data = await roomService.getRoomsByProperty(propertyId);
            console.log(data);
            console.log(Array.isArray(data));

            setRooms(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (roomId) => {

        if (!window.confirm("Delete this room?")) return;

        try {

            await roomService.deleteRoom(roomId);

            loadRooms();

        } catch (error) {

            console.error(error);

        }

    };

    if (selectedRoom) {
        return (
            <RoomDetails
                room={selectedRoom}
                onBack={() => setSelectedRoom(null)}
            />
        );
    }

    return (

    <div>

        <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
                Rooms
            </h2>

            <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
                Add Room
            </button>

        </div>

        {rooms.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-10 text-center">

                <h2 className="text-2xl font-bold">
                    No Rooms Added
                </h2>

                <p className="text-gray-500 mt-3">
                    Create your first room to start managing beds.
                </p>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    Add Room
                </button>

            </div>

        ) : (

            <div className="grid lg:grid-cols-2 gap-6">

                {rooms.map((room) => (

                    <div
                        key={room.roomId}
                        onClick={() => setSelectedRoom(room)}
                        className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                    >

                        <div className="flex justify-between">

                            <div>

                                <h3 className="text-2xl font-bold">
                                    Room {room.roomNo}
                                </h3>

                                <p className="text-gray-500">
                                    Floor {room.floorNo}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-sm text-gray-500">
                                    Occupancy
                                </p>

                                <p className="font-bold text-lg">
                                    {room.currOccupancy}/{room.capacity}
                                </p>

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-6">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Capacity
                                </p>

                                <p className="font-semibold">
                                    {room.capacity} Beds
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Facilities
                                </p>

                                <div className="flex gap-3 mt-1">

                                    {room.hasAc && (

                                        <div className="flex items-center gap-1 text-blue-600">

                                            <Snowflake size={18} />
                                            AC

                                        </div>

                                    )}

                                    {room.hasAttachedBathroom && (

                                        <div className="flex items-center gap-1 text-green-600">

                                            <Bath size={18} />
                                            Bath

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="flex justify-end gap-3 mt-8">

                            <button
                                className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
                            >

                                <Pencil size={18} />
                                Edit

                            </button>

                            <button
                                onClick={() => handleDelete(room.roomId)}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >

                                <Trash2 size={18} />
                                Delete

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        )}

        {showAddModal && (

            <AddRoomModal
                propertyId={propertyId}
                onClose={() => setShowAddModal(false)}
                onSuccess={loadRooms}
            />

        )}

    </div>

);

};

export default RoomsTab;