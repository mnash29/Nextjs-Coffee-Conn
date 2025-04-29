export type CoffeeStoreType = {
  name: string;
  id: string;
  address: string;
  distance: number;
  imgUrl: string;
};

export type MapBoxType = {
  properties: {
    name: string;
    mapbox_id: string;
    full_address: string;
    distance: number;
  };
};
