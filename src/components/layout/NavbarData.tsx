import { getLastResultF1, getNextRaceF1 } from '@/lib/getF1data';
import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';

const NavbarData = async() => {
  const lastResult = await getLastResultF1();
  const nextRace = await getNextRaceF1();
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

  const navbar = (
    links.map((link) => (
      <li key={nanoid()}>
        <Link
          href={link.path}
        >
          {link.text}
        </Link>
      </li>
    ))
  );
  return (
    <nav><ul className="flex list-none gap-2">{navbar}</ul></nav>
  );
}

export default NavbarData;