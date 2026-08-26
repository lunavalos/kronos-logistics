"use client";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icons
const fixLeafletIcon = () => {
  if (typeof window === 'undefined') return;
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

const createAirportIcon = (isActive) => {
  if (typeof window === 'undefined') return null;
  const color = '#D32F2F'; // Always red
  const size = isActive ? 20 : 14;
  const border = isActive ? '3px solid #ffffff' : '2px solid #ffffff';
  const glow = 'box-shadow: 0 0 12px rgba(211, 47, 47, 0.8);'; // Always glow
  
  return L.divIcon({
    html: `
      <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: ${size + 12}px; height: ${size + 12}px; background-color: #D32F2F; border-radius: 50%; opacity: 0.4; animation: pulse-active 1.5s infinite ease-in-out;"></div>
        <div style="position: absolute; width: ${size}px; height: ${size}px; background-color: ${color}; border: ${border}; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3); ${glow}"></div>
      </div>
      <style>
        @keyframes pulse-active {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      </style>
    `,
    className: 'custom-airport-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

function MapController({ activeCoord }) {
  const map = useMap();
  useEffect(() => {
    if (activeCoord) {
      map.setView(activeCoord, 8, { animate: true, duration: 1.2 });
    } else {
      map.setView([21.8, -101.5], 5, { animate: true, duration: 1.2 });
    }
  }, [activeCoord, map]);
  return null;
}

function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const container = map.getContainer();
    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        map.invalidateSize();
      });
      observer.observe(container);
    }

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [map]);
  return null;
}

export default function AirportsMap({ airports, activeAirportIndex, onMarkerClick }) {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const activeCoord = activeAirportIndex !== null ? airports[activeAirportIndex].coords : null;

  return (
    <MapContainer
      center={[21.8, -101.5]}
      zoom={5}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
      <MapController activeCoord={activeCoord} />
      <InvalidateSize />
      {airports.map((airport, idx) => (
        <Marker
          key={idx}
          position={airport.coords}
          icon={createAirportIcon(activeAirportIndex === idx)}
          eventHandlers={{
            click: () => onMarkerClick(idx)
          }}
        >
          <Popup>
            <div style={{ padding: '2px', fontFamily: 'var(--font-sans, sans-serif)' }}>
              <strong style={{ fontSize: '14px', color: '#111' }}>{airport.name}</strong>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{airport.code}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
