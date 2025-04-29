import { MapBoxRetrieveType, MapBoxSuggestType, PositionType } from "@/types";
import { fetchCoffeeStorePhotos } from "./photos";

const transformSuggestCoffeeData = (
  result: MapBoxSuggestType,
  idx: number,
  photos: []
) => {
  return {
    name: result?.name,
    id: result?.mapbox_id,
    address: result?.full_address,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

const transformRetrieveCoffeeData = (
  result: MapBoxRetrieveType,
  idx: number,
  photos: []
) => {
  return {
    name: result?.properties?.name,
    id: result?.properties?.mapbox_id,
    address: result?.properties?.full_address,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

export const fetchCoffeeStores = async (
  coords: PositionType,
  limit: number = 6
) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=coffee%2520shop&limit=${limit}&types=poi&session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&proximity=${coords.longitude}%2C${coords.latitude}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    const photos = await fetchCoffeeStorePhotos(limit);

    return data.suggestions.map((result: MapBoxSuggestType, idx: number) =>
      transformSuggestCoffeeData(result, idx, photos)
    );
  } catch (error) {
    console.error("Error fetching coffee stores:", error);
  }
};

export const fetchCoffeeStoreById = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    const photos = await fetchCoffeeStorePhotos(1);

    const transformedData = data.features.map(
      (result: MapBoxRetrieveType) =>
        transformRetrieveCoffeeData(result, 0, photos)
    );

    return transformedData.length > 0 ? transformedData[0] : {};
  } catch (error) {
    console.error("Error fetching coffee stores:", error);
  }
};
