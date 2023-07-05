import { nanoid } from "@reduxjs/toolkit";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

type Props = {
  results: ResultGPF1
}

const ResultsComp = async ({ results }: Props) => {
  const resultArr = results.Results.slice(0, 3);
  const resultList = resultArr.map((element) => (
    <li key={nanoid()} className="flex items-center gap-4">
      <div>{`${element.position}.`}</div>
      <div>
        <p>{`${element.Driver.givenName} ${element.Driver.familyName} Points: ${element.points}`}</p>
        <p>&#32;&#32;&#32;{`Total time: ${element.Time.time} Fastest time: ${element.FastestLap.Time.time}`}</p>
      </div>
    </li>
  ));
  return (
    <div className="px-6 py-8 border-2 border-solid rounded">
      <h3>Last <span className="hidden md:inline">Grand Prix</span> Results</h3>
      <div>
        <span className="hidden md:inline">
          Race name:
        </span>
        <span>&#32;{results.raceName}</span>
      </div>
      <ul>
        {resultList}
      </ul>
      <div> Click for more details <FaRegArrowAltCircleRight /> </div>
    </div>
  )
}

export default ResultsComp