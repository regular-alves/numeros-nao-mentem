import dataSet from '@naoMentem/datasets/essencial-food-basket-avg.json';
import MonthRecords from './MonthRecords';

export default class EssencialFoodBasketAvg extends MonthRecords {
    constructor() {
        super(dataSet.sources, dataSet.data);
    }
}