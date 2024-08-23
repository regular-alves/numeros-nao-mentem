
import Source from "@naoMentem/dtos/Source";

export default abstract class Collection<T> {
    constructor(protected sources: Source[], protected records: T[]) {
    }

    getSources(): Source[] {
        return this.sources;
    }

    abstract getRecords(): any;
}