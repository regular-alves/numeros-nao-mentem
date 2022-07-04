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

  const pastValues = foodVsSalary.getPeriodValues(
    pastStart,
    president.start
  );

  const pastAverage = getAvg(pastValues);

  return (
    <>
      <Helmet>
        <title>{president.name} - Presidentes | Números não mentem</title>
      </Helmet>
      <div className="President">
        <Header />
        <Container>
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
                        title: {
                          text: 'Porcentagem (%)'
                        },
                        plotBands: [
                          {
                            label: { 
                              text: `Média de ${pastStart.getFullYear()} a ${president.start.getFullYear()}`,
                              align: 'bottom',
                            },
                            from: 0,
                            to: pastAverage
                          }
                        ]
                      },
                      series: [
                        {
                          name: '% Cesta sobre salário',
                          data: foodVsSalary.getPeriodValues(president.start, president.end)
                        }
                      ]
                  }}
                  />
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