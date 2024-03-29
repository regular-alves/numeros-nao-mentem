import dataSet from './DataSets/presidents.json';
import {
  getDateInterval,
  handleDateParams,
  getColors,
  getMinDate,
  getMaxDate,
} from '../utils';

class Presidents {
  dataSet = [];

  rawData = [];

  constructor() {
    this.rawData = dataSet;
    this.dataSet = dataSet.series
      .map((z) => ({
        ...z,
        start: new Date(z.start),
        startMonth: new Date(`${z.start.substring(0, 7)}-01 00:00:00-03:00`),
        end: new Date(z.end),
        endMonth: new Date(`${z.end.substring(0, 7)}-01 00:00:00-03:00`),
      }))
      .sort((a, b) => a.end - b.end);
  }

  getPeriod(f, t, s = 1) {
    const [from, to] = handleDateParams([f, t]);

    if (f > t) return [];

    return this.dataSet
      .filter((x) => x.end >= from && x.start < to)
      .sort((a, b) => (a.date - b.date) * s);
  }

  toPlotBands(f, t) {
    const dates = getDateInterval(f, t);
    const colors = getColors();

    return this.getPeriod(f, t).map((p, i) => {
      let from = 0;
      let to = dates.length;

      for (let j = 0; j < dates.length; j += 1) {
        const currentDate =
          `${dates[j].getFullYear()}-` +
          `${dates[j].getMonth() + 1}-` +
          `${dates[j].getDate()}`;

        const startDate =
          `${p.startMonth.getFullYear()}-` +
          `${p.startMonth.getMonth() + 1}-` +
          `${p.startMonth.getDate()}`;

        const endDate =
          `${p.endMonth.getFullYear()}-` +
          `${p.endMonth.getMonth() + 1}-` +
          `${p.endMonth.getDate()}`;

        if (currentDate === startDate) {
          from = j;
        }

        if (currentDate === endDate) {
          to = j;
        }
      }

      return {
        label: {
          text: p.name,
          align: 'left',
          y: 15,
          x: 5,
          rotation: 45,
        },
        from,
        to,
        color: `#${colors[i]}af`,
      };
    });
  }

  getMinDataDate() {
    return getMinDate(this.dataSet.map((item) => item.endMonth));
  }

  getMaxDataDate() {
    return getMaxDate(this.dataSet.map((item) => item.endMonth));
  }

  getBySlug(slug) {
    return this.dataSet.filter((p) => p.slug === slug).shift();
  }

  getSources() {
    return this.rawData.sources;
  }

  getRegisters() {
    return this.dataSet;
  }
}

export default Presidents;
