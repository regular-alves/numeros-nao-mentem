import React, { useState } from "react";
import { Col, Container, Figure, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Header from "../Header";
import Footer from "../Footer";

import image from "../../assets/images/rainforest.jpg";
import IntervalPicker from "../../Components/IntervalPicker";
import DeflorestationTotal from "../../Dtos/DeflorestationTotal";
import Presidents from "../../Dtos/Presidents";
import { getAvg, getDateInterval, getMaxDate, getMinDate, slashedMonthYear } from "../../utils";
import Chart from "../../Components/Chart";
import BestAndWorst from "../../Components/BestAndWorst";

const Deflorestation = () => {
  const deflorestation = new DeflorestationTotal();
  const presidents = new Presidents();

  let toDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    30,
    23,
    59,
    59
  );
  
  let fromDate = new Date(
    new Date().getFullYear() - 16,
    new Date().getMonth(),
    1
  );

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

  const presidentsAvg = presidents
    .getPeriod(from, to)
    .map(p => ({
      president: p,
      value: {
        value: getAvg(
          deflorestation.getPeriodValues(
            p.start < new Date(from) ? new Date(from) : p.start,
            p.end > to ? to : p.end
          )
        ),
        start: p.start < new Date(from) ? new Date(from) : p.start,
        end: p.end > to ? to : p.end
      }
    }))
    .sort((a, b) => a.value.value - b.value.value);

  console.log(presidentsAvg);

  const worstAvg = presidentsAvg.pop();
  const bestAvg = presidentsAvg.shift();

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
              A taxa de desmatamento é realizada pelo PRODES (Monitoramento do Desmatamento da Floresta Amazônica Brasileira por Satélite) 
              através de satélites por corte raso na Amazônia Legal e produz, desde 1988, as taxas anuais de desmatamento na região.
            </p>
            <p>
              Segundo o próprio PRODES, as estimativas do PRODES são consideradas confiáveis pelos cientistas nacionais e internacionais 
              (<a href="http://www.obt.inpe.br/OBT/assuntos/programas/amazonia/prodes/pdfs/kintish_2007.pdf" alt="Kintish" title="Kintish" nofollow>Kintish, 2007</a>). 
              Esse sistema tem demonstrado ser de grande importância para ações e planejamento de políticas públicas da Amazônia. 
              Resultados recentes, a partir de análises realizadas com especialistas independentes, indicam nível de precisão próximo a 95%.
            </p>
          </Col>
          <Col md={6} sm={{ order: 1 }}>
            <Figure>
              <Figure.Image
                src={image}
                alt="Floresta"
                title="Floresta"
                rounded
              />
              <Figure.Caption>
                <a href="https://www.pexels.com/pt-br/foto/floresta-tropical-cercada-por-nevoeiro-975771/" alt="Kintish" title="Kintish" nofollow="true">
                  Foto de David Riaño Cortés
                </a>
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>

        <Row>
          <Col md={{span: 6, offset: 6}}>
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
                    text: 'Desmatamento (km²)'
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
          </Col>
        </Row>

        <BestAndWorst
          worst={{
            average: {     
              president: worstAvg.president,
              start: slashedMonthYear(
                worstAvg.value.start.getFullYear() < fromDate ?
                fromDate :
                worstAvg.value.start
              ),
              end: slashedMonthYear(
                worstAvg.value.end.getFullYear() > toDate ?
                toDate :
                worstAvg.value.end
              ),
              value: (<>{worstAvg.value.value.toFixed(2)}<small>km²</small></>)
            },
            absolute: {
              president: presidents.getPeriod(`${worstMoment.year}-01-01 00:00:00`, `${worstMoment.year}-12-31 00:00:00`).shift(),
              date: worstMoment.year,
              value: (<>{worstMoment.amount}<small>km²</small></>)
            },
          }}
          best={{
            average: {
              president: bestAvg.president,
              start: slashedMonthYear(
                bestAvg.value.start.getFullYear() < fromDate ?
                fromDate :
                bestAvg.value.start
              ),
              end: slashedMonthYear(
                bestAvg.value.end.getFullYear() > toDate ?
                toDate :
                bestAvg.value.end
              ),
              value: (<>{bestAvg.value.value.toFixed(2)}<small>km²</small></>)
            },
            absolute: {
              president: presidents.getPeriod(`${bestMoment.year}-01-01 00:00:00`, `${bestMoment.year}-12-31 00:00:00`).pop(),
              date: bestMoment.year,
              value: (<>{bestMoment.amount}<small>km²</small></>)
            },
          }}
          from={from}
          to={to}
        />

      </Container>

      <Footer />
    </>
  );
}

export default Deflorestation;