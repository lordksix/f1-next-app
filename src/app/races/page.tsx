import { notFound } from "next/navigation"
import Link from "next/link"
import { getRaceF1 } from "@/lib/getF1data"
import getFormattedDate from "@/lib/getFormattedDate"
import { getRacesF1StaticParams } from "@/lib/getF1Meta"

export const revalidate = 86400

type Props = {
    params: {
      yearid: string,
      raceid: string,
    }
}

export async function generateStaticParams() {
  const racesF1 = await getRacesF1StaticParams();

  if(!racesF1) return []
  return racesF1;
}

export async function generateMetadata({ params: { yearid, raceid } }: Props) {
  const raceGP = await getRaceF1(`${yearid}/${raceid}`) //deduped!

  if(!raceGP || raceGP.length === 0) {
      return {
          title: 'Race Programming Not Found',
          description: `Race ${raceid} of ${yearid} does not exist`,
      }
  }
  return {
      title: `${raceGP[0].season} ${raceGP[0].raceName} Schedule`,
      description: `Race ${raceid} of ${yearid} Schedule`,
  }
}

export default async function Result({ params: { yearid, raceid } }: Props) {


  return (
    <section>
      Pages
    </section>
  )
}