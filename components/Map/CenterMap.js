import { useEffect } from "react";
import L from "leaflet";

export default function CenterMap({ event, markerRef }) {
  useEffect(() => {
    if (event && markerRef.current) {
      const marker = markerRef.current;
      const map = marker._map; // Accessing the map instance from the marker reference
      const { latitude, longitude } = event.location;

      if (map) {
        map.setView(L.latLng(latitude, longitude), map.getZoom(), {
          animate: true,
        });
      }
    }
  }, [event, markerRef]);
  return null;
}
