import React, { useState } from "react";
import Header from "../Header";
import { 
  invertByDate,
  getDateInterval,
  slashedMonthYear,
  getMinDate,
  getMaxDate,
  getAvg
} from '../../utils';
import Salary from "../../Dtos/Salary";
import FoodBasket from "../../Dtos/FoodBasket";
import Presidents from "../../Dtos/Presidents";

import Chart from "../../Components/Chart";
import Sources from "../../Components/Sources";
import IntervalPicker from "../../Components/IntervalPicker";
import FoodVsSalary from "../../Dtos/FoodVsSalary";
import { Col, Container, Row } from "react-bootstrap";
import BestAndWorst from "../../Components/BestAndWorst";
import Footer from "../../Components/Footer";

const BasicFoodBasket = () => {
  const salary = new Salary();
  const foodBasket = new FoodBasket();
  const presidents = new Presidents();
  const foodVsSalary = new FoodVsSalary();

  let toDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    30,
    23,
    59,
    59
  );
  
  let fromDate = new Date(
    new Date().getFullYear() - 16,
    new Date().getMonth(),
    1
  );

  const startDate = getMaxDate([fromDate, foodBasket.getMinDataDate(), presidents.getMinDataDate()]);
  const endDate = getMinDate([toDate, foodBasket.getMaxDataDate(), presidents.getMaxDataDate()]);

  const [to, setTo] = useState(toDate.toISOString());
  const [from, setFrom] = useState(fromDate.toISOString());

  const chart = {
    type: 'areaspline'
  };

  const title = {
    text: null
  };
  
  const legend = {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 150,
    y: 100,
    floating: true,
    borderWidth: 1,
  };

  const tooltip = {
    shared: true,
    // valuePrefix: 'R$'
  };

  const credits = {
      enabled: false
  };

  const plotOptions = {
      areaspline: {
        fillOpacity: 0.5
      }
  };

  const categories = getDateInterval(from, to).map(d => slashedMonthYear(d));
  const plotBands = presidents.toPlotBands(from, to);

  const foodVsSalaryRegisters = foodVsSalary.getPeriod(from, to);
  const percentValues = foodVsSalaryRegisters
    .sort((a, b) => a.value - b.value);

  const worstPercent = percentValues[percentValues.length - 1];
  const bestPercent = percentValues[0];

  const presidentsAvg = presidents
    .getPeriod(from, to)
    .map(p => ({
      president: p,
      value: {
        value: getAvg(
          foodVsSalary.getPeriodValues(
            p.start < new Date(from) ? new Date(from) : p.start,
            p.end > to ? to : p.end
          )
        ),
        start: p.start < new Date(from) ? new Date(from) : p.start,
        end: p.end > to ? to : p.end
      }
    }))
    .sort((a, b) => a.value.value - b.value.value);

  const worstAvg = presidentsAvg[presidentsAvg.length - 1];
  const bestAvg = presidentsAvg[0];

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1>Cesta básica</h1>
            <p>
              A cesta básica de alimentos deve conter itens básicos para o sustento de uma família.<br/>
              Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo de soja, Café, e etc.
            </p>
            <p>
              Utilizaremos como índice de comparação o Salário mínimo.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <IntervalPicker 
              to={new Date(to)}
              from={new Date(from)}
              min={startDate}
              max={endDate}
              setTo={(f) => setTo(f)}
              setFrom={(f) => setFrom(f)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Salário Mínimo vs. Cesta básica</h2>
            <Chart
              options={{
                chart,
                title,
                legend,
                tooltip,
                credits,
                plotOptions,
                xAxis: {
                  categories,
                  plotBands
                },
                yAxis: {
                  title: {
                    text: 'Valor (R$)'
                  }
                },
                series: [
                  {
                    name: 'Salário mínimo',
                    data: salary.getPeriodSeries(from, to)
                  },
                  {
                    name: 'Valor médio - Cesta básica',
                    data: foodBasket.getPeriodValues(from, to)
                  }
                ]
              }}
            />
          </Col>
        </Row>
        
        <Row>
          <Col>
            <h2>% Salário Mínimo vs. Cesta básica</h2>
            <p>No gráfico a seguir é possível ver a evolução do percertual da Cesta básica sobre o salário mínimo.</p>
            <Chart
              options={{
                chart,
                title,
                legend,
                tooltip,
                credits,
                plotOptions,
                xAxis: {
                  categories,
                  plotBands
                },
                yAxis: {
                  title: {
                    text: 'Porcentagem (%)'
                  }
                },
                series: [
                  {
                    name: 'Porcentagem',
                    data: foodVsSalary.getPeriodValues(from, to)
                  }
                ]
            }}
            />
          </Col>
        </Row>

        <BestAndWorst
          worstPercent={{
            president: presidents.getPeriod(worstPercent.date, worstPercent.date)[0],
            value: worstPercent
          }}
          bestPercent={{
            president: presidents.getPeriod(bestPercent.date, bestPercent.date)[0],
            value: bestPercent
          }}
          worstAvg={{
            president: worstAvg.president,
            value: worstAvg.value
          }}
          bestAvg={{
            president: bestAvg.president,
            value: bestAvg.value
          }}
          from={from}
          to={to}
        />
        
      </Container>
      <Footer />
    </>
  );
}

export default BasicFoodBasket;