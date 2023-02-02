const { Marker, Popup, useMapEvents } = require("react-leaflet");
import { useEffect, useState } from "react";

export default function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound: (event) => {
      setPosition(event.latlng);
      map.flyTo(event.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return (
    position && (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  );
}
