import { notFound } from "next/navigation"
import Link from "next/link"
import { getRaceF1 } from "@/lib/getF1data"
import getFormattedDate from "@/lib/getFormattedDate"
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
  const raceGP = await getRaceF1(`${yearid}/${raceid}`) //deduped!

  if(!raceGP || raceGP.length === 0) {
      return {
          title: 'Race Programming Not Found',
          description: `Race ${raceid} of ${yearid} does not exist`,
      }
  }
  return {
      title: `${raceGP[0].season} ${raceGP[0].raceName} Schedule`,
      description: `Race ${raceid} of ${yearid} does not exist`,
  }
}

export default async function Result({ params: { yearid, raceid } }: Props) {
  const raceGPArr = await getRaceF1(`${yearid}/${raceid}`) //deduped!

  if(!raceGPArr || raceGPArr.length === 0) notFound()

  const raceGP = raceGPArr[0];

  const externalLink = raceGP.url;
  const raceDate = getFormattedDate(`${raceGP.date} ${raceGP.time}`);
  const firstEvt: string = 'FirstPractice';
  const firstEvtTime: string = getFormattedDate(`${raceGP.FirstPractice.date} ${raceGP.FirstPractice.time}`);
  let secondEvt: string;
  let secondEvtTime: string;
  let thirdEvt: string;
  let thirdEvtTime: string;
  let forthEvt: string;
  let forthEvtTime: string;

  if(raceGP.Sprint){
    secondEvt = 'Qualifying';
    secondEvtTime = getFormattedDate(`${raceGP.Qualifying.date} ${raceGP.Qualifying.time}`);
    thirdEvt = 'Second Practice';
    thirdEvtTime = getFormattedDate(`${raceGP.SecondPractice.date} ${raceGP.SecondPractice.time}`);
    forthEvt = 'Sprint';
    forthEvtTime = getFormattedDate(`${raceGP.Sprint.date} ${raceGP.Sprint.time}`);
  } else {
    secondEvt = 'Second Practice';
    secondEvtTime = getFormattedDate(`${raceGP.SecondPractice.date} ${raceGP.SecondPractice.time}`);
    thirdEvt = 'Third Practice';
    thirdEvtTime = getFormattedDate(`${raceGP?.ThirdPractice?.date ?? ''} ${raceGP?.ThirdPractice?.time ?? ''}`);
    forthEvt = 'Qualifying';
    forthEvtTime = getFormattedDate(`${raceGP.Qualifying.date} ${raceGP.Qualifying.time}`);
  }
  
  

  return (
    <section>
      <h2 className="mt-4 mb-0 text-3xl">{`${raceGP.season} ${raceGP.raceName} Programming`}</h2>
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
        <h3>Schedule</h3>
        <p><span>{firstEvt}</span><span>{firstEvtTime}</span></p>
        <p><span>{secondEvt}</span><span>{secondEvtTime}</span></p>
        <p><span>{thirdEvt}</span><span>{thirdEvtTime}</span></p>
        <p><span>{forthEvt}</span><span>{forthEvtTime}</span></p>
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