import { MapBoxType } from "@/types";

const transformCoffeeData = (result: MapBoxType, idx: number, photos: []) => {
  return {
    name: result.properties?.name,
    id: result.properties?.mapbox_id,
    address: result.properties?.full_address,
    distance: result.properties?.distance,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

export const fetchCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query="coffee shop"&client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=1&per_page=6`
    );
    const data = await response.json();
    const results = data?.results || [];
    return results?.map((result: { urls: any }) => result.urls['small']);
  } catch (error) {
    console.error("Error fetching coffee store photos:", error);
  }
};

export const fetchCoffeeStores = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${process.env.MAPBOX_STATIC_ID}?session_token=${process.env.MAPBOX_SESSION_TOKEN}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    const photos = await fetchCoffeeStorePhotos();
    
    return data.features.map((result: MapBoxType, idx: number) =>
      transformCoffeeData(result, idx, photos)
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

    const transformedData = data.features.map((result: MapBoxType, idx: number) =>
      transformCoffeeData(result, idx, photos)
    );

    return transformedData.length > 0 ? transformedData[0] : {};
  } catch (error) {
    console.error("Error fetching coffee stores:", error);
  }
};
