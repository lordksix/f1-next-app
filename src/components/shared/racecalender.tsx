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
}

export default function RaceSchedule({
  raceName, circuitName, locationName, raceDate, qualiData,
  season, round = undefined
}: Props) {
    return (
      <>
        <h3 className="font-semibold text-center md:text-lg">{raceName}</h3>
        <p className="text-sm md:text-base">
          Circuit:&#32;{circuitName}
        </p>
        <p className="text-sm md:text-base">
          Location:&#32; {locationName}
        </p>
        <p className="text-sm md:text-base">
          Race:&#32;{raceDate}
        </p>
        <p className="text-sm md:text-base">
          Qualifying:&#32;{qualiData}
        </p>
        <div className="flex items-end self-end justify-end w-full h-full justify-self-end">
          <Link
            className="flex items-center justify-end gap-2 hover:text-blue-500"
            href={round ? `/races/${season}/${round}` : `/races/${season}`}
          >
            Click for more details
            <FaRegArrowAltCircleRight />
          </Link>
        </div>
      </>
    );
};