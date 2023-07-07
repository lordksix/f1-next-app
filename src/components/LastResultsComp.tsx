import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { Suspense } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

type Props = {
  results: ResultGPF1[] | undefined
}

const ResultsComp = async ({ results }: Props) => {
  if(!results || results.length === 0) {
    return (
      <div className="px-6 py-8 border-2 border-solid rounded">
        <h3 className="text-center"> No Results</h3>
      </div>
    );
    
  } 
  const resultArr = results[0].Results.slice(0, 3);
  const resultList = resultArr.map((element) => (
    <li key={nanoid()} className="flex items-center gap-4">
      <div>{`${element.position}.`}</div>
      <div>
        <p>{`${element.Driver.givenName} ${element.Driver.familyName} Points: ${element.points}`}</p>
        <p>&#32;&#32;&#32;{`Total time: ${element?.Time?.time || 'No time'} Fastest time: ${element.FastestLap.Time.time}`}</p>
      </div>
    </li>
  ));
  return (
    <div className="px-6 py-8 border-2 border-solid rounded">
      <h2 className="text-center">Last <span className="hidden md:inline">Grand Prix</span> Results</h2>
      <Suspense fallback="...">
        <h3 className="text-center">
          <span className="hidden md:inline">
            Race:
          </span>
          <span>&#32;{results[0].raceName}</span>
        </h3>
        <ul>
          {resultList}
        </ul>
        <Link className="hover:text-orange-500" href={`/results/${results[0].season}/${results[0].round}`}>
          Click for more details
          <FaRegArrowAltCircleRight />
        </Link>
      </Suspense>
      
    </div>
  )
}

export default ResultsComp