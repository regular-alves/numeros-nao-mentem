import { PeriodRecord } from "@naoMentem/factories/PeriodRecords";
import Records from "@naoMentem/iterable/Records";
import DateToString from "@naoMentem/utils/DateToString";

export class PeriodRecords extends Records<PeriodRecord> {
    toSeries(intervalInSec: number = this.monthInSeconds): number[] {
        const recordSet: number[] = []
        
        this.values.forEach(record => {
            const current = new Date(record.start.getTime());
            const end = record?.end || this.maxDateRecord;
            
            while (end && current < end) {
                recordSet.push(record.value);
                current.setTime(current.getTime() + (intervalInSec * 1000));
            }
        });

        return recordSet;
    }

    toCategories(intervalInSec: number = this.monthInSeconds): string[] {
        const recordSet: string[] = [];

        console.log(this.values);
        
        this.values.forEach(record => {
            const current = new Date(record.start.getTime());
            const end = record?.end || this.maxDateRecord;
            
            while (end && current < end) {
                recordSet.push(DateToString(current));
                current.setTime(current.getTime() + (intervalInSec * 1000));
            }
        });

        return recordSet;
    }
}