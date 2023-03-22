import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 0,
  lng: 0,
};

const coordinatesData = [
  {
    id: 1,
    position: { lat: 37.7749, lng: -122.4194 },
    content: "Testing the content",
  },
  { id: 2, position: { lat: 40.7128, lng: -74.006 }, content: "New York" },
  { id: 3, position: { lat: 51.5074, lng: -0.1278 }, content: "London" },
  { id: 4, position: { lat: 43.642567, lng: -79.387054 }, content: "Toronto" },
  { id: 5, position: { lat: -33.4337, lng: -70.651 }, content: "Santiago" },
];

function MapView() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  const mapWithLoadScript = (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
        {coordinatesData.map((marker) => (
          <MarkerF
            key={marker.id}
            position={marker.position}
            onClick={() => handleMarkerClick(marker)}
          >
            {selectedMarker === marker ? (
              <InfoWindowF onCloseClick={handleCloseClick}>
                <div>{marker.content}</div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );

  const mapWithoutLoadScript = (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
      {coordinatesData.map((marker) => (
        <MarkerF
          key={marker.id}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
        >
          {selectedMarker === marker ? (
            <InfoWindowF onCloseClick={handleCloseClick}>
              <div>{marker.content}</div>
            </InfoWindowF>
          ) : null}
        </MarkerF>
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