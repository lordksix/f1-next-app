
export const getDriverF1 = async (driverId: string): Promise<Driver[] | undefined> => {
  const DRIVER_ENDPOINT = `http://ergast.com/api/f1/drivers/${driverId}.json`;
  const res = await fetch(DRIVER_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const driverF1: Driver[] = MRData.DriverTable.Drivers;

  return driverF1;
};

export const getLastResultF1 = async (): Promise<ResultGPF1[] | undefined> => {
  const LASTEST_RESULT_ENDPOINT = 'http://ergast.com/api/f1/current/last/results.json';
  const res = await fetch(LASTEST_RESULT_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: ResultGPF1[] = MRData.RaceTable.Races;

  return lastestResult;
};

export const getRaceResultF1 = async (raceId: string): Promise<ResultGPF1[] | undefined> => {
  const LASTEST_RESULT_ENDPOINT = `http://ergast.com/api/f1/${raceId}/results.json`;
  const res = await fetch(LASTEST_RESULT_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: ResultGPF1[] = MRData.RaceTable.Races;

  return lastestResult;
};

export const getNextRaceF1 = async (): Promise<RaceGPF1[] | undefined>  => {
  const LASTEST_RESULT_ENDPOINT = 'https://ergast.com/api/f1/current/next.json';
  const res = await fetch(LASTEST_RESULT_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: RaceGPF1[] = MRData.RaceTable.Races;

  return lastestResult;
};