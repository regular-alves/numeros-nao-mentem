import Record from "@naoMentem/dtos/Record";
import { Source } from "@naoMentem/factories/Sources";
import { Sources as IterableSource } from "@naoMentem/iterable/Sources";

export default abstract class Collection<T extends Record> {
    protected sources: IterableSource;
    protected records: T[];

    constructor(sources: Source[]) {
        this.sources = new IterableSource(sources);
        this.records = [];
    }
}