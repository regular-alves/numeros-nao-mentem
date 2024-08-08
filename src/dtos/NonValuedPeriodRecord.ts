export type NonValuedPeriodRegisterProps = {
  start: string,
  end?: string,
}

export default class NonValuedPeriodRecord {
  readonly start: Date;
  readonly end?: Date;

  constructor(start: Date, end: Date | null | undefined = null) {
      this.start = start;

      if (end) {
        this.end = end;
      }
  }
}