import HighchartsReact, { HighchartsReactProps } from "highcharts-react-official";
import * as Highcharts from 'highcharts';
import lodash from 'lodash';

type ChartProps = { options: HighchartsReactProps };

const ChartOptions = {
  chart: { type: 'area' },
  credits: { enabled: false },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 150,
    y: 100,
    floating: true,
    borderWidth: 1,
  },  
  plotOptions: {
    areaspline: {
      fillOpacity: 0.5,
    },
    series: {
      line: {
        marker: false,
      },
      connectNulls: true,
      cursor: 'pointer',
      pointInterval: undefined,
      pointStart: undefined,
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 900,
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: 0,
            },
            subtitle: {
              text: null,
            },
          },
        },
      },
      {
        condition: {
          maxWidth: 768,
        },
        chartOptions: {
          yAxis: {
            title: {
              text: null,
            },
          },
          subtitle: {
            text: null,
          },
        },
      },
    ],
  },
  title: { text: null },
  tooltip: {
    shared: true,
    // valuePrefix: 'R$'
  },
};

const Chart = ({ options }: ChartProps) => {

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={lodash.merge(ChartOptions, options)}
    />
  );
}

export default Chart;