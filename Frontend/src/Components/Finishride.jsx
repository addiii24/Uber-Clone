import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Finishride = ({ ride, distanceTime, setFinishRidePanel }) => {

      const navigate = useNavigate()

      const passengerName = ride?.user?.fullname
          ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname || ''}`.trim()
          : 'Passenger'
      const fare      = ride?.fare        || '—'
      const pickup    = ride?.pickup      || 'Pickup'
      const dropoff   = ride?.destination || 'Dropoff'
      const distance  = distanceTime?.distance?.text || '—'
      const duration  = distanceTime?.duration?.text || '—'


     const endRide = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'}/ride/end-ride`,
          { rideId: ride._id },
          { headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` } }
        )
        if (response.data.success) {
          navigate('/captain-home')
        }
      } catch (error) {
        console.error('End ride failed:', error.response?.data || error.message)
      }
     }
      

  return (
           <div className="animate-[fadeIn_0.3s_ease] px-1 h-[95vh] flex flex-col justify-between">

            <div>
                {/* ===== Header ===== */}
                <div className="text-center mb-4 cursor-pointer" onClick={() => setFinishRidePanel(p => !p)}>
                    <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
                    <h2 className="text-lg font-bold text-gray-900">Finish This Ride</h2>
                </div>

                {/* ===== Passenger info ===== */}
                <div className="flex items-center gap-3 mb-4 mt-6">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt={passengerName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">{passengerName}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{fare}</p>
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
                                <p className="text-sm font-medium text-gray-900 truncate mt-0.5">{pickup}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-2.5">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Dropoff</p>
                                <p className="text-sm font-medium text-gray-900 truncate mt-0.5">{dropoff}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Ride stats ===== */}
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-5">
                    <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
                            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">{distance}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">{duration}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
                            <path fillRule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                            <path d="M1 14.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2Z" />
                        </svg>
                        <span className="text-sm font-bold text-gray-900">₹{fare}</span>
                    </div>
                </div>
            </div>

            {/* ===== Action buttons ===== */}
            <div className="pb-8">
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={endRide}
                            className="flex-1 py-3.5 bg-green-600 text-white font-bold text-sm rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-green-600/25 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>
                            Finish Ride 
                        </button>
                    </div>
            </div>
        </div>
  )
}

export default Finishride