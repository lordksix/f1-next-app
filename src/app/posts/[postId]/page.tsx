import getFormattedDate from '@/lib/getFormattedDate'
import { getPostsMeta, getPostByName } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'
import { nanoid } from '@reduxjs/toolkit'

export const revalidate = 86400

type Props = {
    params: {
        postId: string
    }
}

export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}

export async function generateMetadata({ params: { postId } }: Props) {

    const post = await getPostByName(`${postId}.mdx`) //deduped!

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.meta.title,
    }
}

export default async function Post({ params: { postId } }: Props) {

    const post = await getPostByName(`${postId}.mdx`) //deduped!

    if (!post) notFound()

    const { meta, content } = post

    const pubDate = getFormattedDate(meta.date)

    const tags = meta.tags.map((tag) => (
        <Link key={nanoid()} href={`/tags/${tag}`} className="px-2 py-2 border border-gray-800 rounded-lg dark:border-gray-200 hover:text-white/90 dark:hover:text-black hover:bg-black dark:hover:bg-white">{tag}</Link>
    ))

    return (
        <>
            <h2 className="mt-0 mb-4 text-3xl">{meta.title}</h2>
            <p className="mb-2 text-sm">
                {pubDate}
            </p>
            <article className="mb-2">
                {content}
            </article>
            <section>
                <h3 className="mb-2">Related:</h3>
                <div className="flex flex-row gap-4">
                    {tags}
                </div>
            </section>
        </>
    )
}