import { getPostsMeta } from "@/lib/posts"
import ListItem from "./ListItem"
import Link from "next/link"
import { f1tffBlack } from "@/app/fonts"

export default async function Posts() {
  const posts = await getPostsMeta()

  if (!posts) {
      return <p className="mt-10 text-center">Sorry, no posts available.</p>
  }

  return (
    <section className="max-w-2xl px-2 py-4 mx-auto bg-red-600 rounded-3xl">
      <h2 className={`${f1tffBlack.variable} text-lg font-bold text-center md:text-xl xl:text-3xl`}>News</h2>
      <ul className="w-full p-0 list-none">
        {posts.slice(0, 2).map(post => (
            <ListItem key={post.id} post={post} />
        ))}
      </ul>
      <Link href={'/posts'} className="w-full mt-4 font-bold hover:text-black" >More news</Link>
    </section>
  )
}