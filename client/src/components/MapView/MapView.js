import { Box, Typography, Card, CardContent, Snackbar } from "@mui/material";
import { Alert } from "@mui/lab";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchUserData, fetchPostsData } from "../../dataFetcher";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import MapIcon from "@mui/icons-material/Map";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getUserByUid } from "../../dataFetcher";
const containerStyle = {
  width: "97.6%",
  height: "95.4%",
  borderRadius: 10,
};
const center = {
  lat: 43.7,
  lng: -79.42,
};

const colors = {
  white: "#FFFFFF",
  green1: "#2C7C50",
  green2: "#2B764A",
  lightGreen1: "#EDF1F0",
  lightGreen2: "#DAE1D8",
};

function MapView() {
  let postsData = [];
  const [userLocation, setUserLocation] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          setLocationFetched(true);
        },
        () => {
          setUserLocation(center);
          setShowSnackbar(true);
          setLocationFetched(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
      return () => {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    } else {
      setUserLocation(center);
      setShowSnackbar(true);
      setLocationFetched(true);
    }
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  const [coordinatesData, setCoordinatesData] = useState([]);

  useEffect(() => {
    const clearWatch = getUserLocation();
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
          let user;
          getUserByUid(data.fields.uid.stringValue).then((authorData) => {
            user = authorData.userName;

            const latitude = Number(data.fields.latitude?.doubleValue);
            const longitude = Number(data.fields.longitude?.doubleValue);

            const poster = usersData.find(
              (user) => user.userId === data.fields.uid.stringValue
            );
            console.log("user is 123", user);
            if (!isNaN(latitude) && !isNaN(longitude)) {
              temp.push({
                id: index + 1,
                position: {
                  lat: latitude,
                  lng: longitude,
                },
                content: data.fields.title.stringValue,
                author: user ? user : "Unknown Poster",
                image: data.fields.image.stringValue,
              });
            }
          });
          setCoordinatesData(temp);
        });
      });

    return () => {
      if (clearWatch) {
        clearWatch();
      }
    };
  }, []);

  const mapWithLoadScript = (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 43.7, lng: -79.42 }}
        zoom={userLocation ? 10 : 1}
      >
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
                  <p>{marker.content}</p>
                  <p>@{marker.author}</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );

  const mapWithoutLoadScript = (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || { lat: 43.7, lng: -79.42 }}
      zoom={userLocation ? 10 : 4}
    >
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
                <p>{marker.content}</p>
                <p>@{marker.author}</p>
              </div>
            </InfoWindowF>
          ) : null}
        </MarkerF>
      ))}
    </GoogleMap>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        marginLeft: 2,
        marginRight: 0,
        marginBottom: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Snackbar
        open={showSnackbar}
        autoHideDuration={8000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          icon={<LocationOnIcon sx={{ color: colors.green1 }} />}
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{
            width: "100%",
            backgroundColor: colors.white,
            color: colors.green1,
            borderRadius: "10px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Hey there! To see plants near you, please activate your location.
          </Typography>
        </Alert>
      </Snackbar>
      <Card
        sx={{
          marginBottom: 1,
          width: "10%",
          mt: 1,
          borderRadius: 10,
          minWidth: "100px",
          top: 0,
          left: 0,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 0,
            }}
          >
            <MapIcon sx={{ marginRight: 1, color: colors.green1 }} />
            <Typography
              sx={{
                fontSize: 22,
                fontFamily: "'Nunito', sans-serif;",
                fontWeight: 700,
                color: colors.green1,
              }}
            >
              Map
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ width: "98%", height: "100%", mr: 2, borderRadius: 5 }}>
        <CardContent sx={{ width: "100%", height: "100%" }}>
          {window.google ? mapWithoutLoadScript : mapWithLoadScript}
        </CardContent>
      </Card>
    </Box>
  );
}

export default MapView;
