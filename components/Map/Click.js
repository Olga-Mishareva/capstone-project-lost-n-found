const { useMapEvents } = require("react-leaflet");

export default function Click({ onPosition, setIsClicked }) {
  const map = useMapEvents({
    click: (e) => {
      onPosition(e.latlng);
      setIsClicked(true);
    },
  });
  return null;
}
