import { notFound } from "next/navigation"
import Link from "next/link"
import { getRaceResultF1 } from "@/lib/getF1data"
import getFormattedDate from "@/lib/getFormattedDate"
import { nanoid } from "@reduxjs/toolkit"
import { getRacesF1StaticParams } from "@/lib/getF1Meta"
import FlagComp from "@/components/shared/flag"
import HeadingPages from "@/components/shared/headingPages"

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
  const currentSeason = raceGP.season;
  const seasonList = [];
  const seasonTitle = 'Season';
  for (let index = +currentSeason; index > 2015; index--) {
    seasonList.push({ title: index.toString(), href: `/races/${index}` })
  }
  const raceDate = getFormattedDate(`${raceGP.date} ${raceGP.time}`);
  const externalLink = raceGP.url;
  const resultList = raceGP.Results.map((element) => (
    <li key={nanoid()} className="flex items-center w-full gap-4 text-sm flex-gap sm:text-base sm:grid sm:grid-cols-3 sm:gap-x-2 sm:gap-y-4">
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
      </div>
      <div>
        <p>{`Total points: ${element?.points || '0'}`}</p>
        <p>{`Total time: ${element?.Time?.time ?? 'No time'}`}</p>
      </div>
    </li>
  ));

  return (
    <section className="flex flex-col justify-center w-full gap-4 item-center">
      <HeadingPages
        popTitle={seasonTitle}
        heading={`${raceGP.season} ${raceGP.raceName} Results`}
        popOverList={seasonList}
      />
      <p className="text-sm sm:text-base">
        Date of Race: 
        {raceDate}
      </p>
      <p className="mt-0 text-sm sm:text-base">
        {`Circuit: ${raceGP.Circuit.circuitName}`}
      </p>
      <p className="mt-0 text-sm sm:text-base">
        {`Location: ${raceGP.Circuit.Location.locality}, ${raceGP.Circuit.Location.country}`}
      </p>
      <div>
        <h3 className="mb-4">Results</h3>
        <ul className="flex flex-col items-center justify-center gap-4 px-8">
          {resultList}
        </ul>
      </div>
      <p>
          <Link href={externalLink} className="hover:text-orange-500">More Details</Link>
      </p>
      <p>
          <Link href="/" className="hover:text-blue-500">← Back to home</Link>
      </p>
    </section>
  )
}