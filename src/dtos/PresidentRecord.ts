import NonValuedPeriodRecord from "./NonValuedPeriodRecord";

export type PresidentRecordProps = {
  name: string;
  knownAs: string;
  slug: string;
  start: Date;
  end: Date;
}

export default class PresidentRecord extends NonValuedPeriodRecord {
  constructor(
    readonly name: string,
    readonly knownAs: string,
    readonly slug: string,
    start: Date, 
    end: Date
  ) {
    super(start, end);
  }
}