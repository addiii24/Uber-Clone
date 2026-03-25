import React, { useState, useEffect } from 'react'

const Lookingforvehicle = ({ ride, fare, distanceTime, pickup, dropoff, onCancel, onDriverFound }) => {
  const [dots, setDots] = useState('')
  const [searchTime, setSearchTime] = useState(0)

  const distance = distanceTime?.distance?.text || '4.2 km'
  const actualPrice = fare && ride?.id ? fare[ride.id] || ride.price : ride.price
  const originalPrice = fare && ride?.id && fare[ride.id] ? fare[ride.id] + 30 : ride.originalPrice

  // Auto-transition to driver found after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onDriverFound) onDriverFound()
    }, 5000)
    return () => clearTimeout(timeout)
  }, [onDriverFound])

  // Animate the loading dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(dotInterval)
  }, [])

  // Timer counting up
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      {/* Vehicle image */}
      <div className="w-full h-32 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden mb-5">
        <img
          src={ride.image}
          alt={ride.name}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Looking for driver text */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Looking for a captain{dots}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Searching nearby {ride.name} drivers
        </p>
      </div>

      {/* Animated searching indicator */}
      <div className="flex justify-center mb-6">
        <div className="relative w-20 h-20">
          {/* Outer ring - spinning */}
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-black animate-spin" />
          {/* Inner content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900">{formatTime(searchTime)}</span>
          </div>
        </div>
      </div>

      {/* Ride details card */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        {/* Route */}
        <div className="flex items-start gap-3">
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
      </div>

      {/* Ride info row */}
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 mb-6">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
            <path d="M6.5 3c-1.045 0-2.062.265-2.969.748a.75.75 0 0 0 .697 1.329A3.466 3.466 0 0 1 6.5 4.5h7c.482 0 .938.1 1.353.277l.455-.91A.75.75 0 0 0 14.5 3h-8Z" />
          </svg>
          <span className="text-sm font-semibold text-gray-900">{ride.name}</span>
        </div>
        <div className="h-4 w-[1px] bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-600">{distance}</span>
        </div>
        <div className="h-4 w-[1px] bg-gray-300" />
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-gray-900">₹{actualPrice}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
          )}
        </div>
      </div>

      {/* Cancel button */}
      <button
        onClick={onCancel}
        className="w-full py-3.5 bg-red-50 text-red-600 font-semibold text-base rounded-2xl hover:bg-red-100 active:scale-[0.98] transition-all cursor-pointer border border-red-100"
      >
        Cancel Ride
      </button>
    </div>
  )
}

export default Lookingforvehicle