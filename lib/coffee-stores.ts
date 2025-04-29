import {
  MapBoxRetrieveType,
  MapBoxSuggestType,
  UnplashQueryResult,
} from "@/types";

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

export const fetchCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query="coffee shop"&client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=1&per_page=6`
    );
    const data = await response.json();
    return data?.results?.map(
      (result: UnplashQueryResult) => result.urls["small"]
    );
  } catch (error) {
    console.error("Error fetching coffee store photos:", error);
  }
};

export const fetchCoffeeStores = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=coffee%2520shop&limit=6&types=poi&session_token=${process.env.MAPBOX_SESSION_TOKEN}&proximity=-117.813255%2C33.888504&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    const photos = await fetchCoffeeStorePhotos();

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
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${process.env.MAPBOX_SESSION_TOKEN}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    const photos = await fetchCoffeeStorePhotos();

    const transformedData = data.features.map(
      (result: MapBoxRetrieveType, idx: number) =>
        transformRetrieveCoffeeData(result, idx, photos)
    );

    return transformedData.length > 0 ? transformedData[0] : {};
  } catch (error) {
    console.error("Error fetching coffee stores:", error);
  }
};
