import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDriverStandingF1 } from '@/lib/getF1data';
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

  if(!racesF1) return [];
  return racesF1.map((race) => ({
    yearid: race.yearid
  }));
}

export async function generateMetadata({ params: { yearid } }: Props) {
  const standing = await getDriverStandingF1(yearid) //deduped!

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
  const standing = await getDriverStandingF1(yearid) //deduped!

  if(!standing || standing.length === 0) notFound()

  const standingResult = standing[0];
  const resultList = standingResult.DriverStandings.map((element) => (
    <li key={nanoid()} className="flex items-center w-full gap-6 text-sm lex md:text-base">
      <div>{`${+element.position < 10 ? '0' + element.position : element.position}.`}</div>
      <div className='flex flex-wrap items-center w-full gap-2 sm:grid sm:grid-cols-3 sm:gap-x-2'>
        <div className='flex flex-wrap items-center w-full gap-2 md:grid md:grid-cols-2 md:gap-x-2'>
          <Link 
            href={element.Driver.url}
            className="hover:font-bold"
          >{`${element.Driver.givenName} ${element.Driver.familyName}`}</Link>
          <FlagComp nationality={element.Driver.nationality}/>
        </div>
        <div className='flex flex-wrap items-center w-full gap-2 sm:grid sm:grid-cols-2 sm:gap-x-2'>
        <Link 
            href={element.Constructors[0].url}
            className="hover:font-bold"
          >{element.Constructors[0].name}</Link>
          <FlagComp nationality={element.Constructors[0].nationality}/>
        </div>
        <p>{`Total points: ${element?.points ?? '0'}`}</p>
      </div>
    </li>
  ));

  return (
    <section className="flex flex-col justify-center w-full gap-4 item-center">
      <HeadingPages
        heading={`${standingResult.season} Driver Standing`}
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
    </section>
  )
}