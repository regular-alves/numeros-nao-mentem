import dataSet from './DataSets/presidents.json';
import { getDateInterval, handleDateParams } from '../utils';

class Presidents {
  dataSet = [];
  rawData = [];

  constructor() {
    this.rawData = dataSet;
    this.dataSet = dataSet.series
      .map(z => ({
        ...z,
        start: new Date(`${z.start} 00:00:00`),
        startMonth: new Date(`${z.start.substring(0,7)}-01 00:00:00`),
        end: new Date(`${z.end} 00:00:00`),
        endMonth: new Date(`${z.end.substring(0,7)}-01 00:00:00`),
      }))
      .sort((a,b) => a.end - b.end);

    return this;
  }

  getPeriod(f, t, s = 1) {
    const [from, to] = handleDateParams(f, t);

    if ( f > t ) return [];

    return this.dataSet
      .filter(x => x.end >= from && x.start <= to)
      .sort((a, b) => (a.date - b.date) * s);
  }

  toPlotBands(f, t) {
    const dates = getDateInterval(f, t);

    return this.getPeriod(f, t).map(p => {
      let from = 0
      let to = dates.length;

      for(let i = 0; i < dates.length; i++) {
        const currentDate = `${dates[i].getFullYear()}-${dates[i].getMonth()}-${dates[i].getDate()}`;
        const startDate = `${p.startMonth.getFullYear()}-${p.startMonth.getMonth()}-${p.startMonth.getDate()}`;
        const endDate = `${p.endMonth.getFullYear()}-${p.endMonth.getMonth()}-${p.endMonth.getDate()}`;

        if(currentDate === startDate) {
          from = i;
        }

        if(currentDate === endDate) {
          to = i;
        }
      }

      return { ...p, from, to };
    });
  }
}

export default Presidents;