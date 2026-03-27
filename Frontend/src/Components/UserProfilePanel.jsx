import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../Context/Usercontext';

const UserProfilePanel = ({ onClose }) => {
    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstname: user?.fullname?.firstname || '',
        lastname: user?.fullname?.lastname || '',
        email: user?.email || '',
        mobile: user?.mobile || ''
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/update-profile`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.status === 200) {
                setUser(response.data.user);
                setIsEditing(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/delete-account`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete account');
            setLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="absolute left-0 right-0 z-[60] bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 bottom-0 h-[85%] font-['Inter',sans-serif]">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={onClose}>
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="px-6 pb-6 h-[calc(100%-24px)] overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && <div className="mb-4 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

                {/* Profile Form */}
                <div className="bg-gray-50 p-5 rounded-2xl mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold capitalize">
                            {user?.fullname?.firstname?.charAt(0)}{user?.fullname?.lastname?.charAt(0)}
                        </div>
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-4 animate-[fadeIn_0.3s_ease]">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">First Name</label>
                                    <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" required />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Last Name</label>
                                    <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Mobile</label>
                                <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" required minLength={10} maxLength={10} />
                            </div>
                            
                            <button type="submit" disabled={loading} className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition-colors disabled:bg-gray-400 mt-2 cursor-pointer">
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Name</p>
                                <p className="font-semibold text-gray-900 text-[15px] capitalize">{user?.fullname?.firstname} {user?.fullname?.lastname}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                                <p className="font-semibold text-gray-900 text-[15px]">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Mobile</p>
                                <p className="font-semibold text-gray-900 text-[15px]">{user?.mobile}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button 
                        onClick={() => navigate('/user/rides')}
                        className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3 text-gray-900 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            Ride History
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <button 
                        onClick={() => navigate('/logout')}
                        className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3 text-gray-900 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            Logout
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 transition-colors mt-2 cursor-pointer bg-white"
                    >
                        <div className="flex items-center gap-3 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            Delete Account
                        </div>
                    </button>
                </div>

                {/* Confirm Delete Overlay */}
                {showDeleteConfirm && (
                    <div className="absolute inset-0 z-[70] bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 animate-[fadeIn_0.2s_ease]">
                        <div className="bg-white border rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Account?</h3>
                            <p className="text-sm text-gray-500 mb-8 leading-relaxed">This action cannot be undone. All your ride history and personal data will be permanently removed.</p>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-colors cursor-pointer"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleDeleteAccount}
                                    className="flex-1 px-4 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                                    disabled={loading}
                                >
                                    {loading ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePanel;
