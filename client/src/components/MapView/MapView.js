import { Box, filledInputClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchUserData, fetchPostsData } from "../../dataFetcher";
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

function MapView() {
  let postsData = [];

  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  const [coordinatesData, setCoordinatesData] = useState([]);

  useEffect(() => {
    let usersData = [];
    fetchUserData().then((results) => {
      results.map((user) => {
        usersData.push(user);
      });
    });
    const temp = [];
    axios
      .get(
        "https://firestore.googleapis.com/v1/projects/final-project-lhl-a053a/databases/(default)/documents/posts"
      )
      .then((posts) => {
        posts.data.documents.map((data, index) => {
          const latitude = Number(data.fields.latitude?.doubleValue);
          const longitude = Number(data.fields.longitude?.doubleValue);

          const poster = usersData.find(
            (user) => user.userId === data.fields.uid.stringValue
          );
          if (!isNaN(latitude) && !isNaN(longitude)) {
            temp.push({
              id: index + 1,
              position: {
                lat: latitude,
                lng: longitude,
              },
              content: data.fields.title.stringValue,
              author: poster ? poster.userName : "Unknown Poster",
              image: data.fields.image.stringValue,
            });
          }
        });
        setCoordinatesData(temp);
      });
  }, []);
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
                <div>
                  <img src={marker.image} width={"170"} height={"150"}></img>
                  <p>Title: {marker.content}</p>
                  <p>Posted by: {marker.author}</p>
                </div>
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
              <div>
                <img src={marker.image} width={"170"} height={"150"}></img>
                <p>Title: {marker.content}</p>
                <p>Posted by: {marker.author}</p>
              </div>
            </InfoWindowF>
          ) : null}
        </MarkerF>
      ))}
    </GoogleMap>
  );

  return (
    <Box sx={{ width: "99%", height: "98%", marginLeft: "10px", marginRight: "10px", marginBottom: "40px" }}>
      {window.google ? mapWithoutLoadScript : mapWithLoadScript}
    </Box>
  );
}

export default MapView;
