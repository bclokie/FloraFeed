import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 0,
  lng: 0,
};

const coordinatesData = [
  { id: 1, position: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, position: { lat: 40.7128, lng: -74.006 } },
  { id: 3, position: { lat: 51.5074, lng: -0.1278 } },
  { id: 4, position: { lat: 43.642567, lng: -79.387054 } },
  { id: 5, position: { lat: -33.4337, lng: -70.651 } },
];

const mapStyles = [
  // Add custom map style JSON here
];

function MapView() {
  const mapWithLoadScript = (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        options={{ styles: mapStyles }}
      >
        {coordinatesData.map((marker) => (
          <Marker key={marker.id} position={marker.position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );

  const mapWithoutLoadScript = (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      options={{ styles: mapStyles }}
    >
      {coordinatesData.map((marker) => (
        <Marker key={marker.id} position={marker.position} />
      ))}
    </GoogleMap>
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {window.google ? mapWithoutLoadScript : mapWithLoadScript}
    </Box>
  );
}

export default MapView;
