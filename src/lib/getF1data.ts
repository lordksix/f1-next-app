
export const getDriverF1 = async (driverId: string) => {
  const DRIVER_ENDPOINT = `http://ergast.com/api/f1/drivers/${driverId}.json`;
  const res = await fetch(DRIVER_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const driverF1: Driver = MRData.DriverTable.Drivers[0];

  return driverF1;
};

export const getLastResultF1 = async () => {
  const LASTEST_RESULT_ENDPOINT = 'http://ergast.com/api/f1/current/last/results.json';
  const res = await fetch(LASTEST_RESULT_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: ResultGPF1 = MRData.RaceTable.Races[0];

  return lastestResult;
};