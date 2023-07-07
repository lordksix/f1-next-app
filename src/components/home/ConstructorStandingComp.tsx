import { nanoid } from '@reduxjs/toolkit';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

type Props = {
  results: ConstructorStadingList[] | undefined
}

const ConstructorStandingComp = async ({ results }: Props) => {
  if(!results || results.length === 0) {
    return (
      <div className="px-6 py-8 border-2 border-solid rounded">
        <h3 className="text-center"> No Results</h3>
      </div>
    );
    
  } 
  const resultArr = results[0].ConstructorStandings.slice(0, 3);
  const resultList = resultArr.map((element) => (
    <li key={nanoid()} className="flex items-center gap-4 text-sm md:text-base">
      <div>{`${element.position}.`}</div>
      <div>
        <p>{`${element.Constructor.name}`}</p>
        <p>{`Total points: ${element?.points || '0'}`}</p>
      </div>
    </li>
  ));
  return (
    <div
      className="flex flex-col w-full h-full gap-2 px-6 py-8 border-2 border-solid animate-fade-up rounded-3xl"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      <h2 className="text-lg font-bold text-center lg:text-xl 2xl:text-2xl">Current Standing</h2>
      <Suspense fallback="...">
        <h3 className="text-center md:text-lg">
          <span>&#32;{results[0].season}</span>
          <span>&#32;Constructors Standing</span>
        </h3>
        <ul>
          {resultList}
        </ul>
        <div className="flex items-end self-end justify-end w-full h-full justify-self-end">
          <Link className="flex items-center justify-end gap-2 justify-self-end hover:text-orange-500" href={`/results/${results[0].season}/${results[0].round}`}>
            Click for more details
            <FaRegArrowAltCircleRight />
          </Link>
        </div>
      </Suspense>
      
    </div>
  );
}

export default ConstructorStandingComp;