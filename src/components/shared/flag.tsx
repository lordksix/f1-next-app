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
      className="w-6 h-5 mr-2 rounded-sm bg-slate-100 dark:bg-slate-950"
    >
    </Image>
  );
};

export default FlagComp;