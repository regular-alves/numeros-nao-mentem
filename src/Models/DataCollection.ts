import IRecord from '../Interfaces/IRecord';
import ISource from '../Interfaces/ISource';
import Interval from '../Enums/Interval';
import Source from './Source';
import Record from './Record';

export default abstract class DataCollection {
  protected dataSet: Array<Record> = [];

  protected _sources: Array<Source> = [];

  constructor(dataSet: Array<IRecord>, sources?: Array<ISource>) {
    this.fill(dataSet, sources);
  }

  get oldest(): Date | null {
    const list = this.list();

    if (!list) {
      return null;
    }

    return [...list].shift().end;
  }

  get mostRecent(): Date | null {
    const list = this.list();

    if (!list) {
      return null;
    }

    return [...list].pop().start;
  }

  get sources(): ReadonlyArray<Source> {
    return this._sources;
  }

  public getPeriod(
    from: Date,
    to: Date,
    interval: Interval = 2,
  ): ReadonlyArray<Record> {
    const current = new Date(from.getTime());
    const dataSet: Record[] = [];

    while (current < to) {
      const loopStart = new Date(current.getFullYear(), current.getMonth(), 1);
      const loopEnd = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        -1,
      );

      const dateRegister = this.dataSet
        .filter((item) => item.isBetween(loopStart, loopEnd))
        .pop();

      const register = new Record(dateRegister?.value || 0, loopStart, loopEnd);

      dataSet.push(register);

      switch (interval) {
        case Interval.Daily:
          current.setDate(current.getDate() + 1);
          break;

        case Interval.Monthly:
          current.setMonth(current.getMonth() + 1);
          break;

        case Interval.Yearly:
        default:
          current.setFullYear(current.getFullYear() + 1);
          break;
      }
    }

    return dataSet;
  }

  public getRegisters(
    from: Date,
    to: Date,
    sort: number,
  ): ReadonlyArray<Record> {
    return this.dataSet.filter((item) => item.isBetween(from, to));
  }

  protected append(item: Record): void {
    this.dataSet.push(item);
  }

  protected list(): ReadonlyArray<Record> {
    return this.dataSet;
  }

  protected fill(items: Array<IRecord>, sources?: Array<ISource>): void {
    items.map((item) => {
      this.dataSet.push(Record.getFrom(item));

      return item;
    });

    this.dataSet = this.dataSet.sort((a, b) => {
      if (!a.end || !b.end) {
        return 1;
      }

      return a.end.getTime() - b.end.getTime();
    });

    this._sources = sources ? sources.map((item) => Source.from(item)) : [];
  }
}
