import MonthRecord from "./MonthRecord";

export type FoodByStateRecordProps = {
  city: string;
  state: string;
  value: number;
  date: string;
}

export default class FoodByStateRecord extends MonthRecord {
  constructor(
    public city: string,
    public state: string,
    value: number,
    date: Date
  ) {
    super(value, date);
  }
}