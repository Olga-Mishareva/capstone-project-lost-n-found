import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styled from "styled-components";
import Link from "next/link";

import LocationMarker from "./LocationMarker";
import { lostIcon, foundIcon, finishedIcon, locationIcon } from "@/lib/icons";

export default function Map({ items }) {
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

      {items.map((item) => {
        return (
          <Marker
            key={item.itemId}
            position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
            icon={
              item.inDiscuss
                ? finishedIcon
                : item.initiallyLost
                ? lostIcon
                : foundIcon
            }
          >
            <Popup>
              <h2>{item.title}</h2>
              <Link href={`/items/${item.itemId}`}>More details</Link>
            </Popup>
          </Marker>
        );
      })}
      <LocationMarker icon={locationIcon} />
    </StyledMapContainer>
  );
}

const StyledMapContainer = styled(MapContainer)`
  width: calc(100vw - 2rem);
  height: 100%;
  min-width: 18.5rem;
  min-height: 100%;
  margin: 0 auto;
  border-radius: 1rem;
`;
