import Link from 'next/link'
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

type Props = {
  raceName: string,
  circuitName: string,
  locationName: string,
  raceDate: string,
  qualiData: string,
  season: string,
  round?: string,
  current?: string,
}

export default function RaceSchedule({
  raceName, circuitName, locationName, raceDate, qualiData,
  season, round = undefined, current = undefined,
}: Props) {
    return (
      <>
        <h3 className="font-semibold text-center md:text-lg">{raceName}</h3>
        <p className="text-sm sm:text-base">
          Circuit:&#32;{circuitName}
        </p>
        <p className="text-sm sm:text-base">
          Location:&#32; {locationName}
        </p>
        <p className="text-sm sm:text-base">
          Race:&#32;{raceDate}
        </p>
        <p className="text-sm sm:text-base">
          Qualifying:&#32;{qualiData}
        </p>
        <div className="flex flex-col justify-center h-full text-base font-medium items-centerw-full sm:text-lg">
          {(current && round && (+round < +current)) && (
            <Link
              className="flex items-center gap-2 hover:text-blue-500"
              href={`/results/${season}/${round}`}
            >
              Results
              <FaRegArrowAltCircleRight />
            </Link>
          )}
          <Link
            className="flex items-center gap-2 hover:text-blue-500"
            href={round ? `/races/${season}/${round}` : `/races/${season}`}
          >
            Schedule
            <FaRegArrowAltCircleRight />
          </Link>
        </div>
      </>
    );
};