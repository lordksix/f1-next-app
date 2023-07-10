import { notFound } from 'next/navigation';
import { getRaceF1 } from '@/lib/getF1data';
import getFormattedDate from '@/lib/getFormattedDate';
import { getRacesF1StaticParams } from '@/lib/getF1Meta';
import { nanoid } from '@reduxjs/toolkit';
import RaceSchedule from '@/components/shared/racecalendar';
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
  const raceGP = await getRaceF1(`${yearid}`) //deduped!

  if(!raceGP || raceGP.length === 0) {
      return {
          title: 'Season Calendar Not Found',
          description: `Season ${yearid} does not exist`,
      }
  }
  return {
      title: `${raceGP[0].season} Calendar`,
      description: `F1 ${yearid} Calendar `,
  }
}

export default async function Result({ params: { yearid } }: Props) {
  const raceGPArr = await getRaceF1(`${yearid}`) //deduped!
  const currentGP = await getRaceF1('current/next');
  let current: string;
  if(!raceGPArr || raceGPArr.length === 0 || !currentGP) notFound();
  if(currentGP.length === 0) current = '50';
  else current = currentGP[0].round;

  const currentSeason = raceGPArr[0].season;
  const raceGPList = raceGPArr.map((element) => {
    const raceName = `${element.season} ${element.raceName}`;
    const raceNameURL = element.url;
    const circuitName = element.Circuit.circuitName
    const circuitNameURL = element.Circuit.url
    const locationName = `${element.Circuit.Location.locality}, ${element.Circuit.Location.country}`;
    const raceDate = element?.date ? (element?.time ? getFormattedDate(`${element.date} ${element.time}`) : element.date) : 'No info';
    const qualiData = element?.Qualifying ? (element.Qualifying?.date && element.Qualifying?.time ? getFormattedDate(`${element.Qualifying.date} ${element.Qualifying.time}`) : element.Qualifying.date) : 'No info';
    
    const season = element.season;
    const round = element.round;
    return (
      <div key={nanoid()} className="flex flex-col gap-4">
        <RaceSchedule
          raceName={raceName}
          raceNameURL={raceNameURL}
          circuitName={circuitName}
          circuitNameURL={circuitNameURL}
          locationName={locationName}
          raceDate={raceDate}
          qualiData={qualiData}
          season={season}
          round={round}
          current={current}
        />
      </div>
    );

  });

  return (
    <main className="w-full max-w-4xl min-h-screen md:w-10/12 no-scrollbar lg:w-11/12">
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <HeadingPages
            heading={`F1 ${currentSeason} CALENDAR`}
          />
        <section className="flex flex-col w-full h-full max-w-5xl gap-10 md:w-11/12 md:gap-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-10">
          {raceGPList}
        </section>
      </section>
    </main>
  )
}