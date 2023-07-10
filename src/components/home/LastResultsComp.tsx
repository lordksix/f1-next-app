import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import FlagComp from '../shared/flag';
import { getRaceResultF1 } from '@/lib/getF1data';


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
    <li key={nanoid()} className="flex items-center w-full gap-2 text-sm md:text-base">
      <div>{`${element.position}.`}</div>
      <div>
        <div className='grid items-center grid-flow-col gap-2 auto-cols-max'>
          <Link 
            href={element.Driver.url}
            className="hover:font-bold"
          >{`${element.Driver.givenName} ${element.Driver.familyName}`}</Link>
          <FlagComp nationality={element.Driver.nationality}/>
        </div>
        <div className='grid items-center grid-flow-col gap-2 auto-cols-max'>
          <Link 
            href={element.Constructor.url}
            className="hover:font-bold"
          >{element.Constructor.name}</Link>
          <FlagComp nationality={element.Constructor.nationality}/>
        </div>        
        <p>{`Total time: ${element?.Time?.time ?? 'No time'}`}</p>
        <p>{`Points: ${element.points}`}</p>
      </div>
    </li>
  ));
  return (
    <div
      className="flex flex-col w-full h-full gap-2 px-4 py-6 border-2 border-solid animate-fade-up rounded-3xl"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      <h2 className="text-lg font-bold text-center md:text-xl xl:text-3xl">Last <span className="hidden md:inline">Grand Prix</span> Results</h2>
      <Link 
        href={results[0].url}
        className="w-full font-semibold text-center hover:font-extrabold md:text-lg"
      >
        {results[0].raceName}
      </Link>

      <ul className="flex flex-col justify-start w-11/12 h-full gap-4 sm:grid sm:grid-cols-2 lg:flex xl:grid ">
        {resultList}
      </ul>
      <div className="flex items-end self-end justify-end w-full h-full justify-self-end">
        <Link className="flex items-center justify-end gap-2 justify-self-end hover:text-orange-500" href={`/results/${results[0].season}/${results[0].round}`}>
          Full results
          <FaRegArrowAltCircleRight />
        </Link>
      </div>
    </div>
  )
}

export default ResultsComp