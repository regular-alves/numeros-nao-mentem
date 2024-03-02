import {expect, test} from '@jest/globals';
import DateToString from "../utils/DateToString";
import { getDatesFrom } from "./useDatesFromPath";


test('Empty path should return Today and 6 months before', () => {
  const today = new Date();
  const sixMonthsAgo = new Date();

  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const { from, to } = getDatesFrom('/reports/example');

  expect(DateToString(from)).toBe(DateToString(sixMonthsAgo));
  expect(DateToString(to)).toBe(DateToString(today));
});