import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRaceF1 } from '@/lib/getF1data';
import getFormattedDate from '@/lib/getFormattedDate';
import { getRacesF1StaticParams } from '@/lib/getF1Meta';
import HeadingPages from '@/components/shared/headingPages';

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
  const seasonList = [];
  const seasonTitle = 'Season';
  for (let index = +currentSeason; index > 2015; index--) {
    seasonList.push({ title: index.toString(), href: `/races/${index}` });
  }
  const externalLink = raceGP.url;
  const raceDate = getFormattedDate(`${raceGP.date} ${raceGP.time}`);
  const firstEvt: string = 'First Practice';
  const firstEvtTime: string = raceGP?.FirstPractice ? getFormattedDate(`${raceGP.FirstPractice.date} ${raceGP.FirstPractice.time}`) : 'No info';
  let secondEvt: string;
  let secondEvtTime: string;
  let thirdEvt: string;
  let thirdEvtTime: string;
  let forthEvt: string;
  let forthEvtTime: string;

  if(raceGP.Sprint){
    secondEvt = 'Qualifying';
    secondEvtTime = raceGP?.Qualifying?.time ? getFormattedDate(`${raceGP.Qualifying.date} ${raceGP.Qualifying.time}`) : 'No info';
    thirdEvt = 'Second Practice';
    thirdEvtTime = raceGP?.SecondPractice?.time ? getFormattedDate(`${raceGP.SecondPractice.date} ${raceGP.SecondPractice.time}`) : 'No info';
    forthEvt = 'Sprint';
    forthEvtTime = getFormattedDate(`${raceGP.Sprint.date} ${raceGP.Sprint.time}`);
  } else {
    secondEvt = 'Second Practice';
    secondEvtTime = raceGP?.SecondPractice?.time ? getFormattedDate(`${raceGP.SecondPractice.date} ${raceGP.SecondPractice.time}`) : 'No info';
    thirdEvt = 'Third Practice';
    thirdEvtTime = raceGP?.ThirdPractice?.time ? getFormattedDate(`${raceGP.ThirdPractice.date} ${raceGP.ThirdPractice.time}`) : 'No info';
    forthEvt = 'Qualifying';
    forthEvtTime = raceGP?.Qualifying?.time ? getFormattedDate(`${raceGP.Qualifying.date} ${raceGP.Qualifying.time}`) : 'No info';
  };
  
  

  return (
    <section className="flex flex-col justify-center w-full gap-4 item-center">
      <HeadingPages
        popTitle={seasonTitle}
        heading={`${raceGP.season} ${raceGP.raceName} Programming`}
        popOverList={seasonList}
      />
      <p className="mt-0 text-sm sm:text-base">
        Date of Race: 
        {raceDate}
      </p>
      <Link 
        href={raceGP.Circuit.url}
        className="mt-0 text-sm hover:font-bold sm:text-base"
      >{`Circuit: ${raceGP.Circuit.circuitName}`}</Link>
      <p className="mt-0 text-sm sm:text-base">
        {`Location: ${raceGP.Circuit.Location.locality}, ${raceGP.Circuit.Location.country}`}
      </p>
      <h3>Schedule</h3>
      <div className="flex flex-col justify-center gap-2 px-8">
        <p><span>{firstEvt}:&#160;</span><span>{firstEvtTime}</span></p>
        <p><span>{secondEvt}:&#160;</span><span>{secondEvtTime}</span></p>
        <p><span>{thirdEvt}:&#160;</span><span>{thirdEvtTime}</span></p>
        <p><span>{forthEvt}:&#160;</span><span>{forthEvtTime}</span></p>
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