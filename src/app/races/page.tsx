import HeadingPages from '@/components/shared/headingPages';
import { getSeasonF1 } from '@/lib/getF1data';
import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

export const revalidate = 86400;


export async function generateMetadata() {

  return {
      title: 'Historical F1 calendar',
      description: 'Select the F1 season you want to check',
  }
}

export default async function Result() {
  const seasonsF1 = await getSeasonF1();
  let seasonList;
  if(!seasonsF1 || seasonsF1.length === 0) seasonList = <p>No data</p>;
  else {
    seasonList = seasonsF1.map((element) => (
      <div key={nanoid()} className="flex flex-col gap-2 px-4 py-2">
        <Link
          href={`/races/${element.season}`}
          className="grid items-center grid-cols-2 gap-x-8 hover:underline hover:text-red-700"
        >
          {`Season ${element.season}`}
          <FaRegArrowAltCircleRight />
        </Link>
        <Link
          href={element.url}
          className="grid items-center grid-cols-2 gap-x-8 hover:underline hover:text-blue-700"
        >
          Historic Information
          <FaRegArrowAltCircleRight />
        </Link>
      </div>
    ));
  }
  
  return (
    <section className="flex flex-col items-center justify-center w-full max-w-5xl min-h-screen gap-8 no-scrollbar">
      <HeadingPages
          heading={'ALL F1 CALENDAR'}
        />
      <section className="flex flex-col w-full h-full max-w-5xl gap-10 md:gap-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 lg:w-11/12">
        {seasonList}
      </section>
    </section>
  )
}