import Records from "./Records";
import MonthRecord from "../dtos/MonthRecord";
import DateToString from "../utils/DateToString";

export default class MonthRecords extends Records<MonthRecord> {
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
}