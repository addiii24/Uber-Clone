import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Waitingfordriver = ({ ride, confirmedRide, pickup, dropoff, onCancel, distanceTime, captainEta }) => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // Use real backend captain data if available, fallback to placeholders
  const captain = {
    name: confirmedRide?.captain?.fullname
      ? `${confirmedRide.captain.fullname.firstname} ${confirmedRide.captain.fullname.lastname || ''}`.trim()
      : 'Finding captain...',
    otp: confirmedRide?.otp,
    mobile: confirmedRide?.captain?.mobile || 'N/A',
    rating: 4.8,
    trips: 1247,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    vehicle: {
      name: confirmedRide?.captain?.vehicle?.vehicletype || (ride?.name === 'Moto' ? 'Honda Activa' : ride?.name === 'Auto' ? 'Bajaj RE' : 'Maruti Swift Dzire'),
      plate: confirmedRide?.captain?.vehicle?.plate || 'DL 4C AB 1234',
      color: confirmedRide?.captain?.vehicle?.color || (ride?.name === 'Moto' ? 'Black' : ride?.name === 'Auto' ? 'Green-Yellow' : 'White'),
    },
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setMessage('')
      alert('Message sent to captain!')
    }
  }

  // Guard: the ride object must be resolved before rendering
  if (!ride) return null

  const handleStartRide = () => {
    navigate('/riding', {
      state: { ride, pickup, dropoff, captain, confirmedRide, distanceTime }
    })
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease]">

      {/* ===== ETA Header ===== */}
      <div className="bg-black text-white rounded-2xl px-5 py-4 mb-5 text-center">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Meeting at pickup point</p>
        <h2 className="text-3xl font-bold mt-1">{captainEta || 'Calculating...'}</h2>
      </div>

      {/* ===== Captain Info Card ===== */}
      <div className="flex items-center gap-4 mb-5">
        {/* Driver + Vehicle images (overlapping) */}
        <div className="relative shrink-0">
          <img
            src={captain.photo}
            alt={captain.name}
            className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-md"
          />
          <div className="absolute -bottom-1 -right-3 w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow bg-gray-100">
            <img
              src={ride.image}
              alt={ride.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Captain details */}
        <div className="flex-1 min-w-0 ml-2">
          <h3 className="text-base font-bold text-gray-900 truncate">{captain.name}</h3>
          <p className="text-sm text-gray-500 truncate">
            {captain.vehicle.color} {captain.vehicle.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-gray-100 text-xs font-bold text-gray-900 px-2 py-0.5 rounded">
              {captain.vehicle.plate}
            </span>
            <div className="flex items-center gap-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-gray-700">{captain.rating}</span>
            </div>
          </div>
        </div>
      </div>
      {/* ===== Quick Actions (Share + Call) ===== */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button className="flex flex-col items-center justify-center gap-1 bg-gray-50 rounded-xl py-3.5 hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer">
          <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-wider">OTP</span>
          <span className="text-xl font-bold text-gray-900 tracking-widest">{captain.otp || '----'}</span>
        </button>
        <a href={`tel:${captain.mobile}`} className="flex items-center justify-center gap-2 bg-green-50 rounded-xl py-3.5 hover:bg-green-100 active:scale-[0.98] transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-green-600">
            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">{captain.mobile}</span>
        </a>
      </div>

      {/* ===== Journey Details ===== */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Journey Details</h3>

        {/* Route */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex flex-col items-center pt-1.5">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            <div className="w-[1.5px] h-6 border-l-2 border-dashed border-gray-300 my-0.5" />
            <div className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{pickup}</p>
            <div className="h-3" />
            <p className="text-sm font-medium text-gray-900 truncate">{dropoff}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-1 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Distance</span>
            <span className="text-sm font-medium text-gray-900">{distanceTime?.distance ? `${distanceTime.distance.text} away` : 'Calculating...'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Vehicle</span>
            <span className="text-sm font-medium text-gray-900">{ride.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Payment</span>
            <span className="text-sm font-medium text-gray-900">Cash</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Fare</span>
            <div>
              <span className="text-sm font-bold text-gray-900">₹{confirmedRide?.fare || ride?.price}</span>
              {!confirmedRide && ride?.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1.5">₹{ride.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Start Ride / Cancel ===== */}
      {/* <button
        onClick={handleStartRide}
        className="w-full py-3.5 bg-black text-white font-bold text-base rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-black/20 mb-3"
      >
        Start Ride
      </button> */}
      <button
        onClick={onCancel}
        className="w-full py-3 text-red-500 font-semibold text-sm rounded-2xl hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer"
      >
        Cancel Ride
      </button>
    </div>
  )
}

export default Waitingfordriver