import Collection from "./Collection";
import { Source } from "./Sources";
import IterableMonthRecords from "../iterable/MonthRecords";
import MonthRecord, { MonthRegisterProps } from "../dtos/MonthRecord";

export default class MonthRecords extends Collection<MonthRecord> {
    constructor(sources: Source[], records: MonthRegisterProps[]) {
        super(sources);

        this.records = records
            .map((record) => (
                new MonthRecord(
                    record.value,
                    new Date(record.date)
                )
            ))
            .sort((recA, recB) => recA.date.getTime() - recB.date.getTime());
    }

    private filterRecord(record: MonthRecord, start: Date, end: Date): boolean {
        return record.date >= start && record.date < end;
    }

    public get(start: Date, end: Date): IterableMonthRecords {
        return new IterableMonthRecords(
            this.records.filter(
              (record) => this.filterRecord(record, start, end)
            ),
        );
    }

    all(): IterableMonthRecords {
        return new IterableMonthRecords(this.records, new Date());
    }
}

