import { PeriodRecords as IterablePeriodRecords } from "@naoMentem/iterable/PeriodRecords";
import Collection, { Record } from "@naoMentem/factories/Collection";
import { Source } from "@naoMentem/factories/Sources";
import PeriodRecord, { PeriodRegisterProps } from "@naoMentem/dtos/PeriodRecord";

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

        console.log(this.records);
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

