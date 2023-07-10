import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import FlagComp from '../shared/flag';
import { getDriverStandingF1 } from '@/lib/getF1data';

const DriverStandingComp = async () => {
  const results = await getDriverStandingF1('current');
  if(!results || results.length === 0) {
    return (
      <div className="px-6 py-8 border-2 border-solid rounded">
        <h3 className="text-center"> No Results</h3>
      </div>
    );
    
  } 
  const resultArr = results[0].DriverStandings.slice(0, 3);
  const resultList = resultArr.map((element) => (
    <li key={nanoid()} className="flex items-center w-full gap-2 text-sm md:text-base">
      <p>{`${element.position}.`}</p>
      <div>
        <div className='grid items-center w-full grid-flow-col gap-2 auto-cols-max'>
          <Link 
            href={element.Driver.url}
            target="_blank"
            className="hover:font-bold"
          >{`${element.Driver.givenName} ${element.Driver.familyName}`}</Link>
          <FlagComp nationality={element.Driver.nationality}/>
        </div>
        <div className='grid items-center grid-flow-col gap-2 auto-cols-max'>
          <Link 
            href={element.Constructors[0].url}
            target="_blank"
            className="hover:font-bold"
          >{element.Constructors[0].name}</Link>
          <FlagComp nationality={element.Constructors[0].nationality}/>
        </div>
        <p>{`Total points: ${element?.points || '0'}`}</p>
      </div>
    </li>
  ));
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full gap-2 px-4 py-6 border-2 border-solid animate-fade-up rounded-3xl hover:border-red-500"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      <h2 className="text-lg font-bold text-center md:text-xl xl:text-3xl">{`${results[0].season} Driver Standing`}</h2>
      <ul className="flex flex-col justify-start w-11/12 h-full gap-4 sm:grid sm:grid-cols-2 lg:flex xl:grid xl:gap-x-0">
        {resultList}
      </ul>
      <div className="flex items-end self-end justify-end justify-self-end">
        <Link className="flex items-center justify-end gap-2 justify-self-end hover:text-red-500" href="/driverstanding/current">
          Full standing
          <FaRegArrowAltCircleRight />
        </Link>
      </div>
    </div>
  );
}

export default DriverStandingComp;