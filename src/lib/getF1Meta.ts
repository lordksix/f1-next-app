export async function getRacesF1StaticParams(): Promise<MetaRaceResult[] | undefined> {
  const SEASON_ENDPOINT = 'http://ergast.com/api/f1/seasons.json';
  const res = await fetch(SEASON_ENDPOINT);
  if (!res.ok) return undefined;
  const racesF1: MetaRaceResult[] = []
  const seasonsResponse = await res.json();
  const seasonsF1: (SeasonResponseType[] | undefined) = seasonsResponse.MRData?.SeasonTable?.Seasons;
  if(!seasonsF1 || seasonsF1.length === 0) return undefined;
  seasonsF1.forEach((season) => {
    for (let index = 1; index < 26; index++) {
      racesF1.push({ yearid: season.season, raceid: index.toString() })   
    }
  });
  return racesF1;
}