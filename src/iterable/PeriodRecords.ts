import Tuple from "./Tuple";
import Record from "../dtos/PeriodRecord";
import DateToString from "../utils/DateToString";

export default class PeriodRecords extends Tuple<Record> {
    constructor(protected values: Record[], protected maxDateRecord: Date | null | undefined = null) {
        super(values, maxDateRecord);

        if (values.filter((r: Record) => !r.end).length > 1) {
            throw new RangeError('Your dataset must not have more than one non-ended record')
        }
    }

    toSeries(): number[] {
        const recordSet: number[] = []
        
        this.values.forEach(record => {
            const current = new Date(record.start.getTime());
            const end = record?.end || this.maxDateRecord;
            
            while (end && current < end) {
                recordSet.push(record.value);
                current.setMonth(current.getMonth() + 1);
                current.setDate(1);
            }
        });

        return recordSet;
    }

    toCategories(): string[] {
        const recordSet: string[] = [];
        
        this.values.forEach(record => {
            const current = new Date(record.start.getTime());
            const end = record?.end || this.maxDateRecord;
            
            while (end && current < end) {
                recordSet.push(DateToString(current));
                current.setMonth(current.getMonth() + 1);
                current.setDate(1);
            }
        });

        return recordSet;
    }

    protected filter(record: Record, start: Date, end: Date): boolean {
        return (!record.end || (record.end && record.end >= start))
            && record.start < end;
    }

    get(start: Date, end: Date): PeriodRecords {
        return new PeriodRecords(
            this.values.filter(
              (record) => this.filter(record, start, end)
            ),
            end
        );
    }

    all(): PeriodRecords {
        return new PeriodRecords(this.values, new Date());
    }
}