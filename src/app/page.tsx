import CalendarComp from '../components/home/CalendarComp';
import LastResultsComp from '../components/home/LastResultsComp';
import DriverStandingComp from '@/components/home/DriverStandingComp';
import ConstructorStandingComp from '@/components/home/ConstructorStandingComp';
import TwitterComp from '@/components/shared/twitterComp';
import Video from '@/components/shared/Video';

const Home = () => {
  const startPage = (
    <section>
      <p
        className="animate-fade-up bg-gradient-to-br text-center text-lg sm:text-xl md:text-2xl lg:text-3xl from-stone-500 to-red-700 dark:from-white dark:to-blue-400 bg-clip-text font-bold text-transparent tracking-[-0.02em] opacity-0 drop-shadow-sm"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Welcome to
      </p>
      <h1
      className="animate-fade-up bg-gradient-to-br from-black to-stone-500 dark:from-white dark:to-stone-500 bg-clip-text text-center font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:leading-[5rem]"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
      F1mania
    </h1>
    </section>
  );
  return (
    <main className="flex flex-col items-center justify-start w-full max-w-6xl min-h-screen gap-6 py-24 mx-auto md:gap-10 no-scrollbar">
      {startPage}
      <div className="w-10/12 max-w-lg">
        <Video id="ZokxibXdiSY"/>
      </div>
      <section className="flex flex-col justify-between w-10/12 h-full max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 md:gap-10">
        <LastResultsComp />
        <TwitterComp />
      </section>
      <section className="flex flex-col justify-between w-10/12 max-w-5xl gap-6 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 md:gap-10">
        <DriverStandingComp />
        <ConstructorStandingComp />
      </section>
      <section className="flex justify-center w-10/12 max-w-5xl md:w-9/12 no-scrollbar lg:w-10/12">
        <CalendarComp />
      </section>
      
    </main>
  );
}

export default Home;