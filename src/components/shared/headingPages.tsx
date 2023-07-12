'use client'

import { nanoid } from '@reduxjs/toolkit';
import Popover from '@/components/shared/popover';
import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import Link from 'next/link';

type Props = {
  heading: string,
};

const HeadingPages = ({ heading}: Props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const popTitle = 'Season';
  const popOverList = [];
  const currentYear = new Date().getFullYear();
  popOverList.push({ title: 'Current', href: `/races/${currentYear}` });
  for (let index = (+currentYear - 1); index > 2018; index--) {
    popOverList.push({ title: index.toString(), href: `/races/${index}` });
  }
  popOverList.push({ title: 'All years', href: '/races' });
  const popList = popOverList.map((element) => (
    <button
      key={nanoid()}
      className="flex items-center justify-start w-full p-2 space-x-2 text-sm text-left text-black transition-all duration-75 rounded-md hover:bg-gray-100 active:bg-gray-200"
    >
      <Link
          href={element.href}
          className="flex items-center justify-center w-full h-full text-white dark:text-white hover:text-black"
        >
          {element.title}
      </Link>
    </button>
  ));
  return (
    <div className='flex flex-wrap items-center justify-around w-full gap-5'>
      <h2 className="text-lg align-middle md:text-3xl">{heading}</h2>
      <Popover
        content={
          <div className="w-full p-2 text-white bg-gray-800 rounded-md dark:text-gray-800">
            {popList}
          </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex items-center transition-all duration-75 border border-gray-300 rounded-md w-36 hover:border-gray-800 focus:outline-none active:bg-gray-100 dark:active:text-gray-800"
        >
          <p className="flex items-center justify-between w-full h-full px-4 py-2 text-gray-800 dark:text-gray-100 dark:active:text-gray-800">
            {popTitle}
            <LuChevronDown
              className={`h-4 w-4 transition-all ${openPopover ? "rotate-180" : ""
              }`}
          />
          </p>
        </button>
      </Popover>
    </div>
  );
};

export default HeadingPages;