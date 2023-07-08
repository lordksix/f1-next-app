import Link from 'next/link'

export default function NotFoundGeneric() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-6">
            <p>Sorry, the requested page does not exist.</p>
            <Link href="/" className="hover:text-gray-400">Back to Home 🏠</Link>
        </div>
    );
};