import Link from "next/link"
import { Input } from "./ui/input"
import { Search } from "./Search"
import { Button } from "./ui/button"

export default function NavBar() {
    return (
        <div className="flex justify-between border-b p-2">
            <Link href="/" >
                <Button>Home</Button>
            </Link>
            <Search className="w-1/2" />
            <Link href="/ws">
                <Button>WS</Button>
            </Link>
        </div>
    )
}
