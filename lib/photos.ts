import { UnsplashQueryResult } from "@/types";

export const fetchCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query="coffee shop"&client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=1&per_page=6`
    );
    const data = await response.json();
    return data?.results?.map(
      (result: UnsplashQueryResult) => result.urls["small"]
    );
  } catch (error) {
    console.error("Error fetching coffee store photos:", error);
  }
};
