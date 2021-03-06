import React, { useState } from "react";
import { Col, Container, Figure, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Header from "../Header";
import Footer from "../Footer";

import image from "../../assets/images/rainforest.jpg";
import IntervalPicker from "../../Components/IntervalPicker";
import DeflorestationTotal from "../../Dtos/DeflorestationTotal";
import Presidents from "../../Dtos/Presidents";
import { getAvg, getDateInterval, getMaxDate, getMinDate, handleDateParams, isValidDate, slashedMonthYear } from "../../utils";
import Chart from "../../Components/Chart";
import Card from "../../Components/Card";
import Sources from "../../Components/Sources";
import { useParams } from "react-router-dom";

const Deflorestation = () => {
  const deflorestation = new DeflorestationTotal();
  const presidents = new Presidents();
  let {to: toDate, from: fromDate} = useParams();
  [toDate, fromDate] = handleDateParams([toDate, fromDate]);
  
  if (!isValidDate(toDate)) {
    toDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      30,
      23,
      59,
      59
    );
  }
  
  if (!isValidDate(fromDate)) {
    fromDate = new Date(
      new Date().getFullYear() - 16,
      new Date().getMonth(),
      1
    );
  }

  const startDate = getMaxDate([fromDate, presidents.getMinDataDate(), deflorestation.getMinDataDate()]);
  const endDate = getMinDate([toDate, presidents.getMaxDataDate(), deflorestation.getMaxDataDate()]);

  const [to, setTo] = useState(toDate.toISOString());
  const [from, setFrom] = useState(fromDate.toISOString());

  const categories = getDateInterval(from, to).map(d => slashedMonthYear(d));
  const plotBands = presidents.toPlotBands(from, to);

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
    },
  };

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

  const orderedDeflorestation = deflorestation.getPeriod(from, to)
    .sort((a, b) => a.amount - b.amount);

  const worstMoment = orderedDeflorestation.pop();
  const bestMoment = orderedDeflorestation.shift();

  const average = presidents
    .getPeriod(from, to)
    .map(p => ({
      ...p,
      average: getAvg(
        deflorestation.getPeriodValues(
          p.start < new Date(from) ? new Date(from) : p.start,
          p.end > to ? to : p.end
        )
      ),
      date: {
        start: p.start < new Date(from) ? new Date(from) : p.start,
        end: p.end > to ? to : p.end
      }
    }))
    .sort((a, b) => a.average - b.average);

  return (
    <>
      <Helmet>
        <title>Desmatamento - Amaz??nia | N??meros n??o mentem</title>
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
              A taxa de desmatamento ?? realizada pelo PRODES (Monitoramento do Desmatamento da Floresta Amaz??nica Brasileira por Sat??lite) 
              atrav??s de sat??lites por corte raso na Amaz??nia Legal e produz, desde 1988, as taxas anuais de desmatamento na regi??o.
            </p>
            <p>
              Segundo o pr??prio PRODES, as estimativas do PRODES s??o consideradas confi??veis pelos cientistas nacionais e internacionais 
              (<a href="http://www.obt.inpe.br/OBT/assuntos/programas/amazonia/prodes/pdfs/kintish_2007.pdf" alt="Kintish" title="Kintish" nofollow>Kintish, 2007</a>). 
              Esse sistema tem demonstrado ser de grande import??ncia para a????es e planejamento de pol??ticas p??blicas da Amaz??nia. 
              Resultados recentes, a partir de an??lises realizadas com especialistas independentes, indicam n??vel de precis??o pr??ximo a 95%.
            </p>
            <p>
              A PRODES apresenta os dados consolidados anualmente no primeiro semestre do ano seguinte.
            </p>
          </Col>
          <Col lg={{order: 2}} md={6} sm={{ order: 1 }}>
            <Figure>
              <Figure.Image
                src={image}
                alt="Floresta"
                title="Floresta"
                rounded
              />
              <Figure.Caption>
                <a 
                  href="https://www.pexels.com/pt-br/foto/floresta-tropical-cercada-por-nevoeiro-975771/" 
                  alt="David Ria??o Cort??s" 
                  title="David Ria??o Cort??s" 
                  nofollow="true"
                >
                  Foto de David Ria??o Cort??s
                </a>
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>

        <Row>
          <Col lg={{order: 1}} md={{span: 6, offset: 6}}>
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
            <h2>Desmatamento (km??)</h2>
            <Chart
              options={{
                chart,
                title,
                tooltip,
                credits,
                plotOptions,
                xAxis: {
                  categories,
                  plotBands
                },
                yAxis: {
                  title: {
                    text: 'Desmatamento (km??)'
                  }
                },
                series: [
                  {
                    name: 'Desmatamento',
                    data: deflorestation.getPeriodSeries(from, to)
                  },
                ],
                responsive
              }}
            />

            <Sources sources={[ ...deflorestation.getSources(), ...presidents.getSources() ]} />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Ranking dos mandatos</h2>
            <p>
              Baseado nos valores anteriores, temos a m??dia dos valores do mandato do candidato no per??odo pesquisado, 
              ranqueados do melhor para o pior.
            </p>
          </Col>
        </Row>

        <Row>
          {average.map(p => (
            <Col md={3} sm={6}>
              <Card 
                president={p}
                value={(<>{p.average.toFixed(2)}<small>km??</small></>)}
                date={{
                  start: slashedMonthYear(p.start),
                  end: slashedMonthYear(p.end),
                }}
                values
              />
            </Col>
          ))}
        </Row>

      </Container>

      <Footer />
    </>
  );
}

export default Deflorestation;