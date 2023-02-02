import * as L from "leaflet";

const lostIcon = new L.Icon({
  iconUrl: "lost-icon.png",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-1, -40],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  shadowSize: [54, 36],
  shadowAnchor: [15, 36],
});

const foundIcon = new L.Icon({
  iconUrl: "found-icon.png",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-1, -40],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  shadowSize: [54, 36],
  shadowAnchor: [15, 36],
});

const finishedIcon = new L.Icon({
  iconUrl: "finished-icon.png",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-1, -40],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  shadowSize: [54, 36],
  shadowAnchor: [18, 36],
});

const locationIcon = new L.Icon({
  iconUrl: "location-icon.png",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-1, -40],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  shadowSize: [54, 36],
  shadowAnchor: [18, 36],
});

export { lostIcon, foundIcon, finishedIcon, locationIcon };
