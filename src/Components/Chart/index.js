import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './style.css';

function Chart({ options: pOptions }) {
  const options = { ...pOptions };

  options.title = {
    text: null,
    ...(pOptions.title || {}),
  };

  options.chart = {
    type: 'area',
    ...(pOptions.chart || {}),
  };

  options.legend = {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 150,
    y: 100,
    floating: true,
    borderWidth: 1,
    ...(pOptions.legend || {}),
  };

  options.tooltip = {
    shared: true,
    // valuePrefix: 'R$'
    ...(pOptions.tooltip || {}),
  };

  options.credits = {
    enabled: false,
    ...(pOptions.credits || {}),
  };

  options.plotOptions = {
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
    ...(pOptions.plotoptions || {}),
  };

  options.responsive = {
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
    ...(pOptions.responsive || {}),
  };

  return (
    <div className="Chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default Chart;
