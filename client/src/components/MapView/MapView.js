import React from 'react';
import { GoogleMap, LoadScript, Marker, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '60vh',
  margin: 'auto'
};

const center = {
  lat: 0,
  lng: 0,
};

const coordinatesData = [
  { id: 1, position: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, position: { lat: 40.7128, lng: -74.0060 } },
  { id: 3, position: { lat: 51.5074, lng: -0.1278 } },
  { id: 4, position: { lat: 43.642567, lng: -79.387054 } }
]

function MapView() {
  const mapWithLoadScript = (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
        {coordinatesData.map((marker) => (
          <MarkerF key={marker.id} position={marker.position} />
        ))}
      </GoogleMap>
    </LoadScript>
  )

  const mapWithoutLoadScript = (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
      {coordinatesData.map((marker) => (
        <MarkerF key={marker.id} position={marker.position} />
      ))}
    </GoogleMap>
  )

  return (
    <>
      {window.google ? mapWithoutLoadScript : mapWithLoadScript}
    </>
  );
}

export default MapView;