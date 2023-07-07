import Link from "next/link"

export default function NotFound() {
    return (
        <div className="text-center">
            <p className="mt-10">Sorry, such a season does not exist.</p>
            <Link href="/">Back to Home</Link>
        </div>
    )
}