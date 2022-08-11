import React, { useEffect, useState } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

import image from '../../assets/images/rainforest.jpg';
import IntervalPicker from '../../Components/IntervalPicker';
import DeflorestationTotal from '../../Dtos/DeflorestationTotal';
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

function Deflorestation() {
  const deflorestation = new DeflorestationTotal();
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
    deflorestation.getMinDataDate(),
  ]);
  const endDate = getMinDate([
    toDate,
    presidents.getMaxDataDate(),
    deflorestation.getMaxDataDate(),
  ]);

  const [to, setTo] = useState(endDate.toISOString());
  const [from, setFrom] = useState(startDate.toISOString());

  useEffect(() => {
    let path = window.location.hash.replace(/\/([\d-]+)/g, '');

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
        <title>Desmatamento - Amazônia | Números não mentem</title>
      </Helmet>
      <Header />
      <Container className="Content-wrapper">
        <Row>
          <Col>
            <h1>Desmatamento</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={{ order: 2 }}>
            <p>
              A taxa de desmatamento é realizada pelo PRODES (Monitoramento do
              Desmatamento da Floresta Amazônica Brasileira por Satélite)
              através de satélites por corte raso na Amazônia Legal e produz,
              desde 1988, as taxas anuais de desmatamento na região.
            </p>
            <p>
              Segundo o próprio PRODES, as estimativas do PRODES são
              consideradas confiáveis pelos cientistas nacionais e
              internacionais (
              <a
                href={
                  'http://www.obt.inpe.br/' +
                  'OBT/assuntos/programas/amazonia/prodes/pdfs/kintish_2007.pdf'
                }
                alt="Kintish"
                title="Kintish"
                nofollow
              >
                Kintish, 2007
              </a>
              ). Esse sistema tem demonstrado ser de grande importância para
              ações e planejamento de políticas públicas da Amazônia. Resultados
              recentes, a partir de análises realizadas com especialistas
              independentes, indicam nível de precisão próximo a 95%.
            </p>
            <p>
              A PRODES apresenta os dados consolidados anualmente no primeiro
              semestre do ano seguinte.
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
                  href={
                    'https://www.pexels.com/' +
                    'pt-br/foto/floresta-tropical-cercada-por-nevoeiro-975771/'
                  }
                  alt="David Riaño Cortés"
                  title="David Riaño Cortés"
                  nofollow="true"
                >
                  Foto de David Riaño Cortés
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
            <h2>Desmatamento (km²)</h2>
            <Chart
              options={{
                xAxis: {
                  categories,
                  plotBands,
                },
                yAxis: {
                  title: {
                    text: 'Desmatamento (km²)',
                  },
                },
                series: [
                  {
                    name: 'Desmatamento',
                    data: deflorestation.getPeriodSeries(from, to),
                  },
                ],
              }}
            />

            <Sources
              sources={[
                ...deflorestation.getSources(),
                ...presidents.getSources(),
              ]}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Deflorestation;
