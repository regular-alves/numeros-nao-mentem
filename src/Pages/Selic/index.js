import React, { useEffect, useState } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

import image from '../../assets/images/money.jpg';
import IntervalPicker from '../../Components/IntervalPicker';
import Dto from '../../Dtos/Selic';
import Presidents from '../../Dtos/Presidents';
import {
  getDateInterval,
  getMaxDate,
  getMinDate,
  handleDateParams,
  isValidDate,
  slashedMonthYear,
} from '../../utils';
import Chart from '../../Components/Chart';
import Sources from '../../Components/Sources';

function Selic() {
  const selic = new Dto();
  const presidents = new Presidents();
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
    presidents.getMinDataDate(),
    selic.getMinDataDate(),
  ]);
  const endDate = getMinDate([
    toDate,
    presidents.getMaxDataDate(),
    selic.getMaxDataDate(),
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

  return (
    <>
      <Helmet>
        <title>Selic | Números não mentem</title>
      </Helmet>
      <Header />
      <Container className="Content-wrapper">
        <Row>
          <Col>
            <h1>Selic</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={{ order: 2 }}>
            <p>
              SELIC é a sigla para Sistema Especial de Liquidação e de Custódia.
              Este sistema é uma infraestrutura do mercado financeiro
              administrada pelo Banco Central e nele são transacionados títulos
              públicos federais.
            </p>
            <p>
              A Selic é a taxa básica de juros da economia. É o principal
              instrumento de política monetária utilizado pelo Banco Central
              para controlar a inflação. Ela influencia todas as taxas de juros
              do país, como as taxas de juros dos empréstimos, dos
              financiamentos e das aplicações financeiras.
            </p>
          </Col>
          <Col lg={{ order: 2 }} md={6} sm={{ order: 1 }}>
            <Figure>
              <Figure.Image
                src={image}
                alt="Floresta"
                title="Floresta"
                rounded
              />
              <Figure.Caption>
                <a
                  href="https://unsplash.com/@photoripey"
                  alt="Ibrahim Rifath"
                  title="Ibrahim Rifath"
                  nofollow="true"
                >
                  Foto de Ibrahim Rifath
                </a>
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>

        <Row>
          <Col lg={{ order: 1 }} md={{ span: 6, offset: 6 }}>
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
            <h2>Evolução</h2>
            <Chart
              options={{
                xAxis: {
                  categories,
                  plotBands,
                },
                yAxis: {
                  title: {
                    text: 'SELIC (% a.a.)',
                  },
                },
                series: [
                  {
                    name: 'taxa SELIC ao ano',
                    data: selic.getPeriodSeries(from, to),
                  },
                ],
              }}
            />

            <Sources
              sources={[...selic.getSources(), ...presidents.getSources()]}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Selic;
