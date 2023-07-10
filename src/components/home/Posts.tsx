import { getPostsMeta } from "@/lib/posts"
import ListItem from "./ListItem"
import Link from "next/link"

export default async function Posts() {
  const posts = await getPostsMeta()

  if (!posts) {
      return <p className="mt-10 text-center">Sorry, no posts available.</p>
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-center md:text-xl xl:text-3xl">News</h2>
      <ul className="w-full p-0 list-none">
        {posts.slice(0, 2).map(post => (
            <ListItem key={post.id} post={post} />
        ))}
      </ul>
      <Link href={'/posts'} className="w-full mt-4 font-bold text-right hover:text-red-600" >More news</Link>
    </section>
  )
}