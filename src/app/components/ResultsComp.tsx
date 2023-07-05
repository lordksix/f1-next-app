import { getLastResultF1 } from "@/lib/getF1data";

const ResultsComp = async () => {
  const lastResult = await getLastResultF1();
  return (
    <div className="border-solid rounded border-2 px-6 py-8">
      <h3>Last <span className="hidden md:inline">Grand Prix</span> Results</h3>
      <div>
        <span className="hidden md:inline">
          Race name:
        </span>
        <span>&#32;{lastResult?.raceName}</span>
      </div>
      <ul>
        <li>Verstappen</li>
        <li>Leclerc</li>
        <li>Perez</li>
      </ul>
      <p>here comes a link</p>
    </div>
  )
}

export default ResultsComp