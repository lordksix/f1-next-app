import CalendarComp from '../components/home/CalendarComp';
import LastResultsComp from '../components/home/LastResultsComp';
import DriverStandingComp from '@/components/home/DriverStandingComp';
import ConstructorStandingComp from '@/components/home/ConstructorStandingComp';
import TwitterComp from '@/components/shared/twitterComp';
import Video from '@/components/shared/Video';
import Posts from '@/components/home/Posts';
import Image from 'next/image';
import { Suspense } from 'react';
import LoadingData from '@/components/shared/loadingData';
import HeaderNav from '@/components/layout/HeaderNav';

export const revalidate = 86400;

const Home = () => {
  const startPage = (
    <section className="w-full">
      <div
        className="flex gap-4 flex-wrap items-center justify-center animate-fade-up bg-gradient-to-br text-center text-lg sm:text-xl md:text-2xl lg:text-3xl from-stone-500 to-red-700 dark:from-white dark:to-blue-400 bg-clip-text font-bold text-transparent tracking-[-0.02em] opacity-0 drop-shadow-sm"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Welcome to
        <Image
          src="/lordksix-logos_transparent.png"
          alt="lordksix logo"
          width="100"
          height="30"
          className="bg-black rounded-sm dark:bg-transparent"
        ></Image>
      </div>
      <h1
      className="animate-fade-up bg-gradient-to-br from-black to-stone-500 dark:from-white dark:to-stone-500 bg-clip-text text-center font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:leading-[5rem]"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
      F1mania
    </h1>
    </section>
  );
  return (
    <>
      <HeaderNav home={false} />
      <main className="flex flex-col items-center justify-start w-full max-w-6xl min-h-screen gap-6 py-24 mx-auto md:gap-10 no-scrollbar">
        {startPage}
        <section
          className="flex flex-col justify-between w-10/12 h-full max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 md:gap-10 animate-fade-up"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Video id={process.env.HOME_YOUTUBE_ID ?? ''}/>
          <Posts />
        </section>
        <section
          className="flex flex-col justify-between w-10/12 h-full max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 md:gap-10 animate-fade-up"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <LastResultsComp />
          <Suspense fallback={<LoadingData />}>
            <TwitterComp />
          </Suspense>
        </section>
        <section 
          className="flex flex-col justify-between w-10/12 max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 md:gap-10 animate-fade-up"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <DriverStandingComp />
          <ConstructorStandingComp />
        </section>
        <section
          className="flex justify-center w-10/12 max-w-5xl md:w-9/12 no-scrollbar lg:w-10/12 animate-fade-up"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <CalendarComp />
        </section>
    </main>
    </>
  );
}

export default Home;