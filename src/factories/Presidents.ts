import PresidentRecord from '@naoMentem/dtos/PresidentRecord';
import dataSet from '../datasets/presidents.json';
import Collection from './Collection';
import Iterable from "../iterable/PresidentRecords"

export type plotBand = {
    from: number;
    to: number;
    color: string;
    slug: string;
    label: {
        text: string;
        align: 'left' | 'center' | 'right';
        x: number;
    }
} 

export default class Presidents extends Collection<PresidentRecord> {
    constructor() {
        const records = dataSet.data.map(
            (r) => new PresidentRecord(
                r.name,
                r.knownAs,
                r.slug,
                new Date(r.start),
                new Date(r.end)
            )
        );

        super(dataSet.sources, records);
    }

    getRecords(): Iterable {
        return new Iterable(this.records);
    }
}