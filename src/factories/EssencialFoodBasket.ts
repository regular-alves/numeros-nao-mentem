import dataSet from '@naoMentem/datasets/essencial-food-basket.json';
import FoodByStateRecord, { FoodByStateRecordProps } from '../dtos/FoodByStateRecord';
import Collection from './Collection';
import Source, { SourceProps } from '@naoMentem/dtos/Source';
import Iterable from "../iterable/MonthRecords";

export default class EssencialFoodBasket extends Collection<FoodByStateRecord> {
  constructor() {
    super(
      dataSet.sources.map((s: SourceProps) => new Source(
        s.name,
        s.url,
        s?.seenAt ? new Date(s?.seenAt) : null
      )),
      dataSet.data
        .map((record: FoodByStateRecordProps) => (
            new FoodByStateRecord(
                record.city,
                record.state,
                record.value,
                new Date(record.date)
            )
        ))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
    );
  }

  getRecords(): Iterable {
    return new Iterable(this.records);
  }
}