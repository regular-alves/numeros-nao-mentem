import React, { useEffect, useState } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import {
  getDateInterval,
  slashedMonthYear,
  getMinDate,
  getMaxDate,
  getAvg,
  handleDateParams,
  isValidDate,
} from '../../utils';

import Salary from '../../Dtos/Salary';
import FoodBasket from '../../Dtos/FoodBasket';
import Presidents from '../../Dtos/Presidents';

import image from '../../assets/images/food.jpg';
import Chart from '../../Components/Chart';
import IntervalPicker from '../../Components/IntervalPicker';
import FoodVsSalary from '../../Dtos/FoodVsSalary';
import Header from '../Header';
import Footer from '../Footer';
import Sources from '../../Components/Sources';
import Card from '../../Components/Card';

function BasicFoodBasket() {
  const salary = new Salary();
  const foodBasket = new FoodBasket();
  const presidents = new Presidents();
  const foodVsSalary = new FoodVsSalary();

  let { to: toDate, from: fromDate } = useParams();
  [toDate, fromDate] = handleDateParams([toDate, fromDate]);

  if (!isValidDate(toDate)) {
    toDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      30,
      23,
      59,
      59,
    );
  }

  if (!isValidDate(fromDate)) {
    fromDate = new Date(
      new Date().getFullYear() - 16,
      new Date().getMonth(),
      1,
    );
  }

  const startDate = getMaxDate([
    fromDate,
    foodBasket.getMinDataDate(),
    presidents.getMinDataDate(),
  ]);

  const endDate = getMinDate([
    toDate,
    foodBasket.getMaxDataDate(),
    presidents.getMaxDataDate(),
  ]);

  const [to, setTo] = useState(endDate.toISOString());
  const [from, setFrom] = useState(startDate.toISOString());

  useEffect(() => {
    let path = window.location.pathname.replace(/\/([\d-]+)/g, '');

    if (path.substring(path.length - 1) === '/') {
      path = path.substring(0, path.length - 1);
    }

    window.history.replaceState(
      null,
      null,
      `${path}/${from.toString().substring(0, 10)}/${to
        .toString()
        .substring(0, 10)}`,
    );
  }, [from, to]);

  const categories = getDateInterval(from, to).map((d) => slashedMonthYear(d));
  const plotBands = presidents.toPlotBands(from, to);

  const average = presidents
    .getPeriod(from, to)
    .map((p) => ({
      ...p,
      average: getAvg(
        foodVsSalary.getPeriodValues(
          p.start < new Date(from) ? new Date(from) : p.start,
          p.end > to ? to : p.end,
        ),
      ),
    }))
    .sort((a, b) => a.average - b.average);

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
          </Col>
        </Row>

        <Row>
          <Col md={6} sm={{ order: 2 }}>
            <p>
              A cesta básica de alimentos deve conter itens básicos para o
              sustento de uma família.
              <br />
              Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo
              de soja, Café, e etc.
            </p>
            <p>
              Utilizaremos como índice de comparação o Salário mínimo e o
              cálculo para esta análise é
              <b style={{ color: '#33673B' }}> [Valor da cesta básica]</b> ÷
              <b style={{ color: '#CC3F0C' }}> [Valor do salário mínimo]</b> =
              <b style={{ color: '#2176AE' }}> [Percentual]</b>.
            </p>
            <p>
              Por exemplo: Se o{' '}
              <b style={{ color: '#CC3F0C' }}>salário mínimo é de R$980,00</b> e
              a<b style={{ color: '#33673B' }}> cesta básica custa R$470,00</b>,
              o percentual do valor é<b style={{ color: '#2176AE' }}> 47,95%</b>
            </p>
            <pre>470,00 ÷ 980,00 = 47,95%</pre>
          </Col>
          <Col lg={{ order: 2 }} md={6} sm={{ order: 1 }}>
            <Figure>
              <Figure.Image src={image} alt="Mercado" title="Mercado" rounded />
              <Figure.Caption>
                <a
                  href={
                    'https://www.pexels.com/pt-br/' +
                    'foto/abundancia-fartura-riqueza-anonimo-7129141/'
                  }
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
          <Col md={{ span: 6, offset: 6 }}>
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
          </Col>
        </Row>

        <Row>
          <Col>
            <Chart
              options={{
                xAxis: {
                  categories,
                  plotBands,
                },
                yAxis: {
                  title: {
                    text: 'Valor (R$)',
                  },
                },
                series: [
                  {
                    name: 'Salário mínimo',
                    data: salary.getPeriodSeries(from, to),
                    color: '#CC3F0C',
                  },
                  {
                    name: 'Valor médio - Cesta básica',
                    data: foodBasket.getPeriodValues(from, to),
                    color: '#33673B',
                  },
                ],
              }}
            />
            <Sources
              sources={[
                ...foodBasket.getSources(),
                ...salary.getSources(),
                ...presidents.getSources(),
              ]}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>% Salário Mínimo vs. Cesta básica</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Chart
              options={{
                xAxis: {
                  categories,
                  plotBands,
                },
                yAxis: {
                  title: {
                    text: 'Porcentagem (%)',
                  },
                },
                series: [
                  {
                    name: 'Porcentagem',
                    data: foodVsSalary.getPeriodValues(from, to),
                    color: '#2176AE',
                  },
                ],
              }}
            />
            <Sources
              sources={[
                ...foodBasket.getSources(),
                ...salary.getSources(),
                ...presidents.getSources(),
              ]}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Ranking dos mandatos</h2>
            <p>
              Baseado nos valores anteriores, temos a média dos valores do
              mandato do candidato no período pesquisado, ranqueados do melhor
              para o pior.
            </p>
          </Col>
        </Row>

        <Row>
          {average.map((p) => (
            <Col md={3} sm={6}>
              <Card
                president={p}
                value={
                  <>
                    {p.average.toFixed(2)}
                    <small>%</small>
                  </>
                }
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
