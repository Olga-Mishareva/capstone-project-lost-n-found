const { useMapEvents } = require("react-leaflet");

export default function Click({ onPosition, setIsConfirmPopupOpen }) {
  const map = useMapEvents({
    click: (e) => {
      onPosition(e.latlng);
      setIsConfirmPopupOpen(true);
    },
  });
  return null;
}
