import { ItemCard } from "@/components/ItemCard";

export default function Home() {

    return (
        <main className="flex flex-col gap-4 p-2">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
        </main>
    )
}