import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/">Search</Link>
                </li>
                <li>
                    <Link href="/">Favorites</Link>
                </li>
            </ul>
        </nav>
    )
}