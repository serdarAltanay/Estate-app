import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Custom hook to add a clickable Marker on the map
const LocationPicker = ({ setLocation }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      parseFloat(lat)
      parseFloat(lng)
      setLocation({lat, lng });  // Update the location when clicked
      map.setView([lat, lng], map.getZoom());  // Center the map on the clicked position
    },
  });
  return null;
};

const LeafletMap = ({ setLocation }) => {
  const [location, setLocalLocation] = useState(null);

  // Function to update location state
  const updateLocation = (newLocation) => {
    console.log('New Location:', newLocation);  // Debugging log to check values
    setLocalLocation(newLocation);  // Update local state
    setLocation(newLocation);  // Pass the location to the parent component
  };

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker setLocation={updateLocation} />  {/* Pass the update function to LocationPicker */}
        {location && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              Selected Location: {location.lat}, {location.lng}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
