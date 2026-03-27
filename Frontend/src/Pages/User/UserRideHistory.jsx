import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRideHistory = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/history`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setRides(response.data.rides);
                }
            } catch (err) {
                setError('Failed to fetch ride history');
            } finally {
                setLoading(false);
            }
        };

        fetchRides();
    }, []);

    return (
        <div className="h-screen bg-gray-100 flex flex-col font-['Inter',sans-serif]">
            {/* Header */}
            <div className="bg-white shadow-sm p-5 flex items-center gap-4 sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-900">Your Rides</h1>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</div>
                ) : rides.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                        </div>
                        <p>You haven't taken any rides yet.</p>
                    </div>
                ) : (
                    rides.map(ride => (
                        <div key={ride._id} className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {new Date(ride.createdAt).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                    <p className="font-semibold capitalize text-gray-900 mt-0.5">₹{ride.fare}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${
                                    ride.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    ride.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {ride.status}
                                </span>
                            </div>
                            
                            <div className="relative pl-6 mt-1">
                                <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                                <div className="absolute left-0 top-1.5 w-3.5 h-3.5 bg-white border-4 border-gray-900 rounded-full"></div>
                                <div className="absolute left-0 bottom-1.5 w-3.5 h-3.5 bg-white border-4 border-gray-900 rounded-full"></div>
                                
                                <div className="mb-4">
                                    <p className="text-[15px] font-medium text-gray-900 border-b border-gray-100 pb-3">{ride.pickup}</p>
                                </div>
                                <div>
                                    <p className="text-[15px] font-medium text-gray-900">{ride.destination}</p>
                                </div>
                            </div>
                            
                            {ride.captain && (
                                <div className="mt-2 pt-3 border-t border-gray-100 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold capitalize shrink-0">
                                        {(ride.captain.fullname.firstname?.charAt(0) || '').toUpperCase()}{(ride.captain.fullname.lastname?.charAt(0) || '').toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{ride.captain.fullname.firstname} {ride.captain.fullname.lastname}</p>
                                        <p className="text-xs text-gray-500">{ride.vehicleType} • {ride.captain.vehicle?.plate}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserRideHistory;
