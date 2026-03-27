import React from 'react'

const Ridepopup = ({ ride, distanceTime, setridePopupPanel, setConfirmRidePopupPanel, confirmRide }) => {

  const distance = distanceTime?.distance?.text || '—'
  const duration = distanceTime?.duration?.text || '—'

  // Simulated ride request data
  // const ride = {
  //   passengerName: 'Aditya Sharma',
  //   passengerPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
  //   pickup: 'Connaught Place, New Delhi',
  //   dropoff: 'IGI Airport T3, New Delhi',
  //   distance: '14.2 km',
  //   duration: '28 min',
  //   fare: 193,
  // }

  return (
    <div className="animate-[fadeIn_0.3s_ease] px-1">

      {/* ===== Header ===== */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">New Ride Request!</h2>
        <p className="text-xs text-gray-400 mt-0.5">Respond before it expires</p>
      </div>

      {/* ===== Passenger info ===== */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate">{ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname}</h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">₹{ride?.fare}</p>
          <p className="text-[13px] text-gray-400 font-medium">Cash</p>
        </div>
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
          <span className="text-sm font-bold text-gray-900">₹{ride?.fare}</span>
        </div>
      </div>

      {/* ===== Accept & Decline buttons ===== */}
      <div className="flex gap-3">
        <button
          onClick={()=>{
            setridePopupPanel(false)
          }}
          className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-2xl hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
          Decline
        </button>
        <button
         onClick={() => {
            confirmRide()
          }}
          className="flex-[2] py-3.5 bg-green-600 text-white font-bold text-sm rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-green-600/25 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
          </svg>
          Accept Ride
        </button>
      </div>
    </div>
  )
}

export default Ridepopup