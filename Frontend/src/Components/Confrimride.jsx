import React from 'react'

const ConfirmRide = ({ ride, fare, distanceTime, pickup, dropoff, onBack, onConfirm }) => {

  const distance = distanceTime?.distance?.text || '4.2 km'
  const duration = distanceTime?.duration?.text || '15 min'
  const actualPrice = fare[ride.id] || ride.price
  const originalPrice = fare[ride.id] ? fare[ride.id] + 30 : ride.originalPrice

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-900">Confirm your ride</h2>
      </div>

      {/* Vehicle image */}
      <div className="w-full h-36 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden mb-5">
        <img
          src={ride.image}
          alt={ride.name}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Route card */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        <div className="flex items-start gap-3">
          {/* Route line */}
          <div className="flex flex-col items-center pt-1.5">
            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow" />
            <div className="w-[2px] h-10 border-l-2 border-dashed border-gray-300 my-1" />
            <div className="w-3 h-3 bg-red-500 rounded-sm border-2 border-white shadow" />
          </div>

          {/* Addresses */}
          <div className="flex-1 min-w-0">
            <div className="pb-3 border-b border-gray-200">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Pickup</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5 truncate">{pickup}</p>
            </div>
            <div className="pt-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Dropoff</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5 truncate">{dropoff}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ride details grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {/* Vehicle type */}
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
              <path d="M6.5 3c-1.045 0-2.062.265-2.969.748a.75.75 0 0 0 .697 1.329A3.466 3.466 0 0 1 6.5 4.5h7c.482 0 .938.1 1.353.277l.455-.91A.75.75 0 0 0 14.5 3h-8Z" />
              <path fillRule="evenodd" d="M3.5 7a2.5 2.5 0 0 1 5 0v.036a3.496 3.496 0 0 1 3 0V7a2.5 2.5 0 0 1 5 0v.036c.253.046.495.12.721.218l1.426-.716a.75.75 0 0 1 .67 1.342l-1.434.717c.087.147.162.301.224.462l1.464.366a.75.75 0 1 1-.364 1.456l-1.514-.378a2.51 2.51 0 0 1-1.193.969V13a.75.75 0 0 1-1.5 0v-1.586a2.488 2.488 0 0 1-.5.086H11.5v1.5A.75.75 0 0 1 10 13v-1.586c-.168-.01-.332-.036-.491-.076L8.5 13.362a.75.75 0 1 1-1-1.118l.857-.767a2.507 2.507 0 0 1-.857-1.477H6a.75.75 0 0 1 0-1.5h1.5c0-.246.036-.484.103-.71L6.427 7.12a.75.75 0 0 1 .146-1.49l1.217.304A2.495 2.495 0 0 1 8.5 5.036V5a2.5 2.5 0 0 1-5 0v2Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 font-medium">Vehicle</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{ride.name}</p>
        </div>

        {/* Distance */}
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
              <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 font-medium">Distance</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{distance}</p>
        </div>

        {/* Duration */}
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 font-medium">Duration</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{duration}</p>
        </div>
      </div>

      {/* Fare breakdown */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Fare Breakdown</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Base fare</span>
            <span className="text-sm font-medium text-gray-700">₹{Math.round(actualPrice * 0.4)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Distance charge</span>
            <span className="text-sm font-medium text-gray-700">₹{Math.round(actualPrice * 0.35)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Platform fee</span>
            <span className="text-sm font-medium text-gray-700">₹{Math.round(actualPrice * 0.1)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Taxes</span>
            <span className="text-sm font-medium text-gray-700">₹{Math.round(actualPrice * 0.15)}</span>
          </div>
          {originalPrice && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600 font-medium">Discount</span>
              <span className="text-sm font-medium text-green-600">-₹{originalPrice - actualPrice}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2.5 mt-1">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-base font-bold text-gray-900">₹{actualPrice}</span>
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through ml-2">₹{originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="flex items-center gap-3 px-1 mb-4">
        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-9 h-6 bg-gradient-to-r from-green-600 to-green-400 rounded-md flex items-center justify-center shadow-sm">
            <span className="text-white text-[8px] font-bold tracking-wider">Cash</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Cash</p>
            <p className="text-[10px] text-gray-400">Payment method</p>
          </div>
        </div>
        <button className="text-xs text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">
          Change
        </button>
      </div>

      {/* Confirm button */}
      <button
        onClick={onConfirm}
        className="w-full py-4 bg-green-600 text-white font-bold text-base rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-green-600/25"
      >
        Confirm {ride.name} · ₹{actualPrice}
      </button>
    </div>
  )
}

export default ConfirmRide
