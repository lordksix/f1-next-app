import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
  const { id, title, date } = post
  const formattedDate = getFormattedDate(date)

  return (
    <li className="mt-4 font-semibold md:text-lg">
      <Link className="hover:underline hover:text-black/70 dark:hover:text-white" href={`/posts/${id}`}>{title}</Link>
      <br />
      <p className="mt-1 text-sm">{formattedDate}</p>
    </li>
  )
}