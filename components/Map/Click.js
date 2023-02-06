const { useMapEvents } = require("react-leaflet");

export default function Click({ onPosition }) {
  const map = useMapEvents({
    click: (e) => {
      // console.log(e.latlng);
      onPosition(e.latlng);
    },
  });
  return null;
}
