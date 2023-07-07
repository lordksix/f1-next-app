import NextRaceComp from "../components/NextRaceComp";
import LastResultsComp from "../components/LastResultsComp";
import { getRaceResultF1, getRaceF1 } from "@/lib/getF1data";

const Home = async () => {
  const lastResult = await getRaceResultF1('current/last');
  const nextRace = await getRaceF1('current/next');
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
    <main className="flex flex-col items-center justify-start min-h-screen gap-6 p-24 no-scrollbar">
      {startPage}
      <section className="flex flex-col justify-between gap-4 no-scrollbar lg:grid lg:w-full lg:grid-cols-2 2xl:grid-cols-1 2xl:w-9/12">
        <LastResultsComp results={lastResult}/>
        <NextRaceComp races={nextRace}/>
      </section>
    </main>
  );
}

export default Home;