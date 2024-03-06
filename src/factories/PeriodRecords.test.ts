import { expect, test, describe } from "@jest/globals";
import PeriodRecords from "./PeriodRecords";
import { Source } from "./Sources";
import { PeriodRegisterProps } from "../dtos/PeriodRecord";

export const testSources: Source[] = [
  {
    "name": "Source Name",
    "url": "https://example.com/path/"
  }
];

export const testData: PeriodRegisterProps[] = [
  {
    "start": "2022-01-01T00:00:00-03:00",
    "value": 1212.0
  },
  {
    "start": "2021-01-01T00:00:00-03:00",
    "end": "2021-12-31T00:00:00-03:00",
    "value": 1100.0
  },
];

export const testPeriodRecords = new PeriodRecords(testSources, testData);

const from = new Date(2021, 5, 1);
const to = new Date(2022, 5, 1);

describe('Period records', () => {
  test(
    'More than one non-finished record should throw an error',
    () => {
      const defining = () => {
        const erroredData: PeriodRegisterProps[] = [
          ...testData,
          {
            "start": "2023-01-01T00:00:00-03:00",
            "value": 1212.0
          }
        ]

        new PeriodRecords(testSources, erroredData);
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