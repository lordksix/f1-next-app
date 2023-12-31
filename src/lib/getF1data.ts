
export const getDriverF1 = async (driverId: string): Promise<Driver[] | undefined> => {
  const DRIVER_ENDPOINT = `http://ergast.com/api/f1/drivers/${driverId}.json`;
  const res = await fetch(DRIVER_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const driverF1: Driver[] = MRData.DriverTable.Drivers;

  return driverF1;
};

export const getRaceResultF1 = async (raceId: string): Promise<ResultGPF1[] | undefined> => {
  const RESULT_ENDPOINT = `http://ergast.com/api/f1/${raceId}/results.json?limit=100`;
  const res = await fetch(RESULT_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: ResultGPF1[] = MRData.RaceTable.Races;

  return lastestResult;
};

export const getRaceF1 = async (raceId: string): Promise<RaceGPF1[] | undefined>  => {
  const RACE_ENDPOINT = `https://ergast.com/api/f1/${raceId}.json?limit=100`;
  const res = await fetch(RACE_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: RaceGPF1[] = MRData.RaceTable.Races;

  return lastestResult;
};


export const getSeasonF1 = async (): Promise<SeasonResponseType[] | undefined>  => {
  const SEASONS_ENDPOINT = `https://ergast.com/api/f1/seasons.json?limit=100`;
  const res = await fetch(SEASONS_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  
  const lastestResult: SeasonResponseType[] = MRData?.SeasonTable?.Seasons;

  return lastestResult;
};

export const getDriverStandingF1 = async (yearId: string): Promise<DriverStadingList[] | undefined>  => {
  const DRIVER_STANDING_ENDPOINT = `https://ergast.com/api/f1/${yearId}/driverStandings.json?limit=100`;
  const res = await fetch(DRIVER_STANDING_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: DriverStadingList[] = MRData.StandingsTable.StandingsLists;

  return lastestResult;
};

export const getConstructorStandingF1 = async (yearId: string): Promise<ConstructorStadingList[] | undefined>  => {
  const DRIVER_STANDING_ENDPOINT = `https://ergast.com/api/f1/${yearId}/constructorStandings.json`;
  const res = await fetch(DRIVER_STANDING_ENDPOINT);

  if (!res.ok) return undefined;

  const { MRData } = await res.json();
  const lastestResult: ConstructorStadingList[] = MRData.StandingsTable.StandingsLists;

  return lastestResult;
};