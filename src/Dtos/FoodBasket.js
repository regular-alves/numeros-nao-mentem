import dataSet from '../DataSets/basic-basket-average.json';
import { getMinDate, getMaxDate, handleDateParams } from '../utils';

class FoodBasket {
  dataSet = [];

  rawData = [];

  constructor() {
    this.rawData = dataSet;
    this.dataSet = dataSet.series
      .map((z) => ({
        ...z,
        date: new Date(z.date),
      }))
      .sort((a, b) => a.date - b.date);
  }

  getPeriod(f, t, s = 1) {
    const [from, to] = handleDateParams([f, t]);

    if (f > t) return [];

    return this.dataSet
      .filter((register) => register.date >= from && register.date <= to)
      .sort((a, b) => (a.date - b.date) * s);
  }

  getPeriodValues(f, t) {
    const [from, to] = handleDateParams([f, t]);

    return this.getPeriod(from, to).map((v) => v.value);
  }

  getMinDataDate() {
    return getMinDate(this.dataSet.map((item) => item.date));
  }

  getMaxDataDate() {
    return getMaxDate(this.dataSet.map((item) => item.date));
  }

  getSources() {
    return this.rawData.sources;
  }
}

export default FoodBasket;
