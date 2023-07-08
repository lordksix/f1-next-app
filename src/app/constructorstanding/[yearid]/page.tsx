import { notFound } from "next/navigation"
import Link from "next/link"
import { getConstructorStandingF1 } from "@/lib/getF1data"
import { nanoid } from "@reduxjs/toolkit"
import { getRacesF1StaticParams } from "@/lib/getF1Meta"
import FlagComp from "@/components/shared/flag"

export const revalidate = 86400

type Props = {
    params: {
      yearid: string,
    }
}

export async function generateStaticParams() {
  const racesF1 = await getRacesF1StaticParams();

  if(!racesF1) return []
  return racesF1;
}

export async function generateMetadata({ params: { yearid } }: Props) {
  const standing = await getConstructorStandingF1(yearid) //deduped!

  if(!standing || standing.length === 0) {
      return {
          title: 'No Season found Not Found',
          description: `There is season on ${yearid}`,
      }
  }
  return {
      title: `${yearid} Results`,
      description: `${yearid} Driver Standing`,
  }
}

export default async function DriverStanding({ params: { yearid } }: Props) {
  const standing = await getConstructorStandingF1(yearid) //deduped!

  if(!standing || standing.length === 0) notFound()

  const standingResult = standing[0];

  const resultList = standingResult.ConstructorStandings.map((element) => (
    <li key={nanoid()} className="flex items-center gap-4 text-sm md:text-base">
      <div>{`${element.position}.`}</div>
      <div>
      < div className='flex items-center gap-2 sm:flex-wrap'>
          <p>{element.Constructor.name}</p>
          <FlagComp nationality={element.Constructor.nationality}/>
        </div>
        <p>{`Total points: ${element?.points ?? '0'}`}</p>
      </div>
    </li>
  ));

  return (
    <section>
      <h2 className="mt-4 mb-0 text-3xl">{`${standingResult.season} Driver Standing`}</h2>
      <p className="mt-0 text-sm">
      {`Current round: ${standingResult.round}`}
      </p>
      <div>
        <h3>Results</h3>
        <ul className="flex flex-col gap-4">
          {resultList}
        </ul>
      </div>
      <p className="mb-10">
          <Link href="/" className="hover:text-blue-500">← Back to home</Link>
      </p>
    </section>
  )
}