import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Captaindetails from '../../Components/Captaindetails'
import Ridepopup from '../../Components/Ridepopup'
import Confirmridepopup from '../../Components/Confirmridepopup'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const Captainhome = () => {
  const navigate = useNavigate()
  // const [isOnline, setIsOnline] = useState(false)
  const [captainPanel, setCaptainPanel] = useState(true)
  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const captainPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

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
        <img
          src="/map-bg.png"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />

        {/* ===== TOP BAR ===== */}
        <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
          {/* Uber logo - top left */}
          <img
            className="w-14 drop-shadow-md"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />

          {/* Online/Offline toggle - top middle
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full shadow-lg font-semibold text-sm transition-all active:scale-95 cursor-pointer ${
              isOnline
                ? 'bg-green-600 text-white shadow-green-600/30'
                : 'bg-white text-gray-700 shadow-gray-200/50'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-red-500'}`} />
            {isOnline ? 'Online' : 'Offline'}
          </button> */}

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

        {/* ===== Status text below top bar ===== */}
        {/* <div className="absolute top-[72px] left-0 right-0 z-20 flex justify-center">
          <h2 className={`text-sm font-bold ${isOnline ? 'text-green-700' : 'text-gray-700'}`}>
            {isOnline ? '🟢 You are Online' : '🔴 You are Offline'}
          </h2>
        </div> */}

        {/* ===== Offline overlay message on map ===== */}
        {/* {!isOnline && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="bg-white rounded-2xl px-8 py-6 text-center shadow-2xl max-w-[280px] animate-[fadeIn_0.3s_ease]">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-red-500">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">You are offline!</h3>
              <p className="text-sm text-gray-500 mb-5">Go online to start accepting rides</p>
            </div>
          </div>
        )} */}

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
          <Captaindetails setRidePopupPanel={setRidePopupPanel} />
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
          <Ridepopup setridePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>
      </div>

      {/* Confirm Ride PopUp Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto translate-y-full"
      >
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] px-4 pt-4 pb-2">
          <Confirmridepopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>
      </div>
    </div>

  )
}

export default Captainhome