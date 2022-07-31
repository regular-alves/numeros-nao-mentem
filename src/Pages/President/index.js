import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';

import Dto from '../../Dtos/Presidents';
import './style.css';
import { getAvg, getDateInterval, slashedMonthYear } from '../../utils';
import Chart from '../../Components/Chart';
import FoodVsSalary from '../../Dtos/FoodVsSalary';
import Sources from '../../Components/Sources';
import DeflorestationTotal from '../../Dtos/DeflorestationTotal';

function President() {
  const presidentDto = new Dto();
  const foodVsSalary = new FoodVsSalary();
  const deflorestation = new DeflorestationTotal();

  const { presidentSlug } = useParams();
  const president = presidentDto.getBySlug(presidentSlug);

  if (!president) {
    return <Navigate to="/" />;
  }

  const categories = getDateInterval(president.start, president.end).map((d) =>
    slashedMonthYear(d),
  );

  const past = new Date();

  past.setFullYear(past.getFullYear() - 16);

  const foodPastAverage = getAvg(
    foodVsSalary.getPeriodValues(past, new Date()),
  );

  const deflorestationPastAverage = getAvg(
    deflorestation.getPeriodValues(past, new Date()),
  );

  return (
    <>
      <Helmet>
        <title>{president.name} - Presidentes | Números não mentem</title>
      </Helmet>
      <div className="President">
        <Header />
        <Container className="Content-wrapper">
          <Row>
            <Col className="President-imageWrapper" sm={3}>
              <Image
                className="President-image"
                src={president.image || ''}
                title={president.name}
                alt={president.name}
                rounded
              />
            </Col>
            <Col sm={9}>
              <Row>
                <Col>
                  <h1>{president.name}</h1>
                  <p>
                    No cargo de {slashedMonthYear(president.start)} à{' '}
                    {slashedMonthYear(president.end)}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>% de cesta básica sobre salário mínimo</h2>
                  <p>
                    A cesta básica de alimentos deve conter itens básicos para o
                    sustento de uma família.
                    <br />
                    Normalmente ela contem itens como Arroz, Feijão, Açúcar,
                    Sal, Óleo de soja, Café, e etc.
                  </p>
                  <p>
                    Estamos comparando este índice com o salário mínimo e também
                    a média dos últimos 16 anos.
                  </p>
                  <Chart
                    options={{
                      xAxis: {
                        categories,
                      },
                      yAxis: {
                        minRange: Math.round(foodPastAverage),
                        title: {
                          text: 'Porcentagem (%)',
                        },
                        plotLines: [
                          {
                            label: {
                              text:
                                `Média de ${past.getFullYear()} a ` +
                                `${new Date().getFullYear()}`,
                              align: 'bottom',
                            },
                            color: 'red',
                            dashStyle: 'dash',
                            value: foodPastAverage,
                            width: 2,
                          },
                        ],
                      },
                      series: [
                        {
                          name: '% Cesta sobre salário',
                          data: foodVsSalary.getPeriodValues(
                            president.start,
                            president.end,
                          ),
                        },
                      ],
                    }}
                  />
                  <Sources sources={[...foodVsSalary.getSources()]} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>Desmatamento - Floresta amazônica</h2>
                  <p>
                    A taxa de desmatamento é realizada pelo PRODES
                    (Monitoramento do Desmatamento da Floresta Amazônica
                    Brasileira por Satélite) através de satélites por corte raso
                    na Amazônia Legal e produz, desde 1988, as taxas anuais de
                    desmatamento na região.
                  </p>
                  <Chart
                    options={{
                      xAxis: {
                        categories,
                      },
                      yAxis: {
                        minRange: Math.round(deflorestationPastAverage),
                        title: {
                          text: 'Desmatamento (km²)',
                        },
                        plotLines: [
                          {
                            label: {
                              text:
                                `Média de ${past.getFullYear()} a ` +
                                `${new Date().getFullYear()}`,
                              align: 'bottom',
                            },
                            color: 'red',
                            dashStyle: 'dash',
                            value: deflorestationPastAverage,
                            width: 2,
                          },
                        ],
                      },
                      series: [
                        {
                          name: 'Desmatamento',
                          data: deflorestation.getPeriodSeries(
                            president.start,
                            president.end,
                          ),
                        },
                      ],
                    }}
                  />
                  <Sources sources={[...deflorestation.getSources()]} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default President;
