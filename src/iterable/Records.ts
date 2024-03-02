import { Record } from "@naoMentem/factories/Collection";
import TupleIterable from "@naoMentem/iterable/Tuple";

export default class Records<T extends Record> extends TupleIterable<T> {
  protected monthInSeconds = 2592000;
}