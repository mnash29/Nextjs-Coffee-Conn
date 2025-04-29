import { fetchCoffeeStores } from "@/lib/coffee-stores";
import Banner from "../components/banner.client";
import Card from "@/components/card.server";
import { CoffeeStoreType } from "@/types";


const getCoffeeStores = async () => {
  return await fetchCoffeeStores();
}

export default async function Home() {
  const coffeeStoreId = "dark-horse-coffee";
  const coffeeStores = await getCoffeeStores(); 
 
  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <Banner />
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