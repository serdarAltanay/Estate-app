import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import L from "leaflet";
import { Link } from "react-router-dom";

const customIcon = new L.Icon({
  iconUrl: "/icons/pın.png",
  iconSize: [64, 64],
  iconAnchor: [35, 45],
  popupAnchor: [0, 0],
});


function Pin({ item }) {
  return (
    <Marker 
      position={[item.latitude, item.longitude]}
      icon={customIcon}
    >
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;