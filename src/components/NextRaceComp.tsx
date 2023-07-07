import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import getFormattedDate from "@/lib/getFormattedDate"
import { Suspense } from "react";

type Props = {
  races: RaceGPF1[] | undefined
}

const NextRaceComp = ({ races }: Props) => {
  if(!races || races.length === 0) {
    return (
      <div className="px-6 py-8 border-2 border-solid rounded">
        <h3 className="text-center"> No Results</h3>
      </div>
    ); 
  }
  const raceName = `${races[0].season} ${races[0].raceName}`;
  const circuitName = races[0].Circuit.circuitName
  const locationName = `${races[0].Circuit.Location.locality}, ${races[0].Circuit.Location.country}`;
  const raceDate = getFormattedDate(`${races[0].date} ${races[0].time}`)
  return (
    <div className="px-6 py-8 border-2 border-solid rounded">
      <h2 className="text-center">Next <span className="md:hidden">Race</span><span className="hidden md:inline">Grand Prix</span></h2>
      <Suspense fallback="...">
        <h3 className="text-center">{raceName}</h3>
        <p className="text-center">
          <span className="hidden md:inline">
            Circuit:
          </span>
          <span>{circuitName}</span>
        </p>
        <p className="text-center">
          <span className="hidden md:inline">
            Location:
          </span>
          <span>{locationName}</span>
        </p>
        <p className="text-center">
          <span className="hidden md:inline">
            Time of race:
          </span>
          <span>{raceDate}</span>
        </p>
        <Link className=" hover:text-blue-500" href={`/races/${races[0].season}/${races[0].round}`}>
          Click for more details
          <FaRegArrowAltCircleRight />
        </Link>
      </Suspense>
    </div>
  )
}

export default NextRaceComp