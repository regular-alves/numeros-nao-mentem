import PeriodRecords from "./PeriodRecords";
import dataSet from '../datasets/minimum-salary.json';

export default class MinimumSalary extends PeriodRecords {
    constructor() {
        super(dataSet.sources, dataSet.data);
    }
}