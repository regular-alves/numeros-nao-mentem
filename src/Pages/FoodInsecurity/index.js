import React, { useEffect, useState } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import FoodInsecurityDto from '../../Dtos/FoodInsecurity';
import Presidents from '../../Dtos/Presidents';
import Footer from '../Footer';
import Header from '../Header';
import image from '../../assets/images/food-insecurity.jpg';
import IntervalPicker from '../../Components/IntervalPicker';
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

export default function FoodInsecurity() {
  const insecurity = new FoodInsecurityDto();
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
    insecurity.getMinDataDate(),
  ]);
  const endDate = getMinDate([
    toDate,
    presidents.getMaxDataDate(),
    insecurity.getMaxDataDate(),
  ]);

  const [to, setTo] = useState(endDate.toISOString());
  const [from, setFrom] = useState(startDate.toISOString());

  const categories = getDateInterval(from, to).map((d) => slashedMonthYear(d));
  const plotBands = presidents.toPlotBands(from, to);

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

  return (
    <>
      <Helmet>
        <title>Insegurança Alimentar | Números não mentem</title>
      </Helmet>
      <Header />
      <Container className="Content-wrapper">
        <Row>
          <Col>
            <h1>Insegurança Alimentar</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={{ order: 2 }}>
            <p>
              A insegurança alimentar é definida quando um indivíduo não possui
              acesso a alimentos suficientes para satisfazer as suas
              necessidades, conforme a definição da Organização das Nações
              Unidas para Alimentação e Agricultura (FAO).
            </p>
            <p>
              O IBGE classifica a insegurança alimentar, que pode ser crônica ou
              temporária, em três níveis: leve, moderada e grave. Esta última é
              caracterizada pela efetiva falta de alimentos.
            </p>
            <p>
              Suas causas podem ser diversas. Crises de desabastecimento,
              mudanças climáticas, altos preços, desemprego, guerras e etc.
            </p>
          </Col>
          <Col lg={{ order: 2 }} md={6} sm={{ order: 1 }}>
            <Figure>
              <Figure.Image
                src={image}
                alt="Insegurança Alimentar"
                title="Insegurança Alimentar"
                rounded
              />
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
            <h2>Evolução (%)</h2>
            <Chart
              options={{
                xAxis: {
                  categories,
                  plotBands,
                },
                yAxis: {
                  title: {
                    text: 'Total da população (%)',
                  },
                },
                series: [
                  {
                    name: 'Insegurança (%)',
                    data: insecurity.getPeriodSeries(from, to),
                  },
                ],
              }}
            />

            <Sources
              sources={[...insecurity.getSources(), ...presidents.getSources()]}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
