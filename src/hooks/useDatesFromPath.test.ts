import {describe, expect, test} from '@jest/globals';
import DateToString from "../utils/DateToString";
import { getDatesFrom } from "./useDatesFromPath";

const sixMonthsAgo = new Date();
const today = new Date();

sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

describe('Hook dates from path', () => {
  test('Path dates should match to "from" and "to" params', () => {
    const { from, to } = getDatesFrom(`/reports/example/${DateToString(sixMonthsAgo, 'Y-m')}/${DateToString(today, 'Y-m')}`);
  
    expect(DateToString(from, 'Y-m')).toBe(DateToString(sixMonthsAgo, 'Y-m'));
    expect(DateToString(to, 'Y-m')).toBe(DateToString(today, 'Y-m'));
  });
  
  test('Empty path should return Today and 6 months before', () => {
    const { from, to } = getDatesFrom('/reports/example');
  
    expect(DateToString(from, 'Y-m')).toBe(DateToString(sixMonthsAgo, 'Y-m'));
    expect(DateToString(to, 'Y-m')).toBe(DateToString(today, 'Y-m'));
  });
  
  test('Single date path should append today date', () => {
    const { from, to } = getDatesFrom(`/reports/example/${DateToString(sixMonthsAgo, 'Y-m')}`);
  
    expect(DateToString(from, 'Y-m')).toBe(DateToString(sixMonthsAgo, 'Y-m'));
    expect(DateToString(to, 'Y-m')).toBe(DateToString(today, 'Y-m'));
  });
  
  test('Inverted period should be correctly setted', () => {
    const { from, to } = getDatesFrom(`/reports/example/${DateToString(today, 'Y-m')}/${DateToString(sixMonthsAgo, 'Y-m')}`);
  
    expect(DateToString(from, 'Y-m')).toBe(DateToString(sixMonthsAgo, 'Y-m'));
    expect(DateToString(to, 'Y-m')).toBe(DateToString(today, 'Y-m'));
  });
  
  test('More than two dates, ignores intermediare values', () => {
    const anotherDate = new Date();
  
    anotherDate.setMonth(anotherDate.getMonth() - 3);
  
    const { from, to } = getDatesFrom(
      '/reports/example/' +
      `${DateToString(today, 'Y-m')}/` +
      `${DateToString(sixMonthsAgo, 'Y-m')}/` +
      `${DateToString(anotherDate, 'Y-m')}`
    );
  
    expect(DateToString(from, 'Y-m')).toBe(DateToString(sixMonthsAgo, 'Y-m'));
    expect(DateToString(to, 'Y-m')).toBe(DateToString(today, 'Y-m'));
  });
})