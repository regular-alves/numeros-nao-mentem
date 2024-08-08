import Collection from "./Collection";
import PeriodRecord, { PeriodRegisterProps } from "../dtos/PeriodRecord";
import { Source } from "../dtos/Source";
import Iterable from "../iterable/PeriodRecords";

export default class PeriodRecords extends Collection<PeriodRecord> {
    constructor(sources: Source[], values: PeriodRegisterProps[]) {
        const records = values.map(
            (r) => new PeriodRecord(
                r.value,
                new Date(r.start),
                r?.end ? new Date(r.end) : null
            )
        )
        .sort((a, b) => a.start.getTime() - b.start.getTime());

        super(sources, records);
    }

    getRecords(): Iterable {
        return new Iterable(this.records);
    }
}

