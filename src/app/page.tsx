import NextRaceComp from "../components/home/NextRaceComp";
import LastResultsComp from "../components/home/LastResultsComp";
import { getRaceResultF1, getRaceF1, getDriverStandingF1, getConstructorStandingF1 } from "@/lib/getF1data";
import DriverStandingComp from "@/components/home/DriverStandingComp";
import ConstructorStandingComp from "@/components/home/ConstructorStandingComp";

const Home = async () => {
  const lastResult = await getRaceResultF1('current/last');
  const nextRace = await getRaceF1('current/next');
  const currentDriverStanding = await getDriverStandingF1('current');
  const currentConstructorStanding = await getConstructorStandingF1('current');
  const startPage = (
    <section>
      <p
        className="animate-fade-up bg-gradient-to-br text-center text-base xs:text-lg sm:text-xl md:text-2xl from-stone-500 to-red-700 dark:from-white dark:to-blue-400 bg-clip-text font-bold text-transparent tracking-[-0.02em] opacity-0 drop-shadow-sm"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Welcome to
      </p>
      <h1
      className="animate-fade-up bg-gradient-to-br from-black to-stone-500 dark:from-white dark:to-stone-500 bg-clip-text text-center font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:leading-[5rem]"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
      F1mania
    </h1>
    </section>
  );
  return (
    <main className="flex flex-col items-center justify-start min-h-screen gap-6 py-24 md:gap-10 no-scrollbar">
      {startPage}
      <section className="flex flex-col justify-between w-10/12 max-w-5xl gap-2 md:gap-4 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 lg:gap-10">
        <LastResultsComp results={lastResult}/>
        <NextRaceComp races={nextRace}/>
      </section>
      <section className="flex flex-col justify-between w-10/12 max-w-5xl gap-2 md:gap-4 md:w-9/12 no-scrollbar lg:grid lg:w-10/12 lg:grid-cols-2 lg:gap-10">
        <DriverStandingComp results={currentDriverStanding}/>
        <ConstructorStandingComp results={currentConstructorStanding}/>
      </section>
    </main>
  );
}

export default Home;