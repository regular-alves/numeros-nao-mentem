import Record from "./Record";

export type PeriodRegisterProps = {
  start: string,
  end?: string,
  value: number,
}

export default class PeriodRecord extends Record {
  readonly start: Date;
  readonly end?: Date;

  constructor(value: number, start: Date, end: Date | null | undefined = null) {
      super(value);

      this.start = start;

      if (end) {
        this.end = end;
      }
  }
}