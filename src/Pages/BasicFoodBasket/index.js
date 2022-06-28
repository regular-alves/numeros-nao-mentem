import React, { useState } from "react";
import Header from "../Header";
import Wrapper from "../../Components/Wrapper";

import { invertByDate, getColors, getDateInterval, slashedDate } from '../../utils';

import Salary from "../../Dtos/Salary";
import FoodBasket from "../../Dtos/FoodBasket";
import Presidents from "../../Dtos/Presidents";
import presidents from '../../Dtos/DataSets/presidents.json';
import minimunSalary from '../../Dtos/DataSets/minimun-salary.json';
import basicBasketAverage from '../../Dtos/DataSets/basic-basket-average.json';
import Chart from "../../Components/Chart";
import Sources from "../../Components/Sources";
import IntervalPicker from "../../Components/IntervalPicker";
import { dateFormat } from "highcharts";

const BasicFoodBasket = () => {
  const current = new Date();
  const toDate = new Date(current.getFullYear(), current.getMonth(), 30, 23, 59, 59);
  
  current.setFullYear( current.getFullYear() - 15 );
  
  const fromDate = new Date(current.getFullYear(), current.getMonth(), 1);
  
  const [to, setTo] = useState(toDate.toISOString());
  const [from, setFrom] = useState(fromDate.toISOString());

  const salary = new Salary();
  const foodBasket = new FoodBasket();
  const president_ = new Presidents();

  console.log(president_.toPlotBands(from, to));

  const colors = getColors();
  const invertedDatePresidents = presidents.series
    .sort(invertByDate)
    .map(president => ({
      ...president,
      start: new Date(president.start),
    }));

  const invertedDateSalaries = minimunSalary.data
    .sort(invertByDate)
    .map(salary => ({
      ...salary,
      start: new Date(salary.start),
    }));

  const minimumSalaries = [];
  const presidentsPlotBands = {};

  basicBasketAverage.series.dates.map((date, index) => {
    const dateObj = new Date(date);

    for(let i = 0; i<invertedDateSalaries.length; i++) {
      const salary = invertedDateSalaries[i];

      if(salary.start < dateObj) {
        minimumSalaries.push(salary.value);
        break;
      }
    }

    for(let j = 0; j < invertedDatePresidents.length; j++) {
      const president = invertedDatePresidents[j];

      if(president.start < dateObj) {
        if(presidentsPlotBands[president.name] === undefined) {
          presidentsPlotBands[president.name] = {
            label: { 
              text: president.name,
              align: 'bottom',
            },
            from: index,
            to: index,
            color: `#${colors[j]}af`
          }
        }

        presidentsPlotBands[president.name].to = index;
        break;
      }
    }

    return date;
  });

  return (
    <>
      <Header />
      <Wrapper>
        <h1>Cesta básica</h1>
        <p>
          A cesta básica de alimentos deve conter itens básicos para o sustento de uma família.<br/>
          Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo de soja, Café, e etc.
        </p>
        <p>
          Utilizaremos como índice de comparação o Salário mínimo.
        </p>

        <IntervalPicker 
          to={new Date(to)}
          from={new Date(from)}
          setTo={(f) => setTo(f)}
          setFrom={(f) => setFrom(f)}
        />
        
        <h2>Salário Mínimo vs. Cesta básica</h2>
        <Chart
          options={{
            chart: { type: 'areaspline' },
            title: { text: null },
            legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 150,
              y: 100,
              floating: true,
              borderWidth: 1,
            },
            xAxis: {
              categories: getDateInterval(from, to).map(d => slashedDate(d)),
              plotBands: president_.toPlotBands(from, to)
            },
            yAxis: {
              title: {
                text: 'Valor (R$)'
              }
            },
            tooltip: {
              shared: true,
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              areaspline: {
                fillOpacity: 0.5
              }
            },
            series: [
              {
                name: 'Salário mínimo',
                data: minimumSalaries
              },
              {
                name: 'Valor médio - Cesta básica',
                data: basicBasketAverage.series.values
              }
            ]
          }}
        />
        <Sources sources={[ ...basicBasketAverage.sources, ...minimunSalary.sources ]} />
        <h2>% Salário Mínimo vs. Cesta básica</h2>
        <p>No gráfico a seguir é possível ver a evolução do percertual da Cesta básica sobre o salário mínimo.</p>
        <Chart
          options={{
            chart: {
              type: 'areaspline'
            },
            title: {
              text: '% Salário mínimo vs. Cesta básica (valor médio)'
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
            xAxis: {
              categories: basicBasketAverage.series.dates,
              plotBands: Object.values(presidentsPlotBands)
            },
            yAxis: {
              title: {
                text: 'Porcentagem %'
              }
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
                    fillOpacity: 0.5
                }
            },
            series: [
              {
                name: 'Porcentagem',
                data: minimumSalaries.map((item, key) => {
                  const percent = (basicBasketAverage.series.values[key] / item) * 100;
                  return parseFloat(percent.toFixed(2));
                })
              }
            ]
        }}
        />
        <Sources sources={[ ...basicBasketAverage.sources, ...minimunSalary.sources ]} />
      </Wrapper>
    </>
  );
}

export default BasicFoodBasket;