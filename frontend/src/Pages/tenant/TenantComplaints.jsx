import { useEffect, useState } from "react";
import {
    Menu,
    Plus,
    Wrench,
    X
} from "lucide-react";

import TenantSidebar from "./Components/TenantSideBar";
import complaintService from "../../services/complaintService";
import ComplaintCard from "./Components/ComplaintCard";


const TenantComplaints = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });


    useEffect(() => {
        loadComplaints();
    }, []);


    const loadComplaints = async () => {

        try {
            const data = await complaintService.getMyComplaints();
            setComplaints(data);

        } 
        catch (error) {
            console.error("Failed to load complaints", error);
        } 
        finally {
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


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            return;
        }


        try {
            setSubmitting(true);
            await complaintService.createComplaint(formData);

            setFormData({
                title: "",
                description: ""
            });
            setShowForm(false);

            await loadComplaints();

        } 
        catch (error) {
            console.error("Failed to raise complaint",error);
        } 
        finally {
            setSubmitting(false);
        }

    };


    return (

        <div className="min-h-screen bg-gray-100">


            {sidebarOpen && (

                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                />

            )}

            <TenantSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <button
                onClick={() =>
                    setSidebarOpen(true)
                }
                className="fixed top-6 left-6 z-30 p-2 rounded-xl hover:bg-gray-200 transition"
            >

                <Menu size={26}/>
            </button>

            <main className="max-w-6xl mx-auto px-8 py-10">

                <div className="flex items-start justify-between mb-10">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Complaints
                        </h1>

                        <p className="text-gray-500 mt-2 text-lg">
                            Raise and track maintenance issues in your PG.
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            setShowForm(true)
                        }
                        className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
                    >

                        <Plus size={20}/>

                        Raise Complaint

                    </button>

                </div>

                {loading ? (

                    <div className="text-center py-16 text-gray-500">

                        Loading complaints...

                    </div>

                ) : complaints.length === 0 ? (

                    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">

                        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">

                            <Wrench
                                size={26}
                                className="text-emerald-600"
                            />

                        </div>

                        <h2 className="text-xl font-semibold">
                            No Complaints
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't raised any complaints yet.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {complaints.map(complaint => (
                                <ComplaintCard
                                    key={complaint.complaintId}
                                    complaint={ complaint}
                                />
                            )
                        )}

                    </div>

                )}

            </main>

            {showForm && (

                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 px-4">

                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-7">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Raise Complaint
                                </h2>

                                <p className="text-gray-500 text-sm mt-1">
                                    Describe the issue you're facing.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowForm(false)
                                }
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >

                                <X size={21}/>

                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">

                                    Complaint Title

                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. Water leakage in bathroom"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">

                                    Description

                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows={5}
                                    placeholder="Describe the issue in detail..."
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />

                            </div>

                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                    className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50"
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    disabled={
                                        submitting
                                    }
                                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-60"
                                >

                                    {submitting
                                        ? "Submitting..."
                                        : "Submit Complaint"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};



export default TenantComplaints;