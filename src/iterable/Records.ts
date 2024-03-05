import TupleIterable from "./Tuple";
import Record from "../dtos/Record";

export default class Records<T extends Record> extends TupleIterable<T> {
  protected monthInSeconds = 2592000;
}