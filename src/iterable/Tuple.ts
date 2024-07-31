import TupleIterator from "../iterators/Tuple";

export default class Tuple<T> implements Iterable<T> {
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
}