import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Waitingfordriver = ({ ride, pickup, dropoff, onCancel }) => {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // Simulated captain data
  const captain = {
    name: 'Rajesh Kumar',
    rating: 4.8,
    trips: 1247,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    vehicle: {
      name: ride.name === 'Moto' ? 'Honda Activa' : ride.name === 'Auto' ? 'Bajaj RE' : 'Maruti Swift Dzire',
      plate: 'DL 4C AB 1234',
      color: ride.name === 'Moto' ? 'Black' : ride.name === 'Auto' ? 'Green-Yellow' : 'White',
    },
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Message to captain:', message)
      setMessage('')
      alert('Message sent to captain!')
    }
  }

  const handleStartRide = () => {
    navigate('/riding', {
      state: { ride, pickup, dropoff, captain }
    })
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease]">

      {/* ===== ETA Header ===== */}
      <div className="bg-black text-white rounded-2xl px-5 py-4 mb-5 text-center">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Meeting at pickup point</p>
        <h2 className="text-3xl font-bold mt-1">2 min</h2>
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

      {/* ===== Message Input ===== */}
      <form onSubmit={handleSendMessage} className="flex gap-2 mb-5">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message to captain..."
          className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black/10 transition-all"
        />
        <button
          type="submit"
          className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shrink-0 hover:bg-green-700 active:scale-95 transition-all cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
          </svg>
        </button>
      </form>

      {/* ===== Quick Actions (Share + Call) ===== */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-3.5 hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-blue-600">
            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">Share Trip</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-green-50 rounded-xl py-3.5 hover:bg-green-100 active:scale-[0.98] transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-green-600">
            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">Call Captain</span>
        </button>
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
            <span className="text-sm font-medium text-gray-900">4.2 km</span>
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
              <span className="text-sm font-bold text-gray-900">₹{ride.price}</span>
              {ride.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1.5">₹{ride.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Start Ride / Cancel ===== */}
      <button
        onClick={handleStartRide}
        className="w-full py-3.5 bg-black text-white font-bold text-base rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-black/20 mb-3"
      >
        Start Ride
      </button>
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