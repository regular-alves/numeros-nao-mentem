export default class TupleIterator<T> implements Iterator<T> {
  private index: number;
  private done: boolean;
  public length: number;

  constructor(private values: T[]) {
      this.index = 0;
      this.done = false;
      this.length = values.length;
  }

  next(): IteratorResult<T, any> {
      if (this.done) {
          return {
              done: this.done,
              value: undefined
          }
      }

      if (this.index === this.length) {
          this.done = true;

          return {
              done: this.done,
              value: this.index,
          }
      }

      const value = this.values[this.index];
      this.index += 1;

      return {
          done: false,
          value
      }
  }    
}