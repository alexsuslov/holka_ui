import { ItemCard } from "@/components/ItemCard";

export default function Home() {

  return (
    <main className="grid lg:grid-cols-5 sm:grid-cols-2 gap-4 p-2">

      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />

      {/* <div className="w-full lg:w-1/2 shadow-lg rounded-xl p-8">
        <h1 className="mb-4">Добавление товара</h1>
        <ItemAddForm />
      </div> */}
    </main>
  )
}
