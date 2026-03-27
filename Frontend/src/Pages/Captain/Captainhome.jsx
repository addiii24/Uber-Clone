import React, { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Captaindetails from '../../Components/Captaindetails'
import Ridepopup from '../../Components/Ridepopup'
import Confirmridepopup from '../../Components/Confirmridepopup'
import Livetracking from '../../Components/Livetracking'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SocketContext } from '../../Context/Socketiocontext'
import { CaptainDataContext } from '../../Context/Captaincontext'



const Captainhome = () => {
  const navigate = useNavigate()
  // const [isOnline, setIsOnline] = useState(false)
  const [captainPanel, setCaptainPanel] = useState(true)
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [captainData, setCaptainData] = useState(null)
  const [ride, setRide] = useState(null)
  const [distanceTime, setDistanceTime] = useState(null)
  const ridePopupPanelRef = useRef(null)
  const captainPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { captain } = useContext(CaptainDataContext)
  const socket = useContext(SocketContext)   // context value IS the socket, not {socket}

  const confirmRide = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`, {
        rideId: ride._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captain-token')}`
        }
      })
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    } catch (err) {
      console.error("confirmRide error:", err.response?.data || err.message)
    }
  }


  useEffect(() => {
    if (!captain?._id) return

    const joinSocket = () => {
      socket.emit("join", {
        userId: captain._id,
        userType: "captain"
      })
      console.log("📡 Captain joined socket:", captain._id, socket.id)
    }

    joinSocket()
    socket.on('connect', joinSocket)

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    return () => {
      socket.off('connect', joinSocket)
      clearInterval(locationInterval)
    }
  }, [captain, socket])

  useEffect(() => {
    socket.on("new-ride", async (data) => {
      console.log("new-ride", data)
      setRide(data)
      setRidePopupPanel(true)
      // Fetch real distance & duration for this ride
     try {
        const mapResponse = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'}/map/get-distance-time`, {
          params: { origin: data.pickup, destination: data.destination },
          headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` }
        })
        if (mapResponse.data.success) {
          setDistanceTime(mapResponse.data.data)
        }
      } catch (err) {
        console.error("Failed to fetch distance/time:", err.response?.data || err.message)
      }
    })

    return () => socket.off("new-ride")
  }, [socket])

  const fetchCaptain = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captain-token')}`,
        },
      })
      setCaptainData(response.data?.user || response.data || null)
    } catch (error) {
      console.log('fetchCaptain error', error)
      setCaptainData(null)
    }
  }

  useEffect(() => {
    fetchCaptain()
  }, [])

  // Animate RidePopup panel
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in',
      })
    }
  }, [ridePopupPanel])

  // Animate CaptainDetails panel
  useGSAP(() => {
    if (captainPanel) {
      gsap.to(captainPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(captainPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in',
      })
    }
  }, [captainPanel])

  // Animate Confirm Ride Popup panel
  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in',
      })
    }
  }, [confirmRidePopupPanel])

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
            onClick={() => navigate('/captain-logout')}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </button>
        </div>

        {/* Online location marker */}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-5 h-5 bg-green-600 rounded-full border-[3px] border-white shadow-lg" />
            <div className="absolute -top-1.5 -left-1.5 w-8 h-8 bg-green-500/25 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* ===== CAPTAIN DETAILS BOTTOM PANEL ===== */}
      <div
        ref={captainPanelRef}

        className="fixed bottom-0 left-0 right-0 z-20 max-w-md mx-auto"
      >
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-5 pt-4 pb-5">
          {/* Drag handle - toggles captain details */}
          <div className="flex justify-center mb-3 cursor-pointer py-2 -my-2" onClick={() => setCaptainPanel(!captainPanel)}>
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          <Captaindetails captainData={captainData} setRidePopupPanel={setRidePopupPanel} />
        </div>
      </div>

      {/* ===== PULL-UP TAB (visible when both panels are hidden) ===== */}
      {!captainPanel && !ridePopupPanel && (
        <div
          className="fixed bottom-0 left-0 right-0 z-20 max-w-md mx-auto animate-[fadeIn_0.3s_ease]"
        >
          <div
            className="bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-5 py-3 flex items-center justify-between cursor-pointer"
            onClick={() => setCaptainPanel(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-900">You're online</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
              <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* ===== RIDE POPUP OVERLAY (slides up from bottom) ===== */}
      <div
        ref={ridePopupPanelRef}
        className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto translate-y-full"
      >
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] px-5 pt-4 pb-6">
          {/* Drag handle */}
          <div className="flex justify-center mb-3 cursor-pointer py-2 -my-2" onClick={() => setRidePopupPanel(false)}>
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          <Ridepopup
            ride={ride}
            distanceTime={distanceTime}
            confirmRide={confirmRide}
           setridePopupPanel={setRidePopupPanel} 
           setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>
      </div>

      {/* Confirm Ride PopUp Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto translate-y-full"
      >
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] px-4 pt-4 pb-2">
          <Confirmridepopup ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>
      </div>
    </div>

  )
}

export default Captainhome