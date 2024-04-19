import { useState } from "react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function usePlaceSearch() {
  const [placeList, setPlaceList] = useState([]);
  const [placeLoading, setPlaceLoading] = useState(false);
  const [placeError, setPlaceError] = useState(null);

  function getPlaces(searchText) {
    setPlaceLoading(true);
    setPlaceError(null);

    const parameter = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
      countrycodes: "de",
      max_results: 5,
      dedupe: 1,
      layer: "address, poi, amenity",
    };

    const queryString = new URLSearchParams(parameter).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPlaceList(result);
        setPlaceLoading(false);
      })
      .catch((error) => {
        setPlaceError(error);
        setPlaceLoading(false);
      });
  }

  return { placeList, setPlaceList, placeLoading, placeError, getPlaces };
}
