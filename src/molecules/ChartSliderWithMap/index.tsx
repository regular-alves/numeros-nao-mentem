import { useState } from 'react';
import HighchartsReact , { HighchartsReactProps } from 'highcharts-react-official';
import Highcharts from "highcharts/highmaps";
import BrasilMap from "@highcharts/map-collection/countries/br/br-all.topo.json";
import lodash from 'lodash';
import { Box, Grid, Input, Slider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DateToString from '@naoMentem/utils/DateToString';
import Collection from '@naoMentem/factories/Collection';
import MonthRecord from '@naoMentem/dtos/MonthRecord';

export type ChartSliderWithMap = {
  options: HighchartsReactProps;
  from: Date;
  to: Date;
  collection: Collection<MonthRecord>
};

const ChartOptions = {
  title: false,
  legend: false,
  mapNavigation: false,
  colorAxis: {
    type: 'logarithmic',
  },
  series: [],
  chart: {
    map: BrasilMap,
  },
  credits: false,
}

export default function ChartSliderWithMap({ options, from, to, collection }: ChartSliderWithMap) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(to.getTime()));

  const recFrom = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const recTo = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  let series = [];
  const records = collection.getRecords().get(recFrom, recTo);

  for( let record of records ) {
    series.push({ code: record.state.toUpperCase(), value: record.value });
  }

  series = series.sort((a, b) => b.value - a.value);

  options.series[0].data = series;
  options.colorAxis = {
    minColor: '#DCE2AA',
    maxColor: '#A41623',
    stops: [
      [0, '#DCE2AA'],
      [0.5, '#FFB563'],
      [1, '#A41623']
    ]
  };

  return (
    <>
      <Box mb={2} display="flex" gap={4} alignItems="center">
        <Slider
          defaultValue={to.getTime()}
          step={60 * 60 * 24 * 31 * 1000}
          marks
          min={from.getTime()}
          max={to.getTime()}
          onChange={(event: Event, newValue: number | number[]) => {
            let value: number;

            value = typeof newValue === 'number'
              ? newValue
              : (newValue[0] ?? 0);


            setSelectedDate(new Date(value));
          }}
        />

        <Input
          disabled
          value={DateToString(selectedDate, '01/m/Y')}
        />
      </Box>

      <Grid container spacing={2}>
          <Grid lg={8}>
            <HighchartsReact
              key={`chart-by-state-${DateToString(recFrom)}-${DateToString(recTo)}`}
              highcharts={Highcharts}
              options={lodash.merge(options, ChartOptions)}
              constructorType={"mapChart"}
            />
          </Grid>
          <Grid lg={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Estado
                  </TableCell>
                  <TableCell>
                    Valor Médio
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {series.map((item, k) => (
                  <TableRow key={k}>
                    <TableCell>
                      {item.code}
                    </TableCell>
                    <TableCell>
                      R${item.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
      </Grid>
    </>
  );
}