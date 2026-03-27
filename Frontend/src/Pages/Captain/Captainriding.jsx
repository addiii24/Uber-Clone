import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import Finishride from '../../Components/Finishride'
import Livetracking from '../../Components/Livetracking'
import { SocketContext } from '../../Context/Socketiocontext'
import { CaptainDataContext } from '../../Context/Captaincontext'
import { useContext } from 'react'

const Captainriding = () => {

  const [Panelopen, setPanelopen] = useState(true)
  const Panelopenref = useRef(null)

  const location = useLocation()
  const { ride = null } = location?.state || {}

  const [finishRidePanel, setFinishRidePanel] = useState(false) // Start closed, peek via GSAP
  const finishRidePanelRef = useRef(null)
  const [distanceTime, setDistanceTime] = useState(null)
  const [captainLocation, setCaptainLocation] = useState(null)

  useGSAP(() => {
    if (Panelopen) {
      gsap.to(Panelopenref.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(Panelopenref.current, {
        transform: 'translateY(67%)',
        duration: 0.5,
        ease: 'power2.in',
      })
    }
  }, [Panelopen])

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(95%)',
        duration: 0.5,
        ease: 'power2.in',
      })
    }
  }, [finishRidePanel])

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/captain-logout')
  }

  const handleHome = () => {
    navigate('/captain-home')
  }

  const handleCompleteRide = () => {
    setFinishRidePanel(true)
  }

  const socket = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!socket || !captain?._id) return
    socket.emit('join', { userId: captain._id, userType: 'captain' })
  }, [socket, captain])

  useEffect(() => {
    if (!socket || !captain?._id) return

    const updateLoc = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const loc = {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          }
          setCaptainLocation(loc)
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: loc
          })
        })
      }
    }

    const interval = setInterval(updateLoc, 10000)
    updateLoc()

    return () => clearInterval(interval)
  }, [socket, captain])

  useEffect(() => {
    if (!ride?.destination || !captainLocation) return

    const fetchDistance = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-distance-time`, {
          params: {
            origin: `${captainLocation.ltd},${captainLocation.lng}`, 
            destination: ride.destination
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('captain-token')}`
          }
        })
        if (response.data.success && response.data.data) {
          setDistanceTime(response.data.data)
        }
      } catch (err) {
        console.error("Error fetching distance:", err)
      }
    }

    fetchDistance()
    const distInterval = setInterval(fetchDistance, 30000) // update distance every 30s
    return () => clearInterval(distInterval)
  }, [ride, captainLocation])
  return (
    <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden bg-gray-100 font-['Inter',sans-serif] flex flex-col">

      {/* ===== MAP AREA ===== */}
      <div className="relative flex-1 min-h-0">
        <Livetracking
          pickup={ride?.pickup}
          destination={ride?.destination}
        />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

        {/* ===== TOP BAR ===== */}
        <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
          {/* Uber logo - top left */}
          <img
            className="w-14 drop-shadow-md"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />

          {/* Logout button - top right */}
          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-5 h-5 bg-green-600 rounded-full border-[3px] border-white shadow-lg" />
            <div className="absolute -top-1.5 -left-1.5 w-8 h-8 bg-green-500/25 rounded-full animate-ping" />
          </div>
        </div>
        {/* ===== BOTTOM PANEL ===== */}
        <div
          ref={Panelopenref}
          onClick={() => setFinishRidePanel(true)}
          className="pt-11.5 pb-6 px-6 bg-yellow-400 flex items-center justify-between relative rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] flex-col -mt-4 z-20 cursor-pointer">
          {/* Drag handle */}
          <div className="w-full absolute top-2 left-0 flex justify-center cursor-pointer p-2" onClick={(e) => { e.stopPropagation(); setPanelopen(!Panelopen) }}>
            <div className="w-10 h-1.5 bg-yellow-600 rounded-full" />
          </div>

          <div className="flex items-center justify-between w-full mt-5 gap-6">
            <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">{distanceTime?.distance?.text || 'Calculating...'}</h2>
            <button 
              onClick={handleCompleteRide}
              className="flex-1 py-4 bg-green-600 text-white font-bold text-lg rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-green-600/30 flex items-center justify-center gap-2">
              Complete Ride
            </button>
          </div>
        </div>
      </div>

      {/* ===== FINISH RIDE POPUP PANEL ===== */}
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto translate-y-full"
      >
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] px-4 pt-4 pb-2" onClick={(e) => {
          // Only trigger if we click the header area while it's peeking, but Since Finishride has its own click, this may be optional. 
        }}>
          <Finishride
            ride={ride}
            distanceTime={distanceTime}
            setFinishRidePanel={setFinishRidePanel} />
        </div>
      </div>

    </div>
  )
}

export default Captainriding