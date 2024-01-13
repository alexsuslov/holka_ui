import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import img from '../assets/av.jpg'

export function ItemCard() {
    return (
        <Card>
            <CardHeader className="flex items-center">
                <Image src={img} width={200} height={200} alt="item_img" className="max-w-[200px] max-h-[200px] w-auto" />
            </CardHeader>
            <CardContent>
                <CardTitle>Товар</CardTitle>
                <p>150 руб</p>
                <p>Санкт-Петербург, Россия</p>
            </CardContent>
            <CardFooter>
                <p>Created On {new Date().toLocaleDateString()}</p>
            </CardFooter>
        </Card>
    )
}
