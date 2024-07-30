import Records from "./Records";
import PeriodRecord from "../dtos/PeriodRecord";
import DateToString from "../utils/DateToString";

export default class PeriodRecords extends Records<PeriodRecord> {
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
}