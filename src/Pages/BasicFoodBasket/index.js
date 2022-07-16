import React, { useState } from "react";
import Header from "../Header";
import { 
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
import IntervalPicker from "../../Components/IntervalPicker";
import FoodVsSalary from "../../Dtos/FoodVsSalary";
import { Col, Container, Row } from "react-bootstrap";
import BestAndWorst from "../../Components/BestAndWorst";
import Footer from "../Footer";
import { Helmet } from "react-helmet";
import Sources from "../../Components/Sources";

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
    },
  };

  const responsive = {
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
  };

  const categories = getDateInterval(from, to).map(d => slashedMonthYear(d));
  const plotBands = presidents.toPlotBands(from, to);

  const foodVsSalaryRegisters = foodVsSalary.getPeriod(from, to);
  const percentValues = foodVsSalaryRegisters
    .sort((a, b) => a.value - b.value);

  const worstPercent = percentValues.pop();
  const bestPercent = percentValues.shift();

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

  const worstAvg = presidentsAvg.pop();
  const bestAvg = presidentsAvg.shift();

  return (
    <>
      <Helmet>
        <title>Cesta Básica vs. Salário Mínimo | Números não mentem</title>
      </Helmet>
      <Header />
      <Container className="Content-wrapper">
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
          <Col md={{span: 6, offset: 6}}>
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
                ],
                responsive
              }}
            />
            <Sources sources={
              [
                ...foodBasket.getSources(), 
                ...salary.getSources(), 
                ...presidents.getSources()
              ]
            }/>
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
                ],
                responsive
            }}
            />
            <Sources sources={
              [
                ...foodBasket.getSources(), 
                ...salary.getSources(), 
                ...presidents.getSources()
              ]
            }/>
          </Col>
        </Row>

        <BestAndWorst
          worst={{
            average: {     
              president: worstAvg.president,
              start: slashedMonthYear(worstAvg.value.start),
              end: slashedMonthYear(worstAvg.value.end),
              value: `${worstAvg.value.value.toFixed(2)}%`         
            },
            absolute: {
              president: presidents.getPeriod(worstPercent.date, worstPercent.date).shift(),
              date: slashedMonthYear(worstPercent.date),
              value: `${worstPercent.value.toFixed(2)}%`
            },
          }}
          best={{
            average: {
              president: bestAvg.president,
              start: slashedMonthYear(bestAvg.value.start),
              end: slashedMonthYear(bestAvg.value.end),
              value: `${bestAvg.value.value.toFixed(2)}%`              
            },
            absolute: {
              president: presidents.getPeriod(bestPercent.date, bestPercent.date)[0],
              date: slashedMonthYear(bestPercent.date),
              value: `${bestPercent.value.toFixed(2)}%`
            },
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