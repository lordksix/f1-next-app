import { notFound } from "next/navigation"
import Link from "next/link"
import { getRaceResultF1 } from "@/lib/getF1data"
import getFormattedDate from "@/lib/getFormattedDate"
import { nanoid } from "@reduxjs/toolkit"
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
  console.log(`${yearid}/${raceid}`)

  const raceGP = await getRaceResultF1(`${yearid}/${raceid}`) //deduped!

  if(!raceGP || raceGP.length === 0) {
      return {
          title: 'Race Not Found',
          description: `Race ${raceid} of ${yearid} does not exist or have not been run yet`,
      }
  }
  return {
      title: `${raceGP[0].season} ${raceGP[0].raceName} Results`,
      description: `Race ${raceid} of ${yearid} does not exist or have not been run yet`,
  }
}

export default async function Result({ params: { yearid, raceid } }: Props) {
  console.log(`${yearid}/${raceid}`)
  const raceGPArr = await getRaceResultF1(`${yearid}/${raceid}`) //deduped!

  if(!raceGPArr || raceGPArr.length === 0) notFound()

  const raceGP = raceGPArr[0];

  const raceDate = getFormattedDate(`${raceGP.date} ${raceGP.time}`);
  console.log(raceGP)
  const externalLink = raceGP.url;
  const resultList = raceGP.Results.map((element) => (
    <li key={nanoid()} className="flex items-center gap-4">
      <div>{`${element.position}.`}</div>
      <div>
        <p>{`${element.Driver.givenName} ${element.Driver.familyName} Points: ${element.points}`}</p>
        <p>&#32;&#32;&#32;{`Total time: ${element?.Time?.time || 'No time'} Fastest time: ${element.FastestLap.Time.time}`}</p>
      </div>
    </li>
  ));

  return (
    <main>
      <h2 className="mt-4 mb-0 text-3xl">{`${raceGP.season} ${raceGP.raceName} Results`}</h2>
      <p className="mt-0 text-sm">
        Date of Race: 
        {raceDate}
      </p>
      <p className="mt-0 text-sm">
        {`Circuit: ${raceGP.Circuit.circuitName}`}
      </p>
      <p className="mt-0 text-sm">
        {`Location: ${raceGP.Circuit.Location.locality}, ${raceGP.Circuit.Location.country}`}
      </p>
      <div>
        <h3>Results</h3>
        <ul>
          {resultList}
        </ul>
      </div>
      <p className="mb-10">
          <Link href={externalLink} className="hover:text-orange-500">More Details</Link>
      </p>
      <p className="mb-10">
          <Link href="/" className="hover:text-blue-500">← Back to home</Link>
      </p>
    </main>
  )
}