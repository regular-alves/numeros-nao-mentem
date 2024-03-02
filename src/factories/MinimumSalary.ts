import PeriodRecords from "@naoMentem/factories/PeriodRecords";
import dataSet from '@naoMentem/datasets/minimun-salary.json';

export default class MinimumSalary extends PeriodRecords {
    constructor() {
        super(dataSet.sources, dataSet.data);
    }
}