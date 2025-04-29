import { MapBoxType } from "@/types";

const transformCoffeeData = (result: MapBoxType) => {
  return {
    name: result.properties?.name,
    id: result.properties?.mapbox_id,
    address: result.properties?.full_address,
    distance: result.properties?.distance,
    imgUrl: `https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80`,
  };
};

export const fetchCoffeeStores = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${process.env.MAPBOX_STATIC_ID}?session_token=${process.env.MAPBOX_SESSION_TOKEN}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();

    return data.features.map((result: MapBoxType) =>
      transformCoffeeData(result)
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
    
        const transformedData = data.features.map((result: MapBoxType) =>
          transformCoffeeData(result)
        );

        return transformedData.length > 0 ? transformedData[0] : {};
      } catch (error) {
        console.error("Error fetching coffee stores:", error);
      }
};