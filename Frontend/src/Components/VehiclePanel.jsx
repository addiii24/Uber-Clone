import React from 'react'

const VehiclePanel = ({ rides, fare, distanceTime, selectedRide, onSelectRide, onConfirm, onBack, pickup, dropoff, createride }) => {
  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Choose a ride</h2>
          <p className="text-xs text-gray-400 mt-0.5">Recommended for you</p>
        </div>
      </div>

      {/* Route summary */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-2 h-2 bg-gray-900 rounded-full" />
          <div className="w-[1.5px] h-5 border-l border-dashed border-gray-300" />
          <div className="w-2 h-2 bg-gray-900 rounded-sm" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{pickup}</p>
          <div className="h-[1px] bg-gray-200 my-1.5" />
          <p className="text-sm font-medium text-gray-900 truncate">{dropoff}</p>
        </div>
      </div>

      {/* Ride options */}
      <div className="space-y-1">
        {rides.map((ride) => (
          <button
            key={ride.id}
            onClick={() => {
              onSelectRide(ride.id)}}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all cursor-pointer ${selectedRide === ride.id
                ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-transparent'
              }`}
          >
            {/* Vehicle image */}
            <div className="w-[72px] h-[48px] shrink-0 flex items-center justify-center">
              <img
                src={ride.image}
                alt={ride.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Ride details */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold">{ride.name}</span>
                {ride.seats && (
                  <span className={`flex items-center gap-0.5 text-xs ${selectedRide === ride.id ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
                    </svg>
                    {ride.seats}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs ${selectedRide === ride.id ? 'text-gray-300' : 'text-gray-400'}`}>
                  {distanceTime?.duration ? distanceTime.duration.text : ride.eta}
                </span>
                {ride.tag && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${selectedRide === ride.id
                      ? 'bg-white/20 text-white'
                      : 'bg-green-100 text-green-700'
                    }`}>
                    {ride.tag}
                  </span>
                )}
              </div>
              <p className={`text-[11px] mt-0.5 ${selectedRide === ride.id ? 'text-gray-400' : 'text-gray-400'
                }`}>{distanceTime?.distance ? `${distanceTime.distance.text} away` : ride.description}</p>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <p className="text-[15px] font-bold">₹{fare[ride.id] || ride.price}</p>
              {ride.originalPrice && (
                <p className={`text-xs line-through ${selectedRide === ride.id ? 'text-gray-400' : 'text-gray-400'
                  }`}>₹{(fare[ride.id] && fare[ride.id] + 30) || ride.originalPrice}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Payment method */}
      <div className="flex items-center gap-3 mt-5 px-1">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-8 h-5 bg-gradient-to-r from-green-600 to-green-400 rounded flex items-center justify-center">
            <span className="text-white text-[7px] font-bold tracking-wider">Cash</span>
          </div>
          <span className="text-sm text-gray-600">Cash</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Confirm button */}
      <button
        onClick={onConfirm}
        disabled={!selectedRide}
        className={`w-full mt-4 py-4 rounded-2xl text-base font-bold transition-all active:scale-[0.98] cursor-pointer ${selectedRide
            ? 'bg-black text-white hover:bg-gray-900 shadow-lg shadow-black/20'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        {selectedRide ? `Confirm ${rides.find(r => r.id === selectedRide)?.name}` : 'Select a ride'}
      </button>
    </div>
  )
}

export default VehiclePanel
