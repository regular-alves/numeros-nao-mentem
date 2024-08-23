import MonthRecord from "../dtos/MonthRecord";
import DateToString from "../utils/DateToString";
import Tuple from "./Tuple";

export default class MonthRecords extends Tuple<MonthRecord> {
    toSeries(): number[] {
        const recordSet: number[] = []
        
        this.values.forEach(record => {           
            recordSet.push(record.value);
        });

        return recordSet;
    }

    toCategories(): string[] {
        const recordSet: string[] = [];
        
        this.values.forEach(record => {           
            recordSet.push(DateToString(record.date));
        });

        return recordSet;
    }

    protected filter(record: MonthRecord, start: Date, end: Date): boolean {
        return record.date >= start && record.date < end;
    }

    public get(start: Date, end: Date): MonthRecords {
        return new MonthRecords(
            this.values.filter(
              (record) => this.filter(record, start, end)
            ),
        );
    }

    all(): MonthRecords {
        return new MonthRecords(this.values, new Date());
    }
}