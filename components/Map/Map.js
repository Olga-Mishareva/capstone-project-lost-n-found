import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styled from "styled-components";
import { useRouter } from "next/router";

import LocationMarker from "./LocationMarker";
import MyPopup from "../MyPopup";
import ConfirmPopup from "../ConfirmPopup";
import Click from "./Click";
import { lostIcon, foundIcon, finishedIcon, locationIcon } from "@/lib/icons";
import { useState } from "react";

export default function Map({ items, clickPosition, onPosition }) {
  const router = useRouter();

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  function handleConfirm() {
    setIsConfirmPopupOpen(false);
    router.push("/create");
  }

  function handleClose() {
    setIsConfirmPopupOpen(false);
  }

  console.log(isConfirmPopupOpen);
  return (
    <StyledMapContainer
      center={[52.518623, 13.388517]}
      zoom={12}
      scrollWheelZoom
    >
      <Click
        onPosition={onPosition}
        setIsConfirmPopupOpen={setIsConfirmPopupOpen}
      />

      {isConfirmPopupOpen && (
        <Popup position={clickPosition} closeButton={false}>
          <ConfirmPopup onConfirm={handleConfirm} onClose={handleClose} />
        </Popup>
      )}

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
              <MyPopup item={item} />
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
