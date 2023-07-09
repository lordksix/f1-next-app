import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import getFormattedDate from "@/lib/getFormattedDate"
import { Suspense } from "react";
import { getRaceF1 } from "@/lib/getF1data";
import LoadingData from "../shared/loadingData";
import RaceSchedule from "../shared/racecalendar";

const CalendarComp = async () => {
  const races = await getRaceF1('current/next');

  if(!races || races.length === 0) {
    return (
      <div className="px-6 py-8 border-2 border-solid rounded">
        <h3 className="text-center"> No Results</h3>
      </div>
    ); 
  }
  const followingRaceData = await getRaceF1(`current/${+races[0].round + 1}`);

  const raceName = `${races[0].season} ${races[0].raceName}`;
  const circuitName = races[0].Circuit.circuitName
  const locationName = `${races[0].Circuit.Location.locality}, ${races[0].Circuit.Location.country}`;
  const raceDate = getFormattedDate(`${races[0].date} ${races[0].time}`)
  const qualiData = races[0]?.Qualifying ? getFormattedDate(`${races[0].Qualifying.date} ${races[0].Qualifying.time}`) : 'No data';

  let followingRace;
  if(!followingRaceData || followingRaceData.length === 0) {
    followingRace = (
      <h3 className="text-lg justify-self-center md:text-2xl">
        No more races
      </h3>
    );
  } else {
    const raceName = `${followingRaceData[0].season} ${followingRaceData[0].raceName}`;
    const circuitName = followingRaceData[0].Circuit.circuitName
    const locationName = `${followingRaceData[0].Circuit.Location.locality}, ${followingRaceData[0].Circuit.Location.country}`;
    const raceDate = getFormattedDate(`${followingRaceData[0].date} ${followingRaceData[0].time}`)
    const qualiData = followingRaceData[0]?.Qualifying ? getFormattedDate(`${followingRaceData[0].Qualifying.date} ${followingRaceData[0].Qualifying.time}`) : 'No data';
    followingRace = (
      <RaceSchedule
        raceName={raceName}
        circuitName={circuitName}
        locationName={locationName}
        raceDate={raceDate}
        qualiData={qualiData}
        season={followingRaceData[0].season}
        round={followingRaceData[0].round}
      />
    );
  }
  return (
    <div
      className="flex flex-col w-full h-full gap-6 px-6 py-8 border-2 border-solid animate-fade-up rounded-3xl"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      <h2 className="text-lg font-bold text-center md:text-xl xl:text-3xl">Current Calendar</h2>
      <section className="flex flex-col md:grid md:grid-cols-2 md:gap-10">
        <div className="flex flex-col gap-4">
          <Suspense fallback={<LoadingData />}>
          <RaceSchedule
            raceName={raceName}
            circuitName={circuitName}
            locationName={locationName}
            raceDate={raceDate}
            qualiData={qualiData}
            season={races[0].season}
            round={races[0].round}
          />
          </Suspense>
        </div>
        <div className="flex flex-col gap-4">
        <Suspense fallback={<LoadingData />}>
          {followingRace}
        </Suspense>
        </div>
      </section>
        <div className="flex justify-center w-full h-full item-center">
          <Link className="flex items-center gap-2 text-base font-bold text-center hover:text-blue-500 md:text-lg xl:text-2xl" href={`/races/${races[0].season}`}>
            {`${races[0].season} F1 CALENDAR`}
            <FaRegArrowAltCircleRight />
          </Link>
        </div>
    </div>
  );
};

export default CalendarComp;