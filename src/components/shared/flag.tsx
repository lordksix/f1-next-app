import { flagURLGenerator } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

type Props = {
  nationality: string
}

const FlagComp = ({ nationality }: Props) => {
  const flagURL = flagURLGenerator(nationality);
  if(flagURL === '#') return <></>;
  return (
    <Image
      src={flagURL}
      alt={`${nationality} Flag`}
      width="24"
      height="24"
      className="mr-2 rounded-sm"
    >
    </Image>
  );
};

export default FlagComp;