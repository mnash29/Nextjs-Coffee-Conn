"use client";

import React, { useEffect } from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/use-track-location";
import { CoffeeStoreType } from "@/types";
import Card from "./card.server";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

export default function NearbyCoffeeStores() {
  const [coffeeStores, setCoffeeStores] = React.useState<CoffeeStoreType[]>([]);

  const {
    handleTrackLocation,
    isFindingLocation,
    longLatCoords,
    locationErrorMsg,
  } = useTrackLocation();

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function coffeeStoresByLocation() {
      if (longLatCoords) {
        const response = await fetchCoffeeStores(longLatCoords)        
        setCoffeeStores(response);
      }
    }
    
    coffeeStoresByLocation();
  }, [longLatCoords]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={
          isFindingLocation
            ? "Searching nearby stores..."
            : "View stores nearby"
        }
      />
      {longLatCoords
        ? `Location: ${JSON.stringify(longLatCoords)}`
        : locationErrorMsg}
      <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Stores near me
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
        {coffeeStores.map((coffeeStore: CoffeeStoreType) => (
          <Card
            name={coffeeStore.name}
            imgUrl={coffeeStore.imgUrl}
            key={coffeeStore.id}
            href={`/coffee-store/${coffeeStore.id}`}
          />
        ))}
      </div>
    </div>
  );
}
