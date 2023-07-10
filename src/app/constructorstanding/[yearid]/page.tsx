import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getConstructorStandingF1 } from '@/lib/getF1data';
import { nanoid } from '@reduxjs/toolkit';
import { getRacesF1StaticParams } from '@/lib/getF1Meta';
import FlagComp from '@/components/shared/flag';
import HeadingPages from '@/components/shared/headingPages';

export const revalidate = 86400;

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
    <li key={nanoid()} className="flex items-center w-full gap-6 text-sm md:text-base">
      <div>{`${+element.position < 10 ? '0' + element.position : element.position}.`}</div>
      <div className="flex flex-wrap items-center w-full h-full gap-2 sm:grid sm:grid-flow-col sm:auto-cols-max sm:gap-x-2">
          <Link 
            href={element.Constructor.url}
            className="hover:font-bold"
          >{element.Constructor.name}</Link>
          <FlagComp nationality={element.Constructor.nationality}/>
          <p>{`Total points: ${element?.points ?? '0'}`}</p>
      </div>
    </li>
  ));

  return (
    <section className="flex flex-col justify-center w-full gap-4 item-center">
      <HeadingPages
        heading={`${standingResult.season} Constructors Standing`}
      />
      <p className="mt-0 text-sm sm:text-base">
      {`Current round: ${standingResult.round}`}
      </p>
      <div>
        <h3 className="mb-4">Results</h3>
        <ul className="flex flex-col items-center justify-center gap-4 px-4">
          {resultList}
        </ul>
      </div>
      <p>
          <Link href="/" className="hover:text-blue-500">← Back to home</Link>
      </p>
  </section>
  )
}