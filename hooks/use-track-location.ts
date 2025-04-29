"use client";

import { PositionType } from "@/types";
import React from "react";

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = React.useState(false);
  const [longLatCoords, setLongLatCoords] = React.useState<PositionType | null>(null);
  const [locationErrorMsg, setLocationErrorMsg] = React.useState("");

  function success(position: { coords: PositionType }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLatCoords(position.coords);

    setIsFindingLocation(false);
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    console.error("Unable to retrieve your location");
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false);
  }
  
  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      setIsFindingLocation(true);
      setLocationErrorMsg("");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    locationErrorMsg,
    longLatCoords,
    isFindingLocation,
    handleTrackLocation,
  };
};

export default useTrackLocation;
