import Record from "./Record";

export type MonthRegisterProps = {
  date: string,
  value: number,
}

export default class MonthRecord extends Record {
  readonly date: Date;

  constructor(value: number, date: Date) {
      super(value);

      this.date = date;
  }
}