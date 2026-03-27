import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Confirmridepopup = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {

    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleConfirmOtp = async (e) => {
        e.preventDefault()
        setOtpError('')
        setLoading(true)
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'}/ride/start-ride`,
                {
                    params: { rideId: ride?._id, otp },
                    headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` }
                }
            )
            if (res.data.success) {
                setConfirmRidePopupPanel(false)
                navigate('/captain-riding', { state: { ride: res.data.ride } })
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong'
            setOtpError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-[fadeIn_0.3s_ease] px-1 h-[95vh] flex flex-col justify-between">

            <div>
                {/* ===== Header ===== */}
                <div className="text-center mb-4 cursor-pointer" onClick={() => setConfirmRidePopupPanel(false)}>
                    <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
                    <h2 className="text-lg font-bold text-gray-900">Confirm with OTP</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Ask passenger for the OTP shown on their screen</p>
                </div>

                {/* ===== Passenger info ===== */}
                <div className="flex items-center gap-3 mb-4 mt-6">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold shrink-0 border-2 border-white shadow-md">
                        {(ride?.user?.fullname?.firstname?.charAt(0) || '?').toUpperCase()}{(ride?.user?.fullname?.lastname?.charAt(0) || '').toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                            {ride?.user?.fullname
                                ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname || ''}`.trim()
                                : 'Passenger'}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{ride?.fare}</p>
                        <p className="text-[13px] text-gray-400 font-medium">Cash</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                    <a href={`tel:${ride?.user?.mobile}`} className="flex items-center justify-center gap-2 bg-green-50 rounded-xl py-3.5 hover:bg-green-100 active:scale-[0.98] transition-all cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-green-600">
                            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">Mobile : {ride?.user?.mobile}</span>
                    </a>
                </div>

                {/* ===== Route card ===== */}
                <div className="bg-gray-50 rounded-xl p-3.5 mb-4">
                    <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center pt-1">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                            <div className="w-[1.5px] h-8 border-l-2 border-dashed border-gray-300 my-0.5" />
                            <div className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="pb-2.5">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Pickup</p>
                                <p className="text-sm font-medium text-gray-900 truncate mt-0.5">{ride?.pickup}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-2.5">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Dropoff</p>
                                <p className="text-sm font-medium text-gray-900 truncate mt-0.5">{ride?.destination}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== OTP & Action buttons ===== */}
            <div className="pb-8">
                {otpError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl px-4 py-3 mb-4 text-center">
                        ❌ {otpError}
                    </div>
                )}
                <form onSubmit={handleConfirmOtp}>
                    <input
                        value={otp}
                        onChange={(e) => { setOtp(e.target.value); setOtpError('') }}
                        type="text"
                        placeholder="Enter OTP"
                        className={`bg-gray-100 px-6 py-4 font-mono text-lg rounded-2xl w-full mt-2 mb-5 border focus:outline-none focus:ring-1 transition-all text-center tracking-[0.5em] shadow-inner ${otpError ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-green-500 focus:ring-green-500'}`}
                        maxLength={6}
                        required
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setConfirmRidePopupPanel(false)
                                setRidePopupPanel(true)
                            }}
                            className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-2xl hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
                                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] py-3.5 bg-green-600 text-white font-bold text-sm rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-green-600/25 flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {loading ? 'Verifying...' : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                    </svg>
                                    Confirm OTP
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Confirmridepopup