const { useMapEvents } = require("react-leaflet");
import { Popup } from "react-leaflet";
import { useRouter } from "next/router";
import { useState } from "react";

import ConfirmPopup from "../ConfirmPopup";

export default function Click({ onPosition }) {
  const router = useRouter();
  const [position, setPosition] = useState(null);

  function handleConfirm() {
    setPosition(null);
    router.push("/create");
  }

  function handleClose() {
    setPosition(null);
  }

  const map = useMapEvents({
    click: (event) => {
      onPosition(event.latlng);
      setPosition(event.latlng);
    },
  });

  return (
    position && (
      <Popup position={position} closeButton={false}>
        <ConfirmPopup onConfirm={handleConfirm} onClose={handleClose} />
      </Popup>
    )
  );
}
