import Record from "../dtos/Record";
import { Source } from "../factories/Sources";
import { Sources as IterableSource } from "../iterable/Sources";

export default abstract class Collection<T extends Record> {
    protected sources: IterableSource;
    protected records: T[];

    constructor(sources: Source[]) {
        this.sources = new IterableSource(sources);
        this.records = [];
    }
}