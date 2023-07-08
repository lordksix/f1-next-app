'use client'

import { nanoid } from '@reduxjs/toolkit';
import Popover from '@/components/shared/popover';
import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import Link from 'next/link';

type popList = {
  title: string,
  href: string,
};

type Props = {
  heading: string,
  popTitle: string,
  popOverList:popList[],
};

const HeadingPages = ({ heading, popOverList, popTitle }: Props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const popList = popOverList.map((element) => (
    <button
      key={nanoid()}
      className="flex items-center justify-start w-full p-2 space-x-2 text-sm text-left text-black transition-all duration-75 rounded-md hover:bg-gray-100 active:bg-gray-200"
    >
      <Link
          href={element.href}
          className="flex items-center justify-center w-full h-full"
        >
          {element.title}
      </Link>
    </button>
  ));
  return (
    <div className='flex flex-wrap items-center justify-between w-full gap-5'>
      <h2 className="text-lg align-middle md:text-3xl">{heading}</h2>
      <Popover
        content={
          <div className="w-full p-2 bg-white rounded-md sm:w-40">
            {popList}
          </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex items-center justify-between px-4 py-2 transition-all duration-75 border border-gray-300 rounded-md w-36 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        >
          <p className="text-gray-100">{popTitle}</p>
          <LuChevronDown
            className={`h-4 w-4 text-gray-100 transition-all ${openPopover ? "rotate-180" : ""
              }`}
          />
        </button>
      </Popover>
    </div>
  );
};

export default HeadingPages;