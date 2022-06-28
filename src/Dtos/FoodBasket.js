import dataSet from './DataSets/basic-basket.json';
import { getAvg } from '../utils';

class FoodBasket {
  dataSet = [];
  rawData = [];

  constructor() {
    this.rawData = dataSet;
    this.dataSet = dataSet.series
      .map(z => ({
        ...z,
        date: new Date(`${z.date} 00:00:00`)
      }))
      .sort((a,b) => a.date - b.date);

    return this;
  }

  getPeriodRegisters(f, t, s = 1) {
    const from = typeof f === Date ? f : new Date(f);
    const to = typeof t === Date ? t : new Date(t);

    if ( f > t ) return [];

    return this.dataSet
      .filter(x => x.date >= from && x.date <= to)
      .sort((a, b) => (a.date - b.date) * s);
  }

  getPeriod(f, t, s = 1) {
    const values = {};
    const registers = this.getPeriodRegisters(f, t, s);

    registers.map(v => {
      const index = v.date.getFullYear() + '-' +
        v.date.getMonth() + '-' +
        v.date.getDate();

      if(values[index] === undefined) {
        values[index] = {
          date: v.date,
          values: [],
        }
      }

      values[index].values.push(v.value);

      return v;
    });

    return Object.values(values)
      .map(yd => ({
        date: yd.date,
        value: getAvg(yd.values),
      }))
      .filter(v => !!v.value);
  }
}

export default FoodBasket;