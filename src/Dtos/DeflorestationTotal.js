import dataSet from './DataSets/deplorestation.json';
import { getAvg, handleDateParams } from '../utils';

class DeflorestationTotal {
  dataSet = [];

  rawData = [];

  constructor() {
    this.rawData = dataSet;
    this.dataSet = dataSet.series.total.sort((a, b) => a.year - b.year);
  }

  getPeriod(f, t, s = 1) {
    const [from, to] = handleDateParams([f, t]);

    if (f > t) return [];

    return this.dataSet
      .filter((x) => x.year >= from.getFullYear() && x.year < to.getFullYear())
      .sort((a, b) => (a.year - b.year) * s);
  }

  getYear(y) {
    return this.dataSet.filter((x) => x.year === y).shift();
  }

  getYearValue(y) {
    const register = this.getYear(y);

    if (!register) return;

    // eslint-disable-next-line consistent-return
    return register.amount || 0;
  }

  getPeriodValues(f, t, s) {
    return this.getPeriod(f, t, s).map((y) => y.amount);
  }

  getPeriodSeries(f, t) {
    const [from, to] = handleDateParams([f, t]);
    const series = [];

    const current = from;

    while (current <= to) {
      series.push(this.getYearValue(current.getFullYear()) || 0);
      current.setMonth(current.getMonth() + 1);
    }

    return series;
  }

  getPeriodAverage(f, t) {
    const v = this.getPeriodValues(f, t);

    return getAvg(v);
  }

  getSources() {
    return this.rawData.sources;
  }

  getMinDataDate() {
    return this.dataSet
      .sort((a, b) => a - b)
      .map((item) => new Date(`${item.year}-01-01`))
      .shift();
  }

  getMaxDataDate() {
    return this.dataSet
      .sort((a, b) => a - b)
      .map((item) => new Date(`${item.year}-12-31`))
      .pop();
  }
}

export default DeflorestationTotal;
