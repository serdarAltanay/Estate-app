import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin.jsx";



function Map({ items }) {

  console.log("Items passed to Map:", items);
  return (
    <MapContainer
      center={
        items.length !== 1
          ? [items[0].latitude, items[0].longitude]
          : [52.4797, -1.90269]
      }
      zoom={11}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;