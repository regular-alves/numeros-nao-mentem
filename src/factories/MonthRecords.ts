import Collection from "./Collection";
import MonthRecord, { MonthRegisterProps } from "../dtos/MonthRecord";
import Source from "../dtos/Source";
import Iterable from "../iterable/MonthRecords";

export default class MonthRecords extends Collection<MonthRecord> {
    constructor(sources: Source[], records: MonthRegisterProps[]) {
        const values = records
            .map((record) => (
                new MonthRecord(
                    record.value,
                    new Date(record.date)
                )
            ))
            .sort((a, b) => a.date.getTime() - b.date.getTime());

        super(sources, values);
    }

    getRecords(): Iterable {
        return new Iterable(this.records);
    }
}

