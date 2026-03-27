import React, { useState, useEffect, useRef, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polyline, OverlayView } from '@react-google-maps/api'

const MAP_LIBRARIES = ['places']
const mapContainerStyle = { width: '100%', height: '100%' }
const defaultCenter = { lat: 26.9124, lng: 75.7873 }

// ── Colorful, vibrant map style ──────────────────────────────────────────────
const mapStyles = [
  { elementType: 'geometry',            stylers: [{ color: '#e8f4f8' }] },
  { elementType: 'labels.text.fill',    stylers: [{ color: '#334155' }] },
  { elementType: 'labels.text.stroke',  stylers: [{ color: '#ffffff' }] },
  { elementType: 'labels.icon',         stylers: [{ visibility: 'off' }] },

  { featureType: 'water', elementType: 'geometry',          stylers: [{ color: '#93c5fd' }] },
  { featureType: 'water', elementType: 'labels.text.fill',  stylers: [{ color: '#1e40af' }] },

  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#d1fae5' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry', stylers: [{ color: '#eff6ff' }] },

  { featureType: 'poi.park',    elementType: 'geometry',          stylers: [{ color: '#bbf7d0' }] },
  { featureType: 'poi.park',    elementType: 'labels.text.fill',  stylers: [{ color: '#166534' }] },
  { featureType: 'poi',         elementType: 'geometry',          stylers: [{ color: '#dbeafe' }] },
  { featureType: 'poi',         elementType: 'labels.text.fill',  stylers: [{ color: '#1e3a5f' }] },

  { featureType: 'road',          elementType: 'geometry',           stylers: [{ color: '#ffffff' }] },
  { featureType: 'road',          elementType: 'geometry.stroke',    stylers: [{ color: '#cbd5e1' }] },
  { featureType: 'road.highway',  elementType: 'geometry',           stylers: [{ color: '#fde68a' }] },
  { featureType: 'road.highway',  elementType: 'geometry.stroke',    stylers: [{ color: '#f59e0b' }] },
  { featureType: 'road.highway',  elementType: 'labels.text.fill',   stylers: [{ color: '#78350f' }] },
  { featureType: 'road.arterial', elementType: 'geometry',           stylers: [{ color: '#fef9c3' }] },
  { featureType: 'road.arterial', elementType: 'labels.text.fill',   stylers: [{ color: '#713f12' }] },
  { featureType: 'road.local',    elementType: 'labels.text.fill',   stylers: [{ color: '#64748b' }] },

  { featureType: 'transit',             elementType: 'geometry',          stylers: [{ color: '#e0e7ff' }] },
  { featureType: 'transit.station',     elementType: 'labels.text.fill',  stylers: [{ color: '#4338ca' }] },
  { featureType: 'administrative',      elementType: 'geometry.stroke',   stylers: [{ color: '#94a3b8' }] },
  { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
]

const mapOptions = { disableDefaultUI: true, styles: mapStyles }

// ── Reusable pin SVG builder ─────────────────────────────────────────────────
const pinSvg = (fill) => encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="36" height="48">
    <filter id="s"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".35"/></filter>
    <path d="M18 0C9.163 0 0 8.163 0 18c0 13 18 30 18 30S36 31 36 18C36 8.163 27.837 0 18 0z" fill="${fill}" filter="url(#s)"/>
    <circle cx="18" cy="18" r="7" fill="white" opacity=".9"/>
  </svg>`
)

/**
 * Livetracking — colorful Google Map with live GPS, pickup/destination markers, and route.
 *
 * Props:
 *   pickup      {string}  — Pickup address (optional)
 *   destination {string}  — Destination address (optional)
 */
const Livetracking = ({ pickup, destination }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API || '',
    libraries: MAP_LIBRARIES,
  })

  const [userPosition,  setUserPosition]  = useState(null)
  const [routePath,     setRoutePath]     = useState([])
  const [routeMarkers,  setRouteMarkers]  = useState({ start: null, end: null })
  const [mapCenter,     setMapCenter]     = useState(defaultCenter)
  const mapRef    = useRef(null)
  const watchRef  = useRef(null)
  const pollRef   = useRef(null)

  // ── GPS: watchPosition + 5-second poll ─────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) return

    const apply = (pos) => {
      const c = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      setUserPosition(c)
      setMapCenter(c)
      if (mapRef.current) mapRef.current.panTo(c)
    }

    const opts = { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    navigator.geolocation.getCurrentPosition(apply, () => {}, opts)
    watchRef.current = navigator.geolocation.watchPosition(apply, () => {}, opts)
    pollRef.current  = setInterval(() =>
      navigator.geolocation.getCurrentPosition(apply, () => {}, { enableHighAccuracy: true, maximumAge: 3000 })
    , 5000)

    return () => {
      if (watchRef.current != null) navigator.geolocation.clearWatch(watchRef.current)
      clearInterval(pollRef.current)
    }
  }, [])

  // ── Directions: only fetch when BOTH addresses are non-empty ──────────
  useEffect(() => {
    if (!isLoaded || !pickup?.trim() || !destination?.trim()) {
      // Clear route if either address is missing
      setRoutePath([])
      setRouteMarkers({ start: null, end: null })
      return
    }

    const svc = new window.google.maps.DirectionsService()
    svc.route(
      { origin: pickup, destination, travelMode: window.google.maps.TravelMode.DRIVING },
      (result, status) => {
        if (status !== 'OK') return
        const route = result.routes[0]
        setRoutePath(route.overview_path.map(p => ({ lat: p.lat(), lng: p.lng() })))
        setRouteMarkers({
          start: { lat: route.legs[0].start_location.lat(), lng: route.legs[0].start_location.lng() },
          end:   { lat: route.legs[0].end_location.lat(),   lng: route.legs[0].end_location.lng() },
        })
        if (mapRef.current && route.bounds) {
          mapRef.current.fitBounds(route.bounds, { top: 80, bottom: 80, left: 50, right: 50 })
        }
      }
    )
  }, [isLoaded, pickup, destination])

  const onMapLoad = useCallback(map => { mapRef.current = map }, [])

  // ── States ──────────────────────────────────────────────────────────────
  if (loadError) return (
    <div className="w-full h-full flex items-center justify-center bg-blue-50">
      <p className="text-sm text-slate-400">Map unavailable</p>
    </div>
  )

  if (!isLoaded) return (
    <div className="w-full h-full flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <div style={{
          width:32, height:32, margin:'0 auto 8px',
          border:'3px solid #3b82f6', borderTopColor:'transparent',
          borderRadius:'50%', animation:'ltspin .8s linear infinite'
        }}/>
        <p className="text-xs text-slate-400">Loading map…</p>
        <style>{`@keyframes ltspin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes ltping {
          0%   { transform:translate(-50%,-50%) scale(1); opacity:1 }
          75%,100% { transform:translate(-50%,-50%) scale(2.5); opacity:0 }
        }
      `}</style>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={15}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {/* ── Route polyline ── */}
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: '#6366f1',
              strokeWeight: 5,
              strokeOpacity: 0.9,
            }}
          />
        )}

        {/* ── Pickup marker: green pin ── */}
        {routeMarkers.start && (
          <Marker
            position={routeMarkers.start}
            title="Pickup"
            icon={{
              url: `data:image/svg+xml,${pinSvg('#22c55e')}`,
              scaledSize: new window.google.maps.Size(36, 48),
              anchor: new window.google.maps.Point(18, 48),
            }}
          />
        )}

        {/* ── Destination marker: red pin ── */}
        {routeMarkers.end && (
          <Marker
            position={routeMarkers.end}
            title="Destination"
            icon={{
              url: `data:image/svg+xml,${pinSvg('#ef4444')}`,
              scaledSize: new window.google.maps.Size(36, 48),
              anchor: new window.google.maps.Point(18, 48),
            }}
          />
        )}

        {/* ── Animated user dot ── */}
        {userPosition && (
          <OverlayView position={userPosition} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div style={{ position:'relative', width:24, height:24, transform:'translate(-50%,-50%)' }}>
              <div style={{
                position:'absolute', top:'50%', left:'50%',
                width:36, height:36, borderRadius:'50%',
                background:'rgba(99,102,241,0.25)',
                animation:'ltping 1.5s cubic-bezier(0,0,.2,1) infinite',
              }}/>
              <div style={{
                position:'absolute', top:'50%', left:'50%',
                transform:'translate(-50%,-50%)',
                width:16, height:16, borderRadius:'50%',
                background:'#6366f1',
                border:'3px solid white',
                boxShadow:'0 2px 8px rgba(99,102,241,0.5)',
              }}/>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </>
  )
}

export default Livetracking