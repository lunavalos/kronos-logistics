"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, Clock } from "lucide-react";
import styles from "@/app/track/track.module.css";

// Dynamic import for Leaflet (client-side only)
const TrackingMap = dynamic(() => import("@/components/Tracking/TrackingMap"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map...</div>
});

export default function TrackingView({ initialChainCode = "" }) {
  const [chainCode, setChainCode] = useState(initialChainCode);
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracking = useCallback(async (code) => {
    if (!code) return;

    setIsLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const res = await fetch(`https://klweb.app/api/tracking/${code}`, {
        headers: { 'Accept': 'application/json' }
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Shipment not found");
      }

      const shipment = data.shipment;

      // Format ETA
      let eta = "TBD";
      if (shipment.status.eta_delivery_date) {
        const date = new Date(shipment.status.eta_delivery_date);
        eta = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        if (shipment.status.eta_delivery_time) {
          const [hours, minutes] = shipment.status.eta_delivery_time.split(":");
          eta += ` ${hours}:${minutes} ${shipment.status.timezone || "CST"}`;
        }
      }

      // Map history entries
      const history = (shipment.history || []).map((entry) => {
        const ts = entry.timestamp ? new Date(entry.timestamp) : null;
        return {
          date: ts ? ts.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—",
          time: ts ? ts.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "",
          location: entry.city || "—",
          status: entry.status || entry.notes || "—"
        };
      });

      // Detect if shipment has real data or just placeholders
      const placeholders = ["shipper", "consignee", "—", "", "n/a"];
      const isOriginPlaceholder = placeholders.includes((shipment.shipper_name || "").toLowerCase().trim());
      const isDestPlaceholder = placeholders.includes((shipment.consignee_name || "").toLowerCase().trim());
      // A shipment is only pending if shipper and consignee are placeholders AND there is no history entries
      const pending = isOriginPlaceholder && isDestPlaceholder && (!shipment.history || shipment.history.length === 0);

      // Helper to parse lat/lng from any string (including Google Maps links)
      const parseCoords = (str) => {
        if (!str) return null;
        const regex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/;
        const match = str.match(regex);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            return [lat, lng];
          }
        }
        return null;
      };

      // 1. Try to extract from the new 'shipment.map' structure
      let shipperPosition = null;
      let consigneePosition = null;
      let position = null;
      const path = [];

      const mapData = shipment.map;
      if (mapData) {
        if (mapData.origin?.coordinates) {
          const c = mapData.origin.coordinates;
          const lat = c.lat ?? c.latitude;
          const lon = c.lon ?? c.lng ?? c.longitude;
          if (lat !== undefined && lon !== undefined) {
            shipperPosition = [parseFloat(lat), parseFloat(lon)];
          }
        }
        if (mapData.destination?.coordinates) {
          const c = mapData.destination.coordinates;
          const lat = c.lat ?? c.latitude;
          const lon = c.lon ?? c.lng ?? c.longitude;
          if (lat !== undefined && lon !== undefined) {
            consigneePosition = [parseFloat(lat), parseFloat(lon)];
          }
        }
        if (mapData.current?.coordinates) {
          const c = mapData.current.coordinates;
          const lat = c.lat ?? c.latitude;
          const lon = c.lon ?? c.lng ?? c.longitude;
          if (lat !== undefined && lon !== undefined) {
            position = [parseFloat(lat), parseFloat(lon)];
          }
        }
      }

      // 2. Fallbacks for Current Location if not set via mapData
      if (!position) {
        if (shipment.location?.coordinates) {
          const c = shipment.location.coordinates;
          const lat = c.lat ?? c.latitude;
          const lon = c.lon ?? c.lng ?? c.longitude;
          if (lat !== undefined && lon !== undefined) {
            position = [parseFloat(lat), parseFloat(lon)];
          }
        }
        
        if (!position) {
          position = parseCoords(shipment.location?.gps_link);
        }

        if (!position) {
          const lat = shipment.location?.latitude || 
                      shipment.location?.lat || 
                      shipment.latitude || 
                      shipment.lat ||
                      shipment.status?.latitude ||
                      shipment.status?.lat ||
                      shipment.status?.location?.latitude ||
                      shipment.status?.location?.lat;

          const lng = shipment.location?.longitude || 
                      shipment.location?.lng || 
                      shipment.longitude || 
                      shipment.lng ||
                      shipment.status?.longitude ||
                      shipment.status?.lng ||
                      shipment.status?.location?.longitude ||
                      shipment.status?.location?.lng;

          position = (lat && lng) ? [parseFloat(lat), parseFloat(lng)] : null;
        }
      }

      // Helper to parse shipper/consignee coordinates from general fields as fallback
      const getCoords = (prefix) => {
        const cLat = shipment[`${prefix}_latitude`] || 
                     shipment[`${prefix}_lat`] || 
                     shipment[prefix]?.latitude || 
                     shipment[prefix]?.lat || 
                     shipment[`${prefix}_location`]?.latitude ||
                     shipment[`${prefix}_location`]?.lat;
        const cLng = shipment[`${prefix}_longitude`] || 
                     shipment[`${prefix}_lng`] || 
                     shipment[prefix]?.longitude || 
                     shipment[prefix]?.lng || 
                     shipment[`${prefix}_location`]?.longitude ||
                     shipment[`${prefix}_location`]?.lng;
        return (cLat && cLng) ? [parseFloat(cLat), parseFloat(cLng)] : null;
      };

      if (!shipperPosition) {
        shipperPosition = getCoords('shipper');
      }
      if (!consigneePosition) {
        consigneePosition = getCoords('consignee');
      }

      // 3. Extract route path coordinates from history
      const historyCoords = (shipment.history || [])
        .map(entry => {
          if (entry.coordinates) {
            const c = entry.coordinates;
            const lat = c.lat ?? c.latitude;
            const lon = c.lon ?? c.lng ?? c.longitude;
            if (lat !== undefined && lon !== undefined) {
              return [parseFloat(lat), parseFloat(lon)];
            }
          }
          let coords = parseCoords(entry.gps_link);
          if (!coords) {
            const lat = entry.latitude || entry.lat;
            const lng = entry.longitude || entry.lng;
            if (lat && lng) {
              coords = [parseFloat(lat), parseFloat(lng)];
            }
          }
          return coords;
        })
        .filter(coords => coords !== null)
        .reverse(); // oldest to newest

      // If shipperPosition is not explicitly set, fallback to the oldest history coordinate
      if (!shipperPosition && historyCoords.length > 0) {
        shipperPosition = historyCoords[0];
      }

      // Assemble path array starting from shipperPosition
      if (shipperPosition) {
        path.push(shipperPosition);
      }

      // Add intermediate history coordinates
      historyCoords.forEach(coords => {
        const isDuplicateStart = shipperPosition && 
                                 shipperPosition[0] === coords[0] && 
                                 shipperPosition[1] === coords[1];
        if (!isDuplicateStart) {
          path.push(coords);
        }
      });

      // Append current position to the path
      if (position) {
        const alreadyAppended = path.length > 0 && 
                                path[path.length - 1][0] === position[0] && 
                                path[path.length - 1][1] === position[1];
        if (!alreadyAppended) {
          path.push(position);
        }
      }

      // Append consigneePosition to the path
      if (consigneePosition) {
        const alreadyAppended = path.length > 0 && 
                                path[path.length - 1][0] === consigneePosition[0] && 
                                path[path.length - 1][1] === consigneePosition[1];
        if (!alreadyAppended) {
          path.push(consigneePosition);
        }
      }

      setTrackingData({
        klReference: shipment.kl_reference || "—",
        pickupNumber: shipment.pickup_number || "N/A",
        status: shipment.status.current || "Unknown",
        notes: shipment.status.notes || null,
        origin: shipment.shipper_name || "—",
        destination: shipment.consignee_name || "—",
        eta,
        currentCity: shipment.location?.city || null,
        history,
        pending,
        position,
        path,
        shipperPosition,
        consigneePosition
      });
    } catch (err) {
      setError(err.message || "Could not connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch when initial chain code is provided (from URL)
  useEffect(() => {
    if (initialChainCode) {
      fetchTracking(initialChainCode);
    }
  }, [initialChainCode, fetchTracking]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    fetchTracking(chainCode);
  };

  return (
    <div className={styles.layout}>
      {/* Left Column — Search + Results */}
      <aside className={styles.sidebar}>
        {/* Search */}
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <div className={styles.inputWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Enter Chain Code" 
              className={styles.input}
              value={chainCode}
              onChange={(e) => setChainCode(e.target.value)}
            />
          </div>
          <button className={styles.searchBtn} disabled={isLoading}>
            {isLoading ? "..." : "Track"}
          </button>
        </form>

        {/* Results / Empty State */}
        <AnimatePresence mode="wait">
          {trackingData ? (
            <motion.div 
              key="results"
              className={styles.results}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Status Header */}
              <div className={styles.statusHeader}>
                <span className={styles.statusBadge}>{trackingData.status}</span>
                <p className={styles.trackingId}>{trackingData.klReference}</p>
                {trackingData.pickupNumber !== "N/A" && (
                  <p className={styles.trackingId}>Pickup: {trackingData.pickupNumber}</p>
                )}
              </div>

              {trackingData.pending ? (
                <div className={styles.pendingState}>
                  <Clock size={32} />
                  <p className={styles.pendingTitle}>Shipment Registered</p>
                  <p className={styles.pendingText}>
                    There are no records added to this reference yet. Shipment details will appear here once processing begins. Please try again later.
                  </p>
                  {trackingData.notes && (
                    <div className={styles.routeInfo}>
                      <p className={styles.emptyText}>📝 {trackingData.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Route Info */}
                  <div className={styles.routeInfo}>
                    <div className={styles.routePoint}>
                      <div className={styles.routeDotOrigin} />
                      <div>
                        <span className={styles.routeLabel}>Shipper</span>
                        <p className={styles.routeValue}>{trackingData.origin}</p>
                      </div>
                    </div>
                    <div className={styles.routeLine} />
                    <div className={styles.routePoint}>
                      <div className={styles.routeDotDest} />
                      <div>
                        <span className={styles.routeLabel}>Consignee</span>
                        <p className={styles.routeValue}>{trackingData.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* ETA & Location */}
                  <div className={styles.routeInfo}>
                    <div className={styles.routePoint}>
                      <div>
                        <span className={styles.routeLabel}>ETA Delivery</span>
                        <p className={styles.routeValue}>{trackingData.eta}</p>
                      </div>
                    </div>
                    {trackingData.currentCity && (
                      <>
                        <div className={styles.routeLine} />
                        <div className={styles.routePoint}>
                          <div>
                            <span className={styles.routeLabel}>Current Location</span>
                            <p className={styles.routeValue}>{trackingData.currentCity}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Notes */}
                  {trackingData.notes && (
                    <div className={styles.routeInfo}>
                      <p className={styles.emptyText}>📝 {trackingData.notes}</p>
                    </div>
                  )}

                  {/* Timeline */}
                  {trackingData.history.length > 0 && (
                    <div className={styles.timeline}>
                      <h3 className={styles.timelineTitle}>Tracking History</h3>
                      {trackingData.history.map((event, index) => (
                        <div className={styles.timelineItem} key={index}>
                          <div className={`${styles.dot} ${index === 0 ? styles.dotActive : ''}`} />
                          <div className={styles.timeInfo}>
                            <span className={styles.timeDate}>{event.date} — {event.time}</span>
                            <h4 className={styles.timeLocation}>{event.location}</h4>
                            <p className={styles.timeStatus}>{event.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              className={styles.emptyState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Info size={18} />
              <div>
                <p className={styles.emptyTitle}>How to use tracking?</p>
                <p className={styles.emptyText}>
                  Enter your Chain Code to see shipment information: current status, location, and delivery details.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p className={styles.errorMsg}>{error}</p>
        )}
      </aside>

      {/* Right Column — Map (always visible) */}
      <div className={styles.mapArea}>
        <TrackingMap 
          position={trackingData?.position || null} 
          path={trackingData?.path || []}
          shipperPosition={trackingData?.shipperPosition || null}
          consigneePosition={trackingData?.consigneePosition || null}
        />
      </div>
    </div>
  );
}
