import TupleIterator from "../iterators/Tuple";

export default abstract class Tuple<T> implements Iterable<T> {
  public readonly length: number;
  
  constructor(protected values: T[], protected maxDateRecord: Date | null | undefined = null) {
    this.length = values.length;
  }

  [Symbol.iterator](): TupleIterator<T> {
    return new TupleIterator(this.values);
  }

  index(i: number): T {
    if (typeof this.values[i] === 'undefined') {
      throw new Error(`Index ${i} does not exist`);
    }

    return this.values[i];
  }

  some(predicate: (val: T, index: number, array: T[]) => boolean): boolean {
    return this.values.some(predicate);
  }

  protected abstract filter(record: T, start: Date, end: Date): boolean;
  public abstract get(start: Date, end: Date): Tuple<T>;
  public abstract all(): Tuple<T>;

}