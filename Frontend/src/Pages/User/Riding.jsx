import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SocketContext } from '../../Context/Socketiocontext'
import { UserDataContext } from '../../Context/Usercontext'
import Livetracking from '../../Components/Livetracking'

const Riding = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const socket = useContext(SocketContext)         // direct — SocketContext provides the socket itself
  const { user } = useContext(UserDataContext)     // for re-emitting join

  // Re-emit join so DB has the current socketId while on this page
  useEffect(() => {
    if (!socket || !user?._id) return
    socket.emit('join', { userId: user._id, userType: 'user' })
  }, [socket, user])

  // Navigate home when captain ends the ride
  useEffect(() => {
    if (!socket) return
    socket.on("ride-ended", (data) => {
      console.log('ride-ended received:', data)
      navigate("/home")
    })
    return () => socket.off("ride-ended")
  }, [socket])

  // Get ride data from navigation state or use defaults
  const {
    ride = { name: 'UberGo', price: 193, image: '' },
    pickup = 'Pickup Location',
    dropoff = 'Dropoff Location',
    confirmedRide = null,
    distanceTime = null,
  } = location.state || {}

  // Prefer backend data where available
  const displayPickup   = confirmedRide?.pickup      || pickup
  const displayDropoff  = confirmedRide?.destination || dropoff
  const displayFare     = confirmedRide?.fare        || ride.price
  const displayDistance = distanceTime?.distance?.text || '—'

  // Build captain display object from the populated backend captain
  const backendCaptain  = confirmedRide?.captain
  const captain = {
    name: backendCaptain?.fullname
      ? `${backendCaptain.fullname.firstname} ${backendCaptain.fullname.lastname || ''}`.trim()
      : 'Your Captain',
    rating: 4.8,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    vehicle: {
      name: backendCaptain?.vehicle?.vehicletype || ride.name || 'Vehicle',
      plate: backendCaptain?.vehicle?.plate || 'XX 00 XX 0000',
      color: backendCaptain?.vehicle?.color || 'White',
    }
  }

  // Vehicle animation position
  const [position, setPosition] = useState(0)
  const [eta, setEta] = useState(12)
  const [panelMinimized, setPanelMinimized] = useState(false)

  // Animate vehicle moving along the route
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => {
        if (prev >= 100) return 0
        return prev + 0.3
      })
    }, 50)
    return () => clearInterval(moveInterval)
  }, [])

  // Countdown ETA
  useEffect(() => {
    const etaTimer = setInterval(() => {
      setEta(prev => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 60000) // every minute
    return () => clearInterval(etaTimer)
  }, [])



  return (
    <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden bg-gray-100 font-['Inter',sans-serif] flex flex-col">

      {/* ===== MAP AREA ===== */}
      <div className="relative flex-1 min-h-0">
        {/* Live Google Map */}
        <Livetracking pickup={displayPickup} destination={displayDropoff} />

        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />

        {/* Home button - top right */}
        <button
          onClick={() => navigate('/home')}
          className="absolute top-5 right-5 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          title="Go Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-900">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* ===== BOTTOM PANEL ===== */}
      <div className={`bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-5 pt-4 pb-6 relative -mt-6 z-10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${panelMinimized ? 'translate-y-[65%]' : ''}`}>
        {/* Drag handle */}
        <div className="flex justify-center mb-4 cursor-pointer py-2 -my-2" onClick={() => setPanelMinimized(!panelMinimized)}>
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* ETA bar */}
        <div className="bg-green-600 text-white rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-green-200 uppercase tracking-wider">Arriving at destination</p>
            <p className="text-xl font-bold">{eta} min</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
              <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Captain info row */}
        <div className="flex items-center gap-3 mb-4">
          {/* Driver + vehicle overlapping */}
          <div className="relative shrink-0">
            <img
              src={captain.photo}
              alt={captain.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            />
            <div className="absolute -bottom-1 -right-2 w-7 h-7 rounded-md overflow-hidden border-2 border-white shadow bg-gray-100">
              <img src={ride.image} alt={ride.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 ml-1">
            <h3 className="text-sm font-bold text-gray-900 truncate">{captain.name}</h3>
            <p className="text-xs text-gray-500">{captain.vehicle.color} {captain.vehicle.name}</p>
          </div>

          {/* Plate + rating */}
          <div className="text-right shrink-0">
            <span className="bg-gray-100 text-[11px] font-bold text-gray-900 px-2 py-0.5 rounded inline-block">
              {captain.vehicle.plate}
            </span>
            <div className="flex items-center justify-end gap-0.5 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-yellow-400">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-gray-700">{captain.rating}</span>
            </div>
          </div>
        </div>

        {/* Route summary */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4">
          <div className="flex items-start gap-2.5">
            <div className="flex flex-col items-center pt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="w-[1.5px] h-5 border-l-[1.5px] border-dashed border-gray-300 my-0.5" />
              <div className="w-2 h-2 bg-red-500 rounded-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">{displayPickup}</p>
              <div className="h-2.5" />
              <p className="text-xs font-medium text-gray-900 truncate">{displayDropoff}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">{displayDistance}</p>
            </div>
          </div>
        </div>

        {/* Pay button */}
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-green-600 text-white font-bold text-base rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-green-600/25 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
            <path d="M1 14.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2Z" />
          </svg>
          Pay ₹{displayFare}
        </button>
      </div>
    </div>
  )
}

export default Riding
