import React from 'react'

 // Simulated captain data
  const captain = {
    name: 'Rajesh Kumar',
    rating: 4.8,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    vehicle: { name: 'Maruti Swift Dzire', plate: 'DL 4C AB 1234', color: 'White' },
  }

const Captaindetails = () => {
  return (
    <div> 
        {/* Captain info row */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src={captain.photo}
            alt={captain.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 truncate">{captain.name}</h3>
            <p className="text-xs text-gray-500">{captain.vehicle.color} {captain.vehicle.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-gray-700">{captain.rating}</span>
            </div>
          </div>
          <span className="bg-gray-100 text-[11px] font-bold text-gray-900 px-2.5 py-1 rounded-lg">
            {captain.vehicle.plate}
          </span>
        </div>

        {/* Stats cards */}
        <div className="bg-yellow-100 rounded-2xl p-4 flex justify-between items-start mb-4">
          {/* Hours Online */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-9 h-9 bg-yellow-200 rounded-full flex items-center justify-center mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-yellow-700">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">10.2</h2>
            <p className="text-[11px] text-gray-600 font-medium">Hours Online</p>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-16 bg-yellow-300/60 mt-2" />

          {/* Total Distance */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-9 h-9 bg-yellow-200 rounded-full flex items-center justify-center mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-yellow-700">
                <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">30 km</h2>
            <p className="text-[11px] text-gray-600 font-medium">Total Distance</p>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-16 bg-yellow-300/60 mt-2" />

          {/* Total Earnings */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-9 h-9 bg-yellow-200 rounded-full flex items-center justify-center mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5 text-yellow-700">
                <path fillRule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                <path d="M1 14.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2Z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">₹3k</h2>
            <p className="text-[11px] text-gray-600 font-medium">Total Earnings</p>
          </div>
        </div></div>
  )
}

export default Captaindetails