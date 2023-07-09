import getFormattedDate from './getFormattedDate';

const eventSelector = (raceGP: RaceGPF1): EventRace => {
  const firstEvt: string = 'First Practice';
  const firstEvtTime: string = raceGP?.FirstPractice ? getFormattedDate(`${raceGP.FirstPractice.date} ${raceGP.FirstPractice.time}`) : 'No info';
  let secondEvt: string;
  let secondEvtTime: string;
  let thirdEvt: string;
  let thirdEvtTime: string;
  let forthEvt: string;
  let forthEvtTime: string;

  if(raceGP.Sprint){
    secondEvt = 'Qualifying';
    secondEvtTime = raceGP?.Qualifying?.time ? getFormattedDate(`${raceGP.Qualifying.date} ${raceGP.Qualifying.time}`) : 'No info';
    thirdEvt = 'Second Practice';
    thirdEvtTime = raceGP?.SecondPractice?.time ? getFormattedDate(`${raceGP.SecondPractice.date} ${raceGP.SecondPractice.time}`) : 'No info';
    forthEvt = 'Sprint';
    forthEvtTime = getFormattedDate(`${raceGP.Sprint.date} ${raceGP.Sprint.time}`);
  } else {
    secondEvt = 'Second Practice';
    secondEvtTime = raceGP?.SecondPractice?.time ? getFormattedDate(`${raceGP.SecondPractice.date} ${raceGP.SecondPractice.time}`) : 'No info';
    thirdEvt = 'Third Practice';
    thirdEvtTime = raceGP?.ThirdPractice?.time ? getFormattedDate(`${raceGP.ThirdPractice.date} ${raceGP.ThirdPractice.time}`) : 'No info';
    forthEvt = 'Qualifying';
    forthEvtTime = raceGP?.Qualifying?.time ? getFormattedDate(`${raceGP.Qualifying.date} ${raceGP.Qualifying.time}`) : 'No info';
  };
  return {
    firstEvt,
    firstEvtTime,
    secondEvt,
    secondEvtTime,
    thirdEvt,
    thirdEvtTime,
    forthEvt,
    forthEvtTime,
  };
};

export default eventSelector;