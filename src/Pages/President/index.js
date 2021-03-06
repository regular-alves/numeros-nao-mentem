import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";

import Dto from '../../Dtos/Presidents';
import './style.css';
import { getAvg, getDateInterval, slashedMonthYear } from "../../utils";
import Chart from "../../Components/Chart";
import FoodVsSalary from "../../Dtos/FoodVsSalary";
import { Helmet } from "react-helmet";
import Sources from "../../Components/Sources";
import DeflorestationTotal from "../../Dtos/DeflorestationTotal";

const President = () => {
  const presidentDto = new Dto();
  const foodVsSalary = new FoodVsSalary();
  const deflorestation = new DeflorestationTotal();

  const { presidentSlug } = useParams();
  const president = presidentDto.getBySlug( presidentSlug );

  if( !president ) {
    return (<Navigate to="/" />);
  }

  const chart = {
    type: 'areaspline'
  };

  const title = {
    text: null
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
      }
  };

  const categories = getDateInterval(president.start, president.end)
    .map(d => slashedMonthYear(d));

  const pastStart = new Date(president.start);

  pastStart.setFullYear( pastStart.getFullYear() - 12 );

  const past = new Date();

  past.setFullYear(past.getFullYear() - 16);

  const foodPastAverage = getAvg(foodVsSalary.getPeriodValues(past, new Date()));
  const deflorestationPastAverage = getAvg(deflorestation.getPeriodValues(past, new Date()));

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

  console.log({
    deflorestationPastAverage,
    values: deflorestation.getPeriodSeries(president.start, president.end)
  })

  return (
    <>
      <Helmet>
        <title>{president.name} - Presidentes | N??meros n??o mentem</title>
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
                  <p>No cargo de {slashedMonthYear(president.start)} ?? {slashedMonthYear(president.end)}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>% de cesta b??sica sobre sal??rio m??nimo</h2>
                  <p>
                    A cesta b??sica de alimentos deve conter itens b??sicos para o sustento de uma fam??lia.<br/>
                    Normalmente ela contem itens como Arroz, Feij??o, A????car, Sal, ??leo de soja, Caf??, e etc.
                  </p>
                  <p>
                    Estamos comparando este ??ndice com o sal??rio m??nimo e tamb??m a m??dia dos ??ltimos 16 anos.
                  </p>
                  <Chart
                    options={{
                      chart,
                      title,
                      tooltip,
                      credits,
                      plotOptions,
                      xAxis: {
                        categories,
                      },
                      yAxis: {
                        minRange: Math.round(foodPastAverage),
                        title: {
                          text: 'Porcentagem (%)'
                        },
                        plotLines: [
                          {
                            label: { 
                              text: `M??dia de ${past.getFullYear()} a ${new Date().getFullYear()}`,
                              align: 'bottom',
                            },
                            color: 'red',
                            dashStyle: 'dash',
                            value: foodPastAverage,
                            width: 2
                          }
                        ]
                      },
                      series: [
                        {
                          name: '% Cesta sobre sal??rio',
                          data: foodVsSalary.getPeriodValues(president.start, president.end)
                        }
                      ],
                      responsive
                  }}
                  />
                  <Sources sources={[ ...foodVsSalary.getSources() ] }/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>Desmatamento - Floresta amaz??nica</h2>
                  <p>
                    A taxa de desmatamento ?? realizada pelo PRODES (Monitoramento do Desmatamento da Floresta Amaz??nica Brasileira por Sat??lite) 
                    atrav??s de sat??lites por corte raso na Amaz??nia Legal e produz, desde 1988, as taxas anuais de desmatamento na regi??o.
                  </p>
                  <Chart
                    options={{
                      chart,
                      title,
                      tooltip,
                      credits,
                      plotOptions,
                      xAxis: {
                        categories,
                      },
                      yAxis: {
                        minRange: Math.round(deflorestationPastAverage),
                        title: {
                          text: 'Desmatamento (km??)'
                        },
                        plotLines: [
                          {
                            label: { 
                              text: `M??dia de ${past.getFullYear()} a ${new Date().getFullYear()}`,
                              align: 'bottom',
                            },
                            color: 'red',
                            dashStyle: 'dash',
                            value: deflorestationPastAverage,
                            width: 2
                          }
                        ]
                      },
                      series: [
                        {
                          name: 'Desmatamento',
                          data: deflorestation.getPeriodSeries(president.start, president.end)
                        }
                      ],
                      responsive
                  }}
                  />
                  <Sources sources={[ ...deflorestation.getSources() ] }/>
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