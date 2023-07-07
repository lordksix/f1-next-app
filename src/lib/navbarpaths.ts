import { getRaceResultF1, getRaceF1 } from '@/lib/getF1data';

const navpaths = async() => {
  const lastResult = await getRaceResultF1('current/last');
  const nextRace = await getRaceF1('current/next');
  let hrefLastResult: string;
  let hrefNexTRace: string;
  if(!lastResult) hrefLastResult = '/results';
  else hrefLastResult = `/results/${lastResult[0].season}/${lastResult[0].round}`;
  if(!nextRace) hrefNexTRace = '/races';
  else hrefNexTRace = `/races/${nextRace[0].season}/${nextRace[0].round}`;
  const links = [
    { path: '/', text: 'Home' },
    { path: hrefLastResult, text: 'Last Race' },
    { path: hrefNexTRace, text: 'Next Race' },
  ];
  return links;
}

export default navpaths;