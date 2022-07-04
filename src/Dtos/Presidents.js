import dataSet from './DataSets/presidents.json';
import {
  getDateInterval,
  handleDateParams,
  getColors,
  getMinDate,
  getMaxDate 
} from '../utils';

class Presidents {
  dataSet = [];
  rawData = [];

  constructor() {
    this.rawData = dataSet;
    this.dataSet = dataSet.series
      .map(z => ({
        ...z,
        start: new Date(z.start),
        startMonth: new Date(`${z.start.substring(0,7)}-01 00:00:00`),
        end: new Date(z.end),
        endMonth: new Date(`${z.end.substring(0,7)}-01 00:00:00`),
      }))
      .sort((a,b) => a.end - b.end);

    return this;
  }

  getPeriod(f, t, s = 1) {
    const [from, to] = handleDateParams([f, t]);

    if ( f > t ) return [];

    return this.dataSet
      .filter(x => x.end >= from && x.start < to)
      .sort((a, b) => (a.date - b.date) * s);
  }

  toPlotBands(f, t) {
    const dates = getDateInterval(f, t);
    const colors = getColors();

    return this.getPeriod(f, t).map((p, i) => {
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

      return {
        label: { 
          text: p.name,
          align: 'bottom',
        },
        from,
        to,
        color: `#${colors[i]}af`
      };
    });
  }

  getMinDataDate() {
    return getMinDate(
      this.dataSet
        .map(item => item.endMonth)
    );
  }

  getMaxDataDate() {
    return getMaxDate(
      this.dataSet
        .map(item => item.endMonth)
    );
  }

  getBySlug(slug) {
    return this.dataSet
      .filter(p => p.slug===slug)
      .shift();
  }

  getSources() {
    return this.rawData.sources;
  }
}

export default Presidents;