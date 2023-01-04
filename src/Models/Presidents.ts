import dataSet from '../DataSets/presidents.json';
import Interval from '../Enums/Interval';
import DataCollection from './DataCollection';
import PresidentRegister from './PresidentRegister';

export default class Presidents extends DataCollection {
  constructor() {
    super(dataSet.series, dataSet.sources);
  }

  private timeTo(time: number, interval: Interval = 2): number {
    switch (interval) {
      case Interval.Daily:
        return time / 60 / 60 / 24;

      case Interval.Yearly:
        return time / 60 / 60 / 24 / 30 / 12;

      case Interval.Monthly:
      default:
        return time / 60 / 60 / 24 / 30;
    }
  }

  public getPlotBands(
    from: Date,
    to: Date,
    interval: Interval = 2,
  ): ReadonlyArray<IPlotBand> {
    const records = this.getRegisters(from, to, 1);
    const fromTime = from.getTime();
    const toTime = to.getTime();

    return records.map((record: PresidentRegister) => {
      let plotFrom = record.start.getTime();
      let plotTo = record.end.getTime();

      if (plotFrom < fromTime) {
        plotFrom = fromTime;
      }

      if (plotTo > toTime) {
        plotTo = toTime;
      }

      plotFrom -= fromTime;
      plotTo -= fromTime;

      return {
        label: {
          text: record.knownAs,
        },
        from: this.timeTo(plotFrom, interval),
        to: this.timeTo(plotTo, interval),
      };
    });
  }
}
