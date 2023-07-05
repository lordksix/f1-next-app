type DriverComplete = {
  id: number,
  name: string,
  image: string,
  date: string,
  country: {
    name: string,
    code: string,
  }
  birthday: string,
  birthplace: string,
  number: number,
  grands_prix_entered: number,
  world_championships: number,
  podiums: number,
  highest_race_finish: {
    position: number,
    number: number,
    },
  highest_grid_position: number,
  career_points: number,
  teams: TeamYear[],
}

type Driver = {
  driverId: string,
  permanentNumber?: string,
  code: string,
  url: string,
  givenName: string,
  familyName: string,
  dateOfBirth: string,
  nationality: string,
}

type ConstructorF1 = {
  constructorId: string,
  url: string,
  name: string,
  nationality: string,
}

type CircuitGP = {
  circuitId: string,
  url: string,
  circuitName: string,
  location: {
    lat: string,
    long: string,
    locality: string,
    country: string,
  }
}

type StandingF1 = {
  position: string,
  positionText: string,
  points: string,
  wins: string,
  Driver: {
    driverId: string,
    permanentNumber: string,
    code: string,
    url: string,
    givenName: string,
    familyName: string,
    dateOfBirth: string,
    nationality: string,
  },
  Constructors: ConstructorF1[],
}

type ResultRaceDriverF1 = {
    number: string,
    position: string,
    positionText: string,
    points: string,
    Driver: Driver,
    Constructor: ConstructorF1,
    grid: string,
    laps: string,
    status: string,
    Time: {
        millis: string,
        time: string,
    },
    FastestLap: {
        rank: string,
        lap: string,
        Time: {
            time: string,
        },
        AverageSpeed: {
            units: string,
            speed: string,
        }
    }
}

type ResultGPF1 = {
  season: string,
  round: string,
  url: string,
  raceName: string,
  Circuit: CircuitGP,
  date: string,
  time: string,
  Results: ResultRaceDriverF1[],
}

type UserState = {
  authState: boolean,
  name: string,
}

type preLoadedStateType = {
  user: {
    authState: boolean,
    name: string,
  }
}