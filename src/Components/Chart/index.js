import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import './style.css';

const Chart = props => {
  const defaultOptions = {
    title: {
      text: null
    },
    chart: {
      type: 'area',
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
    },
    tooltip: {
      shared: true,
      // valuePrefix: 'R$'
    },
    credits: {
      enabled: false
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
        cursor: "pointer",
        pointInterval: undefined,
        pointStart: undefined
      }
    },  
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 900
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: 0
              },
              subtitle: {
                text: null
              },
            },
          }
        },
        {
          condition: {
            maxWidth: 768
          },
          chartOptions: {
            yAxis: {
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            }
          }
        }
      ]
    }
  };

  return (
    <div className="Chart">
      <HighchartsReact
        highcharts={ Highcharts }
        options={Object.assign(defaultOptions, props.options)}
      />
    </div>
  );
}

export default Chart;