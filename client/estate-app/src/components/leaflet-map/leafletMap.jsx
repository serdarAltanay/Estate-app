import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Leaflet icon
const customIcon = L.icon({
  iconUrl: "/icons/pın.png", // Path to the custom marker image
  iconSize: [40, 40],  // Size of the icon [width, height]
  iconAnchor: [16, 32], // Anchor point of the icon (center-bottom)
  popupAnchor: [0, -32], // Point from which the popup opens (relative to iconAnchor)
});

// Custom hook to add a clickable Marker on the map
const LocationPicker = ({ setLocation }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng }); // Update the location when clicked
      map.setView([lat, lng], map.getZoom()); // Center the map on the clicked position
    },
  });
  return null;
};

const LeafletMap = ({ setLocation }) => {
  const [location, setLocalLocation] = useState(null);

  // Function to update location state
  const updateLocation = (newLocation) => {
    setLocalLocation(newLocation); // Update local state
    setLocation(newLocation); // Pass the location to the parent component
  };

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker setLocation={updateLocation} />
        {location && (
          <Marker position={[location.lat, location.lng]} icon={customIcon}>
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
