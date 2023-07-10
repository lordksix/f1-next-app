import ListItem from '@/components/home/ListItem';
import { getPostsMeta } from '@/lib/posts';

export async function generateMetadata() {

  return {
      title: 'Lordksix F1Mania  and Formula 1 news',
      description: 'Latest news about Formula 1 and F1mania'
  }
}

export default async function Posts() {
  const posts = await getPostsMeta()

  if (!posts) {
      return <p className="mt-10 text-center">Sorry, no posts available.</p>
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-center md:text-xl xl:text-3xl">News</h2>
      <ul className="w-full p-0 list-none">
        {posts.map(post => (
            <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  )
}