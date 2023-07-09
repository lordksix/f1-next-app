import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import FlagComp from '../shared/flag';
import { getRaceResultF1 } from '@/lib/getF1data';
import LoadingData from '../shared/loadingData';


const ResultsComp = async () => {
  const results = await getRaceResultF1('current/last');
  if(!results || results.length === 0) {
    return (
      <div className="px-6 py-8 border-2 border-solid rounded">
        <h3 className="text-center"> No Results</h3>
      </div>
    );
    
  } 
  const resultArr = results[0].Results.slice(0, 3);
  const resultList = resultArr.map((element) => (
    <li key={nanoid()} className="flex flex-wrap items-center gap-4 text-sm md:text-base">
      <div>{`${element.position}.`}</div>
      <div>
        <div className='flex items-center gap-2 sm:flex-wrap'>
          <p>{`${element.Driver.givenName} ${element.Driver.familyName}`}</p>
          <FlagComp nationality={element.Driver.nationality}/>
        </div>
        <div className='flex items-center gap-2 sm:flex-wrap'>
          <p>{element.Constructor.name}</p>
          <FlagComp nationality={element.Constructor.nationality}/>
        </div>        
        <p>{`Total time: ${element?.Time?.time ?? 'No time'}`}</p>
      </div>
    </li>
  ));
  return (
    <div
      className="flex flex-col w-full h-full gap-6 px-6 py-8 border-2 border-solid animate-fade-up rounded-3xl"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      <h2 className="text-lg font-bold text-center md:text-xl xl:text-3xl">Last <span className="hidden md:inline">Grand Prix</span> Results</h2>
      <Suspense fallback={<LoadingData />}>
        <h3 className="font-semibold text-center md:text-lg">
          <span className="hidden md:inline">
            Race:
          </span>
          <span>&#32;{results[0].raceName}</span>
        </h3>
        <ul className="flex flex-wrap justify-center w-full h-full gap-4">
          {resultList}
        </ul>
        <div className="flex items-end self-end justify-end w-full h-full justify-self-end">
          <Link className="flex items-center justify-end gap-2 justify-self-end hover:text-orange-500" href={`/results/${results[0].season}/${results[0].round}`}>
            Full results
            <FaRegArrowAltCircleRight />
          </Link>
        </div>
      </Suspense>
      
    </div>
  )
}

export default ResultsComp