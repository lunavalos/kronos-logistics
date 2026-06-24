"use client";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const fixLeafletIcon = () => {
  if (typeof window === 'undefined') return;
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

const createMarkerIcon = (color) => {
  if (typeof window === 'undefined') return null;
  return L.divIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="background-color: ${color}; width: 14px; height: 14px; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3); position: relative;">
          <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 6px; height: 6px; background: white; border-radius: 50%;"></span>
        </div>
      </div>
    `,
    className: 'custom-map-marker',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

const createCurrentLocationIcon = () => {
  if (typeof window === 'undefined') return null;
  return L.divIcon({
    html: `
      <div style="position: relative; width: 16px; height: 16px;">
        <div style="position: absolute; top: 0; left: 0; width: 16px; height: 16px; background-color: #3B82F6; border-radius: 50%; opacity: 0.4; transform: scale(1.8); animation: pulse 1.8s infinite ease-in-out;"></div>
        <div style="position: absolute; top: 1px; left: 1px; width: 14px; height: 14px; background-color: #3B82F6; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      </style>
    `,
    className: 'custom-current-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points && points.length > 0) {
      const validPoints = points.filter(p => p && p[0] && p[1]);
      if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
      }
    }
  }, [points, map]);
  return null;
}

// Forces Leaflet to recalculate tile coverage after the container has
// settled its final dimensions (fixes grey tiles in flex/grid layouts).
function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    // Small timeout ensures the CSS layout has fully resolved
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Also react to future container resize events (e.g. sidebar toggle)
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

export default function TrackingMap({ position, path = [], shipperPosition, consigneePosition }) {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const defaultCenter = [35.0, -98.0]; // Center of North America
  const center = position || shipperPosition || defaultCenter;
  const zoom = position ? 6 : 4;

  // Compile all points to calculate bounds
  const allPoints = [];
  if (shipperPosition) allPoints.push(shipperPosition);
  if (consigneePosition) allPoints.push(consigneePosition);
  if (position) allPoints.push(position);
  if (path && path.length > 0) {
    path.forEach(pt => allPoints.push(pt));
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      {allPoints.length > 1 ? (
        <FitBounds points={allPoints} />
      ) : (
        <ChangeView center={center} zoom={zoom} />
      )}
      <InvalidateSize />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Shipper Marker (Origin) */}
      {shipperPosition && (!position || shipperPosition[0] !== position[0] || shipperPosition[1] !== position[1]) && (
        <Marker position={shipperPosition} icon={createMarkerIcon('#10B981')}>
          <Popup>
            <strong>Origin (Shipper)</strong>
          </Popup>
        </Marker>
      )}

      {/* Consignee Marker (Destination) */}
      {consigneePosition && (
        <Marker position={consigneePosition} icon={createMarkerIcon('#EF4444')}>
          <Popup>
            <strong>Destination (Consignee)</strong>
          </Popup>
        </Marker>
      )}

      {/* Current Location Marker */}
      {position && (
        <Marker position={position} icon={createCurrentLocationIcon()}>
          <Popup>
            <strong>Current Location of Shipment</strong>
          </Popup>
        </Marker>
      )}

      {/* Polyline Route Line */}
      {path.length > 1 && (
        <Polyline positions={path} color="var(--primary)" weight={3} dashArray="5, 10" />
      )}
    </MapContainer>
  );
}
