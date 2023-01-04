import IRecord from '../Interfaces/IRecord';

export default class Record {
  constructor(
    public readonly value: number | null = null,
    protected _start: Date | null = null,
    protected _end: Date | null = null,
  ) {
    this.value = value;
    this._start = _start;
    this._end = _end;
  }

  get start(): Date | null {
    return this._start;
  }

  get end(): Date | null {
    return this._end;
  }

  public isBetween(from: Date, to: Date): boolean {
    if (!this.start && !this.end) {
      return false;
    }

    return (
      this.end.getTime() >= from.getTime() &&
      this.start.getTime() <= to.getTime()
    );
  }

  public static getFrom(props: IRecord): Record {
    return new Record(
      props.value,
      props.start ? new Date(props.start.replace(/-/g, ',')) : null,
      props.end ? new Date(props.end.replace(/-/g, ',')) : null,
    );
  }
}
