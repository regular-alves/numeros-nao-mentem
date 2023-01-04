import React, { useEffect, useState } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

import DeforestationTotal from '../../Models/DeforestationTotal';
import Presidents from '../../Models/Presidents';
import image from '../../assets/images/rainforest.jpg';
import {
  getDateInterval,
  slashedMonthYear,
  handleDateParams,
  isValidDate,
} from '../../utils';

import IntervalPicker from '../../Components/IntervalPicker';
import Chart from '../../Components/Chart';
import Sources from '../../Components/Sources';

function Deforestation() {
  const deforestation = new DeforestationTotal();
  const presidents = new Presidents();
  let { endDate, startDate } = useParams();

  if (!isValidDate(endDate)) {
    endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      30,
      23,
      59,
      59,
    );
  }

  if (!isValidDate(startDate)) {
    startDate = new Date(
      new Date().getFullYear() - 16,
      new Date().getMonth(),
      1,
    );
  }

  [startDate, endDate] = handleDateParams([startDate, endDate]);

  const [to, setTo] = useState(endDate.toISOString());
  const [from, setFrom] = useState(startDate.toISOString());

  const values = deforestation.getPeriod(new Date(from), new Date(to));
  const minDate = [deforestation.oldest, presidents.oldest].sort().shift();
  const maxDate = [deforestation.mostRecent, presidents.mostRecent]
    .sort()
    .pop();

  console.log(presidents.getPlotBandsd(new Date(from), new Date(to)));

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
              to={to}
              from={from}
              min={minDate}
              max={maxDate}
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
                  categories: values.map((item) =>
                    slashedMonthYear(item.start),
                  ),
                  // plotBands,
                },
                yAxis: {
                  title: {
                    text: 'Desmatamento (km²)',
                  },
                },
                series: [
                  {
                    name: 'Desmatamento',
                    data: values.map((item) => item.value),
                  },
                ],
              }}
            />

            <Sources
              sources={[...deforestation.sources, ...presidents.sources]}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Deforestation;
