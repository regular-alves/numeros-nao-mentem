import Collection from "./Collection";
import { Source } from "./Sources";
import PeriodRecord, { PeriodRegisterProps } from "../dtos/PeriodRecord";
import IterablePeriodRecords from "../iterable/PeriodRecords";

export default class PeriodRecords extends Collection<PeriodRecord> {
    constructor(sources: Source[], records: PeriodRegisterProps[]) {
        super(sources);

        this.records = records
            .map((record) => (
                new PeriodRecord(
                    record.value,
                    new Date(record.start),
                    record.end ? new Date(record.end) : undefined,
                )
            ))
            .sort((recA, recB) => recA.start.getTime() - recB.start.getTime());

        if (this.records.filter((rec) => !rec.end).length > 1) {
            throw new RangeError('Your dataset must not have more than one non-ended record')
        }
    }

    private filterRecord(record: PeriodRecord, start: Date, end: Date): boolean {
        return (!record.end || (record.end && record.end >= start))
            && record.start < end;
    }

    public get(start: Date, end: Date): IterablePeriodRecords {
        return new IterablePeriodRecords(
            this.records.filter(
              (record) => this.filterRecord(record, start, end)
            ),
            end
        );
    }

    all(): IterablePeriodRecords {
        return new IterablePeriodRecords(this.records, new Date());
    }
}

