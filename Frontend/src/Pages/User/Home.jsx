import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import VehiclePanel from '../../Components/VehiclePanel'
import ConfirmRide from '../../Components/Confrimride'
import Lookingforvehicle from '../../Components/Lookingforvehicle'
import Waitingfordriver from '../../Components/Waitingfordriver'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [showRides, setShowRides] = useState(false)
  const [selectedRide, setSelectedRide] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showLooking, setShowLooking] = useState(false)
  const [showWaiting, setShowWaiting] = useState(false)

  const navigate = useNavigate()
  const panelRef = useRef(null)

  // Ride options data
  const rides = [
    {
      id: 'ubergo',
      name: 'UberGo',
      image: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
      seats: '4',
      eta: '2 mins away',
      price: 193,
      originalPrice: 225,
      tag: 'Cheapest',
      description: 'Affordable, compact rides',
    },
    {
      id: 'moto',
      name: 'Moto',
      image: 'https://imgs.search.brave.com/3OfMItnu_TZ5JBJQk5KHo678LBg9r6urMdw7c-sjT14/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLWdyYXR1aXRh/cy9zY29vdGVyLWxh/cmFuamEtZWxlZ2Fu/dGUtdmVpY3Vsby1k/ZS10cmFuc3BvcnRl/LWRlLWRlc2lnbi1t/b2Rlcm5vXzYzMjQ5/OC01MzM1Ny5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQw',
      seats: '1',
      eta: '3 mins away',
      price: 65,
      tag: 'Fastest',
      description: 'Affordable motorcycle rides',
    },
    {
      id: 'auto',
      name: 'Auto',
      image: 'https://imgs.search.brave.com/r4DFS316mXJUGmhxw_XACKGsGjKi0EYnwy_quLeOv3I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzU5LzY4Lzgx/LzM2MF9GXzk1OTY4/ODE1MF9JUkxPV3pF/QzF0RWxGeFZYSnpI/RzNtRk9VbnlndFhP/Ni5qcGc',
      seats: '3',
      eta: '5 mins away',
      price: 118,
      originalPrice: 140,
      description: 'No bargaining, doorstep pickup',
    },
  ]


  // Saved locations
  const savedLocations = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.69Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a.75.75 0 0 1 .091-.086L12 5.432Z" />
        </svg>
      ),
      title: 'Home',
      subtitle: 'Add your home address',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
        </svg>
      ),
      title: 'Work',
      subtitle: 'Add your work address',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pickup && dropoff) {
      setShowRides(true)
      setPanelOpen(true)
    }
  }

  const handleInputFocus = (field) => {
    setActiveField(field)
    setPanelOpen(true)
    setShowRides(false)
    setSelectedRide(null)
  }

  const closePanelHandler = () => {
    setPanelOpen(false)
    setActiveField(null)
    setShowRides(false)
    setSelectedRide(null)
    setShowConfirm(false)
    setShowLooking(false)
    setShowWaiting(false)
  }

  const handleBackFromRides = () => {
    setShowRides(false)
    setSelectedRide(null)
    setShowConfirm(false)
  }

  const handleConfirmRide = () => {
    setShowConfirm(true)
    setShowRides(false)
  }

  const handleBackFromConfirm = () => {
    setShowConfirm(false)
    setShowRides(true)
  }

  const handleFinalConfirm = () => {
    setShowConfirm(false)
    setShowLooking(true)
  }

  const handleCancelLooking = () => {
    setShowLooking(false)
    setShowRides(true)
  }

  const handleDriverFound = () => {
    setShowLooking(false)
    setShowWaiting(true)
  }

  const handleCancelWaiting = () => {
    setShowWaiting(false)
    closePanelHandler()
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto relative overflow-hidden bg-gray-100 font-['Inter',sans-serif]">

      {/* ===== MAP BACKGROUND ===== */}
      <div className="absolute inset-0 z-0" >
        <img onClick={(e) => {
          setPanelOpen(false);
        }}
          src="/map-bg.png"
          alt="Map"
          className="w-full h-full object-cover"
        />

        
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/70 to-transparent" />

      </div>

      {/* ===== USER LOCATION MARKER ===== */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="w-4 h-4 bg-black rounded-full border-[3px] border-white shadow-lg" />
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-black/20 rounded-full animate-ping" />
        </div>
      </div>

      {/* ===== MENU BUTTON ===== */}
      <button className="absolute top-6 right-6 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
        onClick={() => navigate('/logout')}
        title="Logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
      </button>

      {/* ===== BOTTOM PANEL ===== */}
      <div
        ref={panelRef}
        className={`absolute left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${panelOpen ? 'bottom-0 h-[75%]' : 'bottom-0 h-auto'
          } ${showRides || showConfirm || showLooking || showWaiting ? 'h-[80%]' : ''}`}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-pointer"
          onClick={() => panelOpen && closePanelHandler()}
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-5 pb-6 h-[calc(100%-24px)] overflow-y-auto scrollbar-hide">
          {/* ===== WAITING FOR DRIVER VIEW ===== */}
          {showWaiting && selectedRide ? (
            <Waitingfordriver
              ride={rides.find(r => r.id === selectedRide)}
              pickup={pickup}
              dropoff={dropoff}
              onCancel={handleCancelWaiting}
            />
          ) : showLooking && selectedRide ? (
            <Lookingforvehicle
              ride={rides.find(r => r.id === selectedRide)}
              pickup={pickup}
              dropoff={dropoff}
              onCancel={handleCancelLooking}
              onDriverFound={handleDriverFound}
            />
          ) : showConfirm && selectedRide ? (
            <ConfirmRide
              ride={rides.find(r => r.id === selectedRide)}
              pickup={pickup}
              dropoff={dropoff}
              onBack={handleBackFromConfirm}
              onConfirm={handleFinalConfirm}
            />
          ) : showRides ? (
            <VehiclePanel
              rides={rides}
              selectedRide={selectedRide}
              onSelectRide={setSelectedRide}
              onConfirm={handleConfirmRide}
              onBack={handleBackFromRides}
              pickup={pickup}
              dropoff={dropoff}
            />
          ) : (
            <>
              {/* Greeting */}
              {!panelOpen && (
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Where to?
                  </h2>
                </div>
              )}

              {/* ===== SEARCH FORM ===== */}
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  {/* Route line indicators */}
                  <div className="absolute left-4 top-[22px] bottom-[22px] w-[2px] flex flex-col items-center z-10 pointer-events-none">
                    <div className="w-2.5 h-2.5 bg-gray-900 rounded-full shrink-0" />
                    <div className="flex-1 w-[2px] border-l-2 border-dashed border-gray-300 my-1" />
                    <div className="w-2.5 h-2.5 bg-gray-900 rounded-sm shrink-0" />
                  </div>

                  {/* Pickup input */}
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      onFocus={() => handleInputFocus('pickup')}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-100 rounded-xl text-[15px] font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:ring-2 focus:ring-black/10 transition-all"
                    />
                  </div>

                  {/* Dropoff input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Where to?"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      onFocus={() => handleInputFocus('dropoff')}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-100 rounded-xl text-[15px] font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:ring-2 focus:ring-black/10 transition-all"
                    />
                  </div>
                </div>

                {/* Find trip button */}
                {panelOpen && pickup && dropoff && (
                  <button
                    type="submit"
                    className="w-full mt-4 bg-black text-white font-semibold py-3.5 rounded-xl text-base hover:bg-gray-900 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Find Trip
                  </button>
                )}
              </form>

              {/* ===== QUICK ACTION CARDS (collapsed) ===== */}
              {!panelOpen && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                  {[
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                          <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clipRule="evenodd" />
                        </svg>
                      ),
                      label: 'Ride',
                      bg: 'bg-gray-900',
                      text: 'text-white',
                    },
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a3 3 0 1 1 6 0h.375c1.035 0 1.875-.84 1.875-1.875V18a3 3 0 0 0-3-3H13.5Zm.75 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75V15ZM16.5 13.5V6a1.5 1.5 0 0 1 1.5-1.5h2.25a2.25 2.25 0 0 1 2.086 1.414l1.38 3.45A1.5 1.5 0 0 1 24 10.077V13.5h-7.5Z" />
                          <path d="M7.5 18.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                        </svg>
                      ),
                      label: 'Package',
                      bg: 'bg-gray-100',
                      text: 'text-gray-900',
                    },
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                      ),
                      label: 'Rentals',
                      bg: 'bg-gray-100',
                      text: 'text-gray-900',
                    },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className={`flex items-center gap-2 px-5 py-3 rounded-full ${item.bg} ${item.text} text-sm font-semibold whitespace-nowrap shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {/* ===== EXPANDED PANEL CONTENT ===== */}
              {panelOpen && (
                <div className="mt-5 animate-[fadeIn_0.3s_ease]">
                  {/* Close/back button */}
                  <button
                    onClick={closePanelHandler}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium mb-4 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                    </svg>
                    Back
                  </button>

                  {/* Saved places */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Saved Places
                    </h3>
                    {savedLocations.map((loc, i) => (
                      <button
                        key={i}
                        className="flex items-center gap-4 w-full py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
                        onClick={() => {
                          if (activeField === 'pickup') setPickup(loc.title)
                          else setDropoff(loc.title)
                        }}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 shrink-0">
                          {loc.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-[15px] font-semibold text-gray-900">{loc.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{loc.subtitle}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-300 ml-auto shrink-0">
                          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  {/* Recent searches */}
                  <div className="mt-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Recent
                    </h3>
                    {[
                      { name: 'Connaught Place', address: 'New Delhi, Delhi 110001' },
                      { name: 'IGI Airport T3', address: 'New Delhi, Delhi 110037' },
                      { name: 'Cyber Hub', address: 'Gurugram, Haryana 122002' },
                    ].map((place, i) => (
                      <button
                        key={i}
                        className="flex items-center gap-4 w-full py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
                        onClick={() => {
                          if (activeField === 'pickup') setPickup(place.name)
                          else setDropoff(place.name)
                        }}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-[15px] font-semibold text-gray-900">{place.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{place.address}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home