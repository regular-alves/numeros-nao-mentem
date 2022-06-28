import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import './style.css';

const Chart = props => {
  return (
    <div className="Chart">
      <HighchartsReact
        highcharts={ Highcharts }
        options={ props.options }
      />
    </div>
  );
}

export default Chart;