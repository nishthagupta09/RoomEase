import { useEffect, useState } from "react";
import { X } from "lucide-react";
import complaintService from "../../../services/complaintService";

const ManageComplaintModal = ({
    complaint,
    onClose,
    onUpdated
}) => {

    const [status, setStatus] = useState("OPEN");
    const [response, setResponse] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {

        if (complaint) {
            setStatus(complaint.status);
            setResponse(complaint.response || "");
            setError("");
        }

    }, [complaint]);


    if (!complaint) {
        return null;
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            const request = {
                status,
                response: response.trim()
            };

            await complaintService.updateComplaint(
                complaint.complaintId,
                request
            );

            await onUpdated();

            onClose();

        } catch (error) {

            console.error(
                "Failed to update complaint",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update complaint."
            );

        } finally {

            setSaving(false);

        }
    };


    return (

        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 px-4"
            onClick={onClose}
        >

            <div
                className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-7"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-start justify-between mb-6">

                    <div>

                        <h2 className="text-2xl font-bold">
                            Manage Complaint
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Update the status and respond to the tenant.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <X size={21} />
                    </button>

                </div>


                <div className="bg-gray-50 rounded-xl p-4 mb-6">

                    <p className="font-semibold">
                        {complaint.title}
                    </p>

                    <div className="flex gap-4 mt-2 text-sm text-gray-500">

                        <span>
                            {complaint.tenantName}
                        </span>

                        <span>
                            Room {complaint.roomNo}
                        </span>

                    </div>

                    <p className="text-gray-600 text-sm mt-3">
                        {complaint.description}
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >

                            <option value="OPEN">
                                OPEN
                            </option>

                            <option value="IN_PROGRESS">
                                IN PROGRESS
                            </option>

                            <option value="RESOLVED">
                                RESOLVED
                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Response to Tenant
                        </label>

                        <textarea
                            value={response}
                            onChange={(e) =>
                                setResponse(e.target.value)
                            }
                            rows={5}
                            placeholder="Write an update for the tenant..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                    </div>


                    {error && (

                        <p className="text-sm text-red-600">
                            {error}
                        </p>

                    )}


                    {/* Actions */}

                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ManageComplaintModal;