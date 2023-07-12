'use client';

import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { Suspense } from 'react'
import useScroll from '@/lib/hooks/use-scroll';
import Image from 'next/image';
import { useMenuModal } from './MenuModal';
import LoadingData from '../shared/loadingData';
import UserDropdown from './user-dropdown';
import { useRouter } from 'next/navigation';
import { GoHomeFill } from 'react-icons/go';
import { useSignInModal } from './sign-in-modal';
import { useSession } from 'next-auth/react';

type Props = {
  home: boolean,
}

const HeaderData = ({ home }: Props) => {
  const scrolled = useScroll(50);
  const router = useRouter();
  const { MenuModal, setShowMenuModal } = useMenuModal();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  const { data: session } = useSession()

  const returnBtn = (
    <button type="button" className="flex items-center justify-center hover:text-blue-500" onClick={() => router.back()}  title="goback">
      <FaChevronLeft />
    </button>
  );
  const logo = (
    <Link href="/" className="flex flex-wrap items-center justify-center gap-2 px-4 py-1 rounded-md hover:text-white/90 hover:bg-black dark:hover:text-black dark:hover:bg-white/90">
      <GoHomeFill />
      <Image
        src="/lordksix-logos_transparent.png"
        alt="lordksix logo"
        width="100"
        height="30"
        className="bg-black rounded-sm"
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

  const signInBtn = (
    <div>
    {session ? (
      <UserDropdown session={session} />
    ) : (
      <button
        className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
        onClick={() => setShowSignInModal(true)}
      >
        Sign In
      </button>
    )}
  </div>
  );

  return (
    <>
      <Suspense fallback={<LoadingData />}>
        <SignInModal />
        <MenuModal />      
        <header
          className={`fixed top-0 w-full flex justify-center px-4 sm:px-8 md:px-12 ${
            scrolled
              ? "border-b border-gray-600  dark:border-gray-200 bg-white/50 dark:bg-black/50 backdrop-blur-xl"
              : "bg-white/0 dark:bg-black/0"
          } z-30 transition-all`}
        >
          <div className="flex items-center justify-between w-full h-16 max-w-screen-xl">
              {returnBtn}
              {home && logo}
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                {signInBtn}
                {burgerBtnMenuModal}
              </div>
          </div>
        </header>
      </Suspense>
    </>
  );
}

export default HeaderData;