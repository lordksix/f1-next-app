import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRaceF1 } from '@/lib/getF1data';
import getFormattedDate from '@/lib/getFormattedDate';
import { getRacesF1StaticParams } from '@/lib/getF1Meta';
import HeadingPages from '@/components/shared/headingPages';
import eventSelector from '@/lib/eventSelector';

export const revalidate = 86400

type Props = {
    params: {
      yearid: string,
      raceid: string,
    }
};

export async function generateStaticParams() {
  const racesF1 = await getRacesF1StaticParams();

  if(!racesF1) return [];
  return racesF1;
}

export async function generateMetadata({ params: { yearid, raceid } }: Props) {
  const raceGP = await getRaceF1(`${yearid}/${raceid}`); //deduped!

  if(!raceGP || raceGP.length === 0) {
      return {
          title: 'Race Programming Not Found',
          description: `Race ${raceid} of ${yearid} does not exist`,
      };
  };
  return {
      title: `${raceGP[0].season} ${raceGP[0].raceName} Schedule`,
      description: `Race ${raceid} of ${yearid} Schedule`,
  };
}

export default async function Result({ params: { yearid, raceid } }: Props) {
  const raceGPArr = await getRaceF1(`${yearid}/${raceid}`); //deduped!

  if(!raceGPArr || raceGPArr.length === 0) notFound();

  const raceGP = raceGPArr[0];
  const currentSeason = raceGP.season;
  const externalLink = raceGP.url;
  const raceDate = raceGP?.date ? (raceGP?.time ? getFormattedDate(`${raceGP.date} ${raceGP.time}`) : raceGP.date) : 'No info';
  const eventSel = eventSelector(raceGP);
  return (
    <section className="flex flex-col justify-center w-full gap-4 item-center">
      <HeadingPages
        heading={`${currentSeason} ${raceGP.raceName} Programming`}
      />
      <p className="mt-0 text-sm sm:text-base">{`Date of Race: ${raceDate}`}</p>
      <Link 
        href={raceGP.Circuit.url}
        className="mt-0 text-sm hover:font-bold sm:text-base"
      >{`Circuit: ${raceGP.Circuit.circuitName}`}</Link>
      <p className="mt-0 text-sm sm:text-base">
        {`Location: ${raceGP.Circuit.Location.locality}, ${raceGP.Circuit.Location.country}`}
      </p>
      <h3>Schedule</h3>
      <div className="flex flex-col justify-center gap-2 px-8">
        <p>{`${eventSel.firstEvt}: ${eventSel.firstEvtTime}`}</p>
        <p>{`${eventSel.secondEvt}: ${eventSel.secondEvtTime}`}</p>
        <p>{`${eventSel.thirdEvt}: ${eventSel.thirdEvtTime}`}</p>
        <p>{`${eventSel.forthEvt}: ${eventSel.forthEvtTime}`}</p>
      </div>
      <p>
          <Link href={externalLink} className="hover:text-orange-500">More Details</Link>
      </p>
    </section>
  )
}