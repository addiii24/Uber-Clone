import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Finishride from '../../Components/Finishride'

const Captainriding = () => {

      const [Panelopen, setPanelopen] = useState(true)
      const Panelopenref = useRef(null)

      const [finishRidePanel, setFinishRidePanel] = useState(true)
      const finishRidePanelRef = useRef(null)

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
        navigate('/captain-home')
    }
  return (
    <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden bg-gray-100 font-['Inter',sans-serif] flex flex-col">

      {/* ===== MAP AREA ===== */}
      <div className="relative flex-1 min-h-0">
        <img
          src="/map-bg.png"
          alt="Map"
          className="w-full h-4/5 object-cover"
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
        ref = {Panelopenref}
        onClick={() => setFinishRidePanel(true)}
        className="pt-11.5 pb-6 px-6 bg-yellow-400 flex items-center justify-between relative rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] flex-col -mt-4 z-20 cursor-pointer">
          {/* Drag handle */}
          <div className="w-full absolute top-2 left-0 flex justify-center cursor-pointer p-2" onClick={(e) => { e.stopPropagation(); setPanelopen(!Panelopen) }}>
            <div className="w-10 h-1.5 bg-yellow-600 rounded-full" />
          </div>
          
          <div className="flex items-center justify-between w-full mt-5 gap-6">
            <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">4 KM Away</h2>
            <button className="flex-1 py-4 bg-green-600 text-white font-bold text-lg rounded-2xl hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-green-600/30 flex items-center justify-center gap-2">
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
          <Finishride setFinishRidePanel={setFinishRidePanel} />
        </div>
      </div>

    </div>
  )
}

export default Captainriding