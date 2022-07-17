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

const President = () => {
  const presidentDto = new Dto();
  const foodVsSalary = new FoodVsSalary();

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

  const pastValues = foodVsSalary.getPeriodValues(past, new Date());
  const pastAverage = getAvg(pastValues);

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
                  <p>No cargo de {slashedMonthYear(president.start)} à {slashedMonthYear(president.end)}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>% de cesta básica sobre salário mínimo</h2>
                  <p>
                    A cesta básica de alimentos deve conter itens básicos para o sustento de uma família.<br/>
                    Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo de soja, Café, e etc.
                  </p>
                  <p>
                    Estamos comparando este índice com o salário mínimo e também a média dos últimos 16 anos.
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
                        minRange: Math.round(pastAverage),
                        title: {
                          text: 'Porcentagem (%)'
                        },
                        plotLines: [
                          {
                            label: { 
                              text: `Média de ${past.getFullYear()} a ${new Date().getFullYear()}`,
                              align: 'bottom',
                            },
                            color: 'red',
                            dashStyle: 'dash',
                            value: pastAverage,
                            width: 2
                          }
                        ]
                      },
                      series: [
                        {
                          name: '% Cesta sobre salário',
                          data: foodVsSalary.getPeriodValues(president.start, president.end)
                        }
                      ],
                      responsive
                  }}
                  />
                  <Sources sources={[ ...foodVsSalary.getSources() ] }/>
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