'use client';

import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { Suspense } from 'react'
import useScroll from '@/lib/hooks/use-scroll';
import Image from 'next/image';
import { useMenuModal } from './MenuModal';
import LoadingData from '../shared/loadingData';
import { useRouter } from 'next/navigation';
import { GoHomeFill } from 'react-icons/go';


const HeaderData = () => {
  const scrolled = useScroll(50);
  const router = useRouter();
  const { MenuModal, setShowMenuModal } = useMenuModal();

  const returnBtn = (
    <button type="button" className="flex items-center justify-center hover:text-blue-500" onClick={() => router.back()}  title="goback">
      <FaChevronLeft />
    </button>
  );
  const logo = (
    <Link href="/" className="flex flex-wrap items-center justify-center gap-2 hover:font-bold hover:text-red-500">
      <GoHomeFill />
      <Image
        src="/lordksix-logos_transparent.png"
        alt="lordksix logo"
        width="100"
        height="30"
        className="bg-black rounded-sm dark:bg-transparent"
      >
      </Image>
      F1Mania
    </Link>
  );
  const burgerBtnMenuModal = (
    <button
    className="rounded-full border border-gray-800 dark:border-gray-200 bg-black dark:bg-white p-1.5 px-4 text-sm text-white dark:text-black transition-all hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
    onClick={() => setShowMenuModal(true)}
  >
    <GiHamburgerMenu />
  </button>
  );
  return (
    <>
      <Suspense fallback={<LoadingData />}>
        <MenuModal />      
        <header
          className={`fixed top-0 w-full flex justify-center ${
            scrolled
              ? "border-b border-gray-600  dark:border-gray-200 bg-white/50 dark:bg-black/50 backdrop-blur-xl"
              : "bg-white/0 dark:bg-black/0"
          } z-30 transition-all`}
        >
          <div className="flex items-center justify-between w-full h-16 max-w-screen-xl mx-5">
              {returnBtn}
              {logo}
              {burgerBtnMenuModal}
          </div>
        </header>
      </Suspense>
    </>
  );
}

export default HeaderData;