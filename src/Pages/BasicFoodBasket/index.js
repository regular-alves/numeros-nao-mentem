import React, { useEffect, useState } from "react";
import Header from "../Header";
import { 
  getDateInterval,
  slashedMonthYear,
  getMinDate,
  getMaxDate,
  getAvg,
  handleDateParams,
  isValidDate
} from '../../utils';
import Salary from "../../Dtos/Salary";
import FoodBasket from "../../Dtos/FoodBasket";
import Presidents from "../../Dtos/Presidents";

import image from "../../assets/images/food.jpg";
import Chart from "../../Components/Chart";
import IntervalPicker from "../../Components/IntervalPicker";
import FoodVsSalary from "../../Dtos/FoodVsSalary";
import { Col, Container, Figure, Row } from "react-bootstrap";
import Footer from "../Footer";
import { Helmet } from "react-helmet";
import Sources from "../../Components/Sources";
import Card from "../../Components/Card";
import { useParams } from "react-router-dom";

const BasicFoodBasket = () => {
  const salary = new Salary();
  const foodBasket = new FoodBasket();
  const presidents = new Presidents();
  const foodVsSalary = new FoodVsSalary();

  let {to: toDate, from: fromDate} = useParams();
  [toDate, fromDate] = handleDateParams([toDate, fromDate]);
  
  if (!isValidDate(toDate)) {
    toDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      30,
      23,
      59,
      59
    );
  }
  
  if (!isValidDate(fromDate)) {
    fromDate = new Date(
      new Date().getFullYear() - 16,
      new Date().getMonth(),
      1
    );
  }

  const startDate = getMaxDate([fromDate, foodBasket.getMinDataDate(), presidents.getMinDataDate()]);
  const endDate = getMinDate([toDate, foodBasket.getMaxDataDate(), presidents.getMaxDataDate()]);

  const [to, setTo] = useState(toDate.toISOString());
  const [from, setFrom] = useState(fromDate.toISOString());

  useEffect(() => {
    let path = window.location.pathname.replace(/\/([\d-]+)/g, '');

    if(path.substring(path.length - 1) === '/') {
      path = path.substring(0, path.length - 1);
    }

    window.history.replaceState(
      null,
      null,
      `${path}/${from.toString().substring(0, 10)}/${to.toString().substring(0, 10)}`
    );
  }, [from, to])

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

  const average = presidents
    .getPeriod(from, to)
    .map(p => ({
      ...p,
      average: getAvg(
        foodVsSalary.getPeriodValues(
          p.start < new Date(from) ? new Date(from) : p.start,
          p.end > to ? to : p.end
        )
      )
    }))
    .sort((a, b) => a.average - b.average);

  return (
    <>
      <Helmet>
        <title>Cesta B??sica vs. Sal??rio M??nimo | N??meros n??o mentem</title>
      </Helmet>
      <Header />
      <Container className="Content-wrapper">
        <Row>
          <Col>
            <h1>Cesta b??sica</h1>
          </Col>
        </Row>

        <Row>
          <Col md={6} sm={{ order: 2 }}>
            <p>
              A cesta b??sica de alimentos deve conter itens b??sicos para o sustento de uma fam??lia.<br/>
              Normalmente ela contem itens como Arroz, Feij??o, A????car, Sal, ??leo de soja, Caf??, e etc.
            </p>
            <p>
              Utilizaremos como ??ndice de compara????o o Sal??rio m??nimo e o c??lculo para esta an??lise ?? 
              <b style={{color: '#33673B'}}> [Valor da cesta b??sica]</b> ??
              <b style={{color: '#CC3F0C'}}> [Valor do sal??rio m??nimo]</b> =
              <b style={{color: '#2176AE'}}> [Percentual]</b>.
            </p>
            <p>
              Por exemplo: Se o <b style={{color: '#CC3F0C'}}>sal??rio m??nimo ?? de R$980,00</b> e a 
              <b style={{color: '#33673B'}}> cesta b??sica custa R$470,00</b>, o percentual do valor ?? 
              <b style={{color: '#2176AE'}}> 47,95%</b>
            </p>
            <pre>
              470,00 ?? 980,00 = 47,95%
            </pre>
          </Col>
          <Col lg={{order: 2}} md={6} sm={{ order: 1 }}>
            <Figure>
              <Figure.Image
                src={image}
                alt="Mercado"
                title="Mercado"
                rounded
              />
              <Figure.Caption>
                <a 
                  href="https://www.pexels.com/pt-br/foto/abundancia-fartura-riqueza-anonimo-7129141/" 
                  alt="Michael Burrows" 
                  title="Michael Burrows" 
                  nofollow="true"
                >
                  Foto de Michael Burrows
                </a>
              </Figure.Caption>
            </Figure>
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
            <h2>Sal??rio M??nimo vs. Cesta b??sica</h2>
          </Col>
        </Row>

        <Row>
          <Col>
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
                    name: 'Sal??rio m??nimo',
                    data: salary.getPeriodSeries(from, to),
                    color: '#CC3F0C',
                  },
                  {
                    name: 'Valor m??dio - Cesta b??sica',
                    data: foodBasket.getPeriodValues(from, to),
                    color: '#33673B',
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
            <h2>% Sal??rio M??nimo vs. Cesta b??sica</h2>
          </Col>
        </Row>

        <Row>
          <Col>
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
                    data: foodVsSalary.getPeriodValues(from, to),
                    color: '#2176AE'
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
            <h2>Ranking dos mandatos</h2>
            <p>
              Baseado nos valores anteriores, temos a m??dia dos valores do mandato do candidato no per??odo pesquisado, 
              ranqueados do melhor para o pior.
            </p>
          </Col>
        </Row>

        <Row>
          {average.map(p => (
            <Col md={3} sm={6}>
              <Card 
                president={p}
                value={(<>{p.average.toFixed(2)}<small>%</small></>)}
                date={{
                  start: slashedMonthYear(p.start),
                  end: slashedMonthYear(p.end),
                }}
                values
              />
            </Col>
          ))}
        </Row>
        
      </Container>
      <Footer />
    </>
  );
}

export default BasicFoodBasket;