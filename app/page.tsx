import Card from "@/components/card.server";
import { CoffeeStoreType } from "@/types";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";

const getCoffeeStores = async () => {
  return await fetchCoffeeStores({
    longitude: -117.813255,
    latitude: 33.888504,
  });
};

export default async function Home() {
  const coffeeStores = await getCoffeeStores();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Yorba Linda Stores
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
      </main>
    </div>
  );
}
