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
  const qualiData = getFormattedDate(`${races[0].Qualifying.date} ${races[0].Qualifying.time}`);
  return (
    <div
      className="flex flex-col w-full h-full gap-2 px-6 py-8 border-2 border-solid animate-fade-up rounded-3xl"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      <h2 className="font-bold text-center lg:text-xl 2xl:text-2xl">Next <span className="md:hidden">Race</span><span className="hidden md:inline">Grand Prix</span></h2>
      <Suspense fallback="...">
        <h3 className="text-center md:text-lg">{raceName}</h3>
        <p className="text-sm md:text-base">
          <span className="hidden md:inline">
            Circuit:&#32;
          </span>
          <span>&#32;{circuitName}</span>
        </p>
        <p className="text-sm md:text-base">
          <span className="hidden md:inline">
            Location:&#32;
          </span>
          <span>&#32;{locationName}</span>
        </p>
        <p className="text-sm md:text-base">
          <span className="hidden md:inline">
            Time of race:&#32;
          </span>
          <span>&#32;{raceDate}</span>
        </p>
        <p className="text-sm md:text-base">
          <span className="hidden md:inline">
            Time of qualifying:&#32;
          </span>
          <span>&#32;{qualiData}</span>
        </p>
        <div className="flex items-end self-end justify-end w-full h-full justify-self-end">
          <Link className="flex items-center justify-end gap-2 hover:text-blue-500" href={`/races/${races[0].season}/${races[0].round}`}>
            Click for more details
            <FaRegArrowAltCircleRight />
          </Link>
        </div>

      </Suspense>
    </div>
  )
}

export default NextRaceComp