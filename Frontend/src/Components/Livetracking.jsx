import React, { useState, useEffect, useRef, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polyline, OverlayView } from '@react-google-maps/api'

const MAP_LIBRARIES = ['places']

const mapContainerStyle = { width: '100%', height: '100%' }

const defaultCenter = { lat: 26.9124, lng: 75.7873 }

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#f2f2f2' }] },
]

const mapOptions = {
  disableDefaultUI: true,
  styles: mapStyles,
}

/**
 * Livetracking — Google Map with live user GPS, route, pickup + destination markers.
 *
 * Props:
 *   pickup      {string}  — Pickup address string (optional)
 *   destination {string}  — Destination address string (optional)
 */
const Livetracking = ({ pickup, destination }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: MAP_LIBRARIES,
  })

  const [userPosition, setUserPosition] = useState(null)
  const [routePath, setRoutePath] = useState([])     // array of {lat,lng} for Polyline
  const [routeMarkers, setRouteMarkers] = useState({ start: null, end: null })
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const mapRef = useRef(null)
  const watchIdRef = useRef(null)
  const intervalRef = useRef(null)

  // ── 1. GPS: watchPosition + 5-second interval poll ───────────────────────
  useEffect(() => {
    if (!navigator.geolocation) return

    const applyPosition = (pos) => {
      const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      setUserPosition(coords)
      setMapCenter(coords)
      if (mapRef.current) mapRef.current.panTo(coords)
    }

    // Initial grab
    navigator.geolocation.getCurrentPosition(applyPosition, () => {}, {
      enableHighAccuracy: true,
    })

    // Continuous device watch (fires on movement)
    watchIdRef.current = navigator.geolocation.watchPosition(applyPosition, () => {}, {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000,
    })

    // Also poll every 5 seconds (covers devices that throttle watchPosition)
    intervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(applyPosition, () => {}, {
        enableHighAccuracy: true,
        maximumAge: 3000,
      })
    }, 5000)

    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // ── 2. Directions API whenever pickup/destination change ─────────────────
  useEffect(() => {
    if (!isLoaded || !pickup || !destination) return
    const svc = new window.google.maps.DirectionsService()
    svc.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          const route = result.routes[0]
          // Extract plain {lat,lng} array from overview_path (no DirectionsRenderer needed)
          const path = route.overview_path.map(p => ({ lat: p.lat(), lng: p.lng() }))
          setRoutePath(path)
          setRouteMarkers({
            start: { lat: route.legs[0].start_location.lat(), lng: route.legs[0].start_location.lng() },
            end:   { lat: route.legs[0].end_location.lat(),   lng: route.legs[0].end_location.lng() },
          })
          if (mapRef.current && route.bounds) {
            mapRef.current.fitBounds(route.bounds, { top: 60, bottom: 60, left: 40, right: 40 })
          }
        }
      }
    )
  }, [isLoaded, pickup, destination])

  const onMapLoad = useCallback((map) => { mapRef.current = map }, [])

  // ── 3. Render states ─────────────────────────────────────────────────────
  if (loadError) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <p style={{ color: '#9ca3af', fontSize: 13 }}>Map unavailable</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 28, height: 28, margin: '0 auto 8px',
            border: '3px solid #16a34a', borderTopColor: 'transparent',
            borderRadius: '50%', animation: 'ltspin 0.8s linear infinite'
          }} />
          <p style={{ fontSize: 12, color: '#9ca3af' }}>Loading map…</p>
          <style>{`@keyframes ltspin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Pulsing dot keyframe — scoped name to avoid conflicts */}
      <style>{`
        @keyframes ltping {
          0%   { transform: translate(-50%,-50%) scale(1); opacity:1 }
          75%,100% { transform: translate(-50%,-50%) scale(2.5); opacity:0 }
        }
      `}</style>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={15}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {/* Route polyline — drawn from overview_path (no deprecated DirectionsRenderer) */}
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: '#111827',
              strokeWeight: 4,
              strokeOpacity: 0.8,
            }}
          />
        )}

        {/* Pickup marker */}
        {routeMarkers.start && (
          <Marker
            position={routeMarkers.start}
            icon={{
              url: 'data:image/svg+xml,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#22c55e" stroke="white" stroke-width="2.5"/>
                  <circle cx="12" cy="12" r="4" fill="white"/>
                </svg>`
              ),
              scaledSize: new window.google.maps.Size(28, 28),
              anchor: new window.google.maps.Point(14, 14),
            }}
          />
        )}

        {/* Destination marker */}
        {routeMarkers.end && (
          <Marker
            position={routeMarkers.end}
            icon={{
              url: 'data:image/svg+xml,' + encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 10.667 16 24 16 24S32 26.667 32 16C32 7.163 24.837 0 16 0z" fill="#ef4444"/>
                  <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>`
              ),
              scaledSize: new window.google.maps.Size(32, 40),
              anchor: new window.google.maps.Point(16, 40),
            }}
          />
        )}

        {/* Animated user dot */}
        {userPosition && (
          <OverlayView position={userPosition} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div style={{ position: 'relative', width: 24, height: 24, transform: 'translate(-50%, -50%)' }}>
              {/* Pulse ring */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 36, height: 36, borderRadius: '50%',
                backgroundColor: 'rgba(34,197,94,0.25)',
                animation: 'ltping 1.5s cubic-bezier(0,0,0.2,1) infinite',
              }} />
              {/* Core dot */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 16, height: 16, borderRadius: '50%',
                backgroundColor: '#16a34a',
                border: '3px solid white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }} />
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </>
  )
}

export default Livetracking