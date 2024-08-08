import { expect, test, describe } from "@jest/globals";
import PeriodRecords from "./PeriodRecords";
import PeriodRecord from "../dtos/PeriodRecord";

const testData = [
  new PeriodRecord(1212.0, new Date(2022, 0, 1)),
  new PeriodRecord(1100.0, new Date(2021, 0, 1), new Date(2021, 11, 31)),
];

const testPeriodRecords = new PeriodRecords(testData);
const from = new Date(2021, 5, 1);
const to = new Date(2022, 5, 1);

describe('Period records', () => {
  test(
    'More than one non-finished record should throw an error',
    () => {
      const defining = () => {
        const erroredData = [
          ...testData,
          new PeriodRecord(1212.0, new Date(2023, 0, 1)),
        ]

        new PeriodRecords(erroredData);
      }

      expect(defining).toThrow(RangeError)
      expect(defining).toThrow('Your dataset must not have more than one non-ended record')
    }
  );

  test('All should return all values', () => {
    expect(testPeriodRecords.all()).toHaveLength;
    expect(testPeriodRecords.all().length).toBe(testData.length);
  });
  
  test('Search until after start of non-finished must return this record', () => {
    const dataset = testPeriodRecords.get(from, to);
    
    expect(dataset).toHaveLength;
    expect(dataset.length).toBe(testData.length);
  });
  
  test('Period inside record interval should return it', () => {
    const dataset = testPeriodRecords.get(
      from,
      new Date(2021, 8, 1)
    );
    
    expect(dataset).toHaveLength;
    expect(dataset.length).toBe(1);
  });
})