import { expect, test, describe } from "@jest/globals";
import MonthRecord from "../dtos/MonthRecord";
import MonthRecords from "./MonthRecords";

const testData = [
  new MonthRecord(1212.0, new Date(2022, 1, 1)),
  new MonthRecord(1100.0, new Date(2022, 0, 1)),
];

const testPeriodRecords = new MonthRecords(testData);
const from = new Date(2022, 0, 1);
const to = new Date(2022, 2, 1);

describe('Month records', () => {
  test('All should return all values', () => {
    expect(testPeriodRecords.all()).toHaveLength;
    expect(testPeriodRecords.all().length).toBe(testData.length);
  });
  
  test('Search should retorn both records', () => {
    const dataset = testPeriodRecords.get(from, to);
    
    expect(dataset).toHaveLength;
    expect(dataset.length).toBe(testData.length);
  });
  
  test('Search in the period should retorn both records', () => {
    const dataset = testPeriodRecords.get(from, to);
    
    expect(dataset).toHaveLength;
    expect(dataset.length).toBe(testData.length);
  });
  
  test('Search in a smaller period should retorn only the respective month record', () => {
    const dataset = testPeriodRecords.get(
      new Date(2022, 0, 1),
      new Date(2022, 1, 1)
    );
    
    expect(dataset).toHaveLength;
    expect(dataset.length).toBe(1);
    expect(dataset.index(0).date.toISOString()).toBe((new Date(2022, 0, 1)).toISOString());
  });
})