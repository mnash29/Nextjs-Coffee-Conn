export type CoffeeStoreType = {
  name: string;
  id: string;
  address: string;
  distance: number;
  imgUrl: string;
};

export type MapBoxSuggestType = {
  name: string;
  mapbox_id: string;
  full_address: string;
};

export type MapBoxRetrieveType = {
  properties: {
    name: string;
    mapbox_id: string;
    full_address: string;
  };
};

export type Params = Promise<{ id: string }>;

export type SearchParams = Promise<{ id: string; limit: string }>;

export type UnsplashQueryResult = {
  urls: {
    small: string;
  };
};

export type PositionType = { latitude: number; longitude: number };
