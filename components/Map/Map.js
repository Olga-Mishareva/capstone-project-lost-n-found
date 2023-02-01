import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styled from "styled-components";

import LocationMarker from "./LocationMarker";

export default function Map() {
  return (
    <StyledMapContainer
      center={[13.388517, 52.5202038]}
      zoom={12}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=LNcdyb0REf1mYIYz1asv"
      />
      <LocationMarker />
    </StyledMapContainer>
  );
}

const StyledMapContainer = styled(MapContainer)`
  width: calc(100vw - 4rem);
  height: 50%;
  min-width: 18.5rem;
  min-height: 17rem;
  margin: 0 auto;
  border-radius: 1rem;
`;
