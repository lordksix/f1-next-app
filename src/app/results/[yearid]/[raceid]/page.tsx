import { notFound } from "next/navigation"
import Link from "next/link"
import { getRaceResultF1 } from "@/lib/getF1data"
import getFormattedDate from "@/lib/getFormattedDate"
import { nanoid } from "@reduxjs/toolkit"
import { getRacesF1StaticParams } from "@/lib/getF1Meta"
import FlagComp from "@/components/shared/flag"

export const revalidate = 86400

type Props = {
    params: {
      yearid: string,
      raceid: string,
    }
}

export async function generateStaticParams() {
  const racesF1 = await getRacesF1StaticParams();

  if(!racesF1) return [];
  return racesF1;
}

export async function generateMetadata({ params: { yearid, raceid } }: Props) {
  const raceGP = await getRaceResultF1(`${yearid}/${raceid}`) //deduped!

  if(!raceGP || raceGP.length === 0) {
      return {
          title: 'Race Result Not Found',
          description: `Race ${raceid} of ${yearid} does not exist or have not been run yet`,
      }
  }
  return {
      title: `${raceGP[0].season} ${raceGP[0].raceName} Results`,
      description: `Race ${raceid} of ${yearid} results`,
  }
}

export default async function Race({ params: { yearid, raceid } }: Props) {
  const raceGPArr = await getRaceResultF1(`${yearid}/${raceid}`) //deduped!

  if(!raceGPArr || raceGPArr.length === 0) notFound()

  const raceGP = raceGPArr[0];

  const raceDate = getFormattedDate(`${raceGP.date} ${raceGP.time}`);
  const externalLink = raceGP.url;
  const resultList = raceGP.Results.map((element) => (
    <li key={nanoid()} className="flex items-center gap-4 text-sm md:text-base">
      <p>{`${element.position}.`}</p>
      <div>
        <div className='flex items-center gap-2'>
          <p>{`${element.Driver.givenName} ${element.Driver.familyName}`}</p>
          <FlagComp nationality={element.Driver.nationality}/>
        </div>
        <div className='flex items-center gap-2'>
        <p>{element.Constructor.name}</p>
          <FlagComp nationality={element.Constructor.nationality}/>
        </div>
        <p>{`Total points: ${element?.points || '0'}`}</p>
      </div>
    </li>
  ));

  return (
    <section>
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
    </section>
  )
}