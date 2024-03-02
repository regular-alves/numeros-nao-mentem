import { Source } from "@naoMentem/factories/Sources";
import { Sources as IterableSource } from "@naoMentem/iterable/Sources";

export class Record {
    readonly value: number;

    constructor(value: number) {
        this.value = value;
    }
}

export default abstract class Collection<T extends Record> {
    protected sources: IterableSource;
    protected records: T[];

    constructor(sources: Source[]) {
        this.sources = new IterableSource(sources);
        this.records = [];
    }
}