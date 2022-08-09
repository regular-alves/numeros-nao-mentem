import React, { useEffect, useState } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

import image from '../../assets/images/ctps.jpg';
import IntervalPicker from '../../Components/IntervalPicker';
import Dto from '../../Dtos/Unemployed';
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

function Unemployed() {
  const dto = new Dto();
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
    dto.getMinDataDate(),
  ]);
  const endDate = getMinDate([
    toDate,
    presidents.getMaxDataDate(),
    dto.getMaxDataDate(),
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
        <title>Desemprego | Números não mentem</title>
      </Helmet>
      <Header />
      <Container className="Content-wrapper">
        <Row>
          <Col>
            <h1>Desemprego</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={{ order: 2 }}>
            <p>
              A Pesquisa Nacional por Amostra de Domicílios Contínua - PNAD
              Contínua investiga, regularmente, informações sobre sexo, idade e
              cor ou raça dos moradores, as quais não somente auxiliam o
              entendimento e a caracterização do mercado de trabalho, como
              também permitem entender aspectos sociais e demográficos do País.
            </p>
            <p>
              Dentre os dados levantados pelo IBGE está a{' '}
              <b>taxa de desocupação</b>. O orgão considera como desocupado:
            </p>

            <ul>
              <li>Com 14 anos ou mais</li>
              <li>Pessoas na força de trabalho</li>
              <ul>
                <li>Desocupadas (ou desempregos)</li>
                <li>Subocupados por insuficiência de horas trabalhadas</li>
              </ul>
              <li>Pessoas fora da força de trabalho</li>
              <ul>
                <li>Força de trabalho potencial</li>
                <ul>
                  <li>Buscaram trabalho, mas não estavam disponíveis</li>
                  <li>Não buscaram trabalho, mas estavam disponíveis</li>
                  <ul>
                    <li>Desalentados</li>
                    <li>Não desalentados</li>
                  </ul>
                </ul>
              </ul>
            </ul>

            <p>
              A PNAD Contínua foi implantada, experimentalmente, em outubro de
              2011 e, a partir de janeiro de 2012, em caráter definitivo, em
              todo o Território Nacional.
            </p>

            <p>
              <small>
                <em>
                  Para mais informações acesse{' '}
                  <a
                    href="https://www.ibge.gov.br/explica/desemprego.php"
                    nofollow="true"
                  >
                    IBGE - Explica
                  </a>
                </em>
              </small>
            </p>
          </Col>
          <Col lg={{ order: 2 }} md={6} sm={{ order: 1 }}>
            <Figure>
              <Figure.Image
                src={image}
                alt="Carteira de Trabalho"
                title="Carteira de Trabalho"
                rounded
              />
              <Figure.Caption>Davi Pinheiro/gov.ce</Figure.Caption>
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
                    text: 'Taxa de desemprego (% população)',
                  },
                },
                series: [
                  {
                    name: 'Desemprego',
                    data: dto.getPeriodSeries(from, to),
                  },
                ],
              }}
            />

            <Sources
              sources={[...dto.getSources(), ...presidents.getSources()]}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Unemployed;
