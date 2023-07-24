import CalendarComp from '../components/home/CalendarComp';
import LastResultsComp from '../components/home/LastResultsComp';
import DriverStandingComp from '@/components/home/DriverStandingComp';
import ConstructorStandingComp from '@/components/home/ConstructorStandingComp';
import TwitterComp from '@/components/shared/twitterComp';
import Video from '@/components/shared/Video';
import Posts from '@/components/home/Posts';
import Image from 'next/image';
import HeaderNav from '@/components/layout/HeaderNav';
import { f1tffBold, f1tffWide } from './fonts';

export const revalidate = 86400;

const Home = () => {
  const startPage = (
    <section className="w-full mt-24 mb-8">
      <div
        className="flex gap-4 flex-wrap items-center justify-center animate-fade-up bg-gradient-to-br text-center text-lg sm:text-xl md:text-2xl lg:text-3xl from-stone-500 to-red-700 dark:from-white dark:to-blue-400 bg-clip-text font-bold text-transparent tracking-[-0.02em] opacity-0 drop-shadow-sm"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <span className={f1tffBold.variable}>Welcome to</span>
        <Image
          src="/lordksix-logos_transparent.png"
          alt="lordksix logo"
          width="100"
          height="30"
          className="bg-black rounded-sm dark:bg-transparent"
        ></Image>
      </div>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <h1
        className={`${f1tffWide.variable} duration-1000 align-middle animate-title bg-gradient-to-br from-black to-stone-500 dark:from-white dark:to-stone-500 bg-clip-text text-center font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:leading-[5rem]`}
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
      F1mania
      </h1>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
    </section>
  );
  return (
    <>
      <HeaderNav home={false} />
      {startPage}
      <main className="flex flex-col items-center justify-start w-full max-w-6xl min-h-screen gap-10 py-6 mx-auto no-scrollbar">
        <section
          className="flex flex-col justify-between w-10/12 h-full max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 animate-fade-up"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Video id={process.env.HOME_YOUTUBE_ID ?? ''}/>
          <Posts />
        </section>
        <section
          className="flex flex-col justify-between w-10/12 h-full max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 animate-fade-up"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <LastResultsComp />
          <TwitterComp />
        </section>
        <section 
          className="flex flex-col justify-between w-10/12 max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 animate-fade-up"
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