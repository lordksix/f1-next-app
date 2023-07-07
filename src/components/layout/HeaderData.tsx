'use client';

import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import React from 'react'
import useScroll from '@/lib/hooks/use-scroll';
import Image from 'next/image';
import useWindowSize from '@/lib/hooks/use-window-size';
import NavbarData from './NavbarData';

const HeaderData = () => {
  const scrolled = useScroll(50);
  const { isMobile } = useWindowSize();

  const returnBtn = (
    <Link
      href="/"
      className="navbarBtn"
      title="home"
    >
      <button type="button" className="flex">
        <FaChevronLeft />
      </button>
    </Link>
  );
  const logo = (
    <Link href="/" className="flex items-center">
      <Image
      src="/lordksix-logos_transparent.png"
      alt="lordksix logo"
      width="100"
      height="30"
      className="mr-2 rounded-sm bg-black dark:bg-transparent"
      ></Image>
    </Link>
  );
  const burgerBtnMenuModal = (
    <button
    className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
    onClick={() => console.log('true')}
  >
    <GiHamburgerMenu />
  </button>
  );
  return (
    <header
      className={`fixed top-0 w-full flex justify-center ${
        scrolled
          ? "border-b border-gray-600  dark:border-gray-200 bg-white/50 dark:bg-black/50 backdrop-blur-xl"
          : "bg-white/0 dark:bg-black/0"
      } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
        {returnBtn}
        {logo}
        {isMobile ? burgerBtnMenuModal : <NavbarData />}
      </div>
    </header>
  )
}

export default HeaderData