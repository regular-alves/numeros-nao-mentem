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
import FoodInsecurity from '../../Dtos/FoodInsecurity';
import Selic from '../../Dtos/Selic';

function President() {
  const presidentDto = new Dto();
  const foodVsSalary = new FoodVsSalary();
  const deflorestation = new DeflorestationTotal();
  const foodInsecurity = new FoodInsecurity();
  const selic = new Selic();

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

  const foodInsecurityPastAverage = getAvg(
    foodInsecurity.getPeriodValues(past, new Date()),
  );

  const selicPastAverage = getAvg(selic.getPeriodValues(past, new Date()));

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
                  <h2>Alimentação</h2>
                </Col>
              </Row>

              <Row id="cesta-basica">
                <Col>
                  <h3>% de cesta básica sobre salário mínimo</h3>
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

              <Row id="inseguranca-alimentar">
                <Col>
                  <h3>Insegurança alimentar</h3>
                  <p>
                    A insegurança alimentar é definida quando um indivíduo não
                    possui acesso a alimentos suficientes para satisfazer as
                    suas necessidades, conforme a definição da Organização das
                    Nações Unidas para Alimentação e Agricultura (FAO).
                  </p>
                  <Chart
                    options={{
                      xAxis: {
                        categories,
                      },
                      yAxis: {
                        minRange: Math.round(foodInsecurityPastAverage),
                        title: {
                          text: 'Total da população (%)',
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
                            value: foodInsecurityPastAverage,
                            width: 2,
                          },
                        ],
                      },
                      series: [
                        {
                          name: 'Insegurança (%)',
                          data: foodInsecurity.getPeriodSeries(
                            president.start,
                            president.end,
                          ),
                        },
                      ],
                    }}
                  />
                  <Sources sources={[...foodInsecurity.getSources()]} />
                </Col>
              </Row>

              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>

              <Row>
                <Col>
                  <h2>Meio Ambiente</h2>
                </Col>
              </Row>

              <Row id="desmatamento">
                <Col>
                  <h3>Desmatamento - Floresta amazônica</h3>
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

              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>

              <Row>
                <Col>
                  <h2>Economia</h2>
                </Col>
              </Row>

              <Row id="selic">
                <Col>
                  <h2>Selic</h2>
                  <p>
                    A Selic é a taxa básica de juros da economia. É o principal
                    instrumento de política monetária utilizado pelo Banco
                    Central para controlar a inflação. Ela influencia todas as
                    taxas de juros do país, como as taxas de juros dos
                    empréstimos, dos financiamentos e das aplicações
                    financeiras.
                  </p>
                  <Chart
                    options={{
                      xAxis: {
                        categories,
                      },
                      yAxis: {
                        minRange: Math.round(selicPastAverage),
                        title: {
                          text: 'SELIC (% a.a.)',
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
                            value: selicPastAverage,
                            width: 2,
                          },
                        ],
                      },
                      series: [
                        {
                          name: 'taxa SELIC ao ano',
                          data: selic.getPeriodSeries(
                            president.start,
                            president.end,
                          ),
                        },
                      ],
                    }}
                  />
                  <Sources sources={[...selic.getSources()]} />
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
