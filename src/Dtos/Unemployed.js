import dataSet from './DataSets/unemployed.json';
import { getAvg, getMaxDate, getMinDate, handleDateParams } from '../utils';

class Unemployed {
  dataSet = [];

  rawData = [];

  constructor() {
    this.rawData = dataSet;
    this.dataSet = dataSet.data
      .map((z) => ({
        ...z,
        start: new Date(z.start),
        end: new Date(z.end),
      }))
      .sort((a, b) => a.start - b.start);
  }

  getPeriod(f, t, s = 1) {
    const [from, to] = handleDateParams([f, t]);

    if (f > t) return [];

    return this.dataSet
      .filter((x) => x.end >= from && x.start <= to)
      .sort((a, b) => (a.start - b.start) * s);
  }

  getPeriodValues(f, t, s) {
    return this.getPeriod(f, t, s).map((y) => y.value);
  }

  getPeriodSeries(f, t) {
    const series = [];
    const [from, to] = handleDateParams([f, t]);

    const current = from;

    while (current <= to) {
      series.push(this.getDateValue(current));
      current.setMonth(current.getMonth() + 1);
    }

    return series;
  }

  getPeriodAverage(f, t) {
    const v = this.getPeriod(f, t);

    return getAvg(v);
  }

  getDateValue(d) {
    const from = d;
    const to = new Date(d.getFullYear(), d.getMonth() + 1, -1, 23, 59, 59);
    const values = this.getPeriodValues(from, to, -1);

    if (!values) return null;

    return values[0] || 0;
  }

  getMinDataDate() {
    return getMinDate(this.dataSet.map((item) => item.start));
  }

  getMaxDataDate() {
    return getMaxDate(this.dataSet.map((item) => item.end));
  }

  getSources() {
    return this.rawData.sources;
  }
}

export default Unemployed;
