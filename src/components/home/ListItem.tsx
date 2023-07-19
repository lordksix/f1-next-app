import Link from "next/link"
import { f1tffBlack } from "@/app/fonts"
import { timeAgo } from "@/lib/utils"

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
  const { id, title, date } = post
  const formattedDate = timeAgo(new Date(date));

  return (
    <li className={`${f1tffBlack.variable} mt-4`}>
      <Link className="hover:underline text-white/90 " href={`/posts/${id}`}>{title}</Link>
      <br />
      <p className="mt-1 text-sm text-white/90 text-end">{`Published ${formattedDate}`}</p>
    </li>
  )
}