import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';
import Chart from '../../Components/Chart';
import Select from '../../Components/Select';
import Sources from '../../Components/Sources';
import FoodVsSalary from '../../Dtos/FoodVsSalary';
import Deflorestation from '../../Dtos/DeflorestationTotal';
import Presidents from '../../Dtos/Presidents';
import FoodBasket from '../../Dtos/FoodBasket';
import Salary from '../../Dtos/Salary';
import { getAvg, getDateInterval, slashedMonthYear } from '../../utils';
import Footer from '../Footer';
import Header from '../Header';
import './style.css';
import FoodInsecurity from '../../Dtos/FoodInsecurity';

const Compare = () => {
  const routeSeleted = Object.values(useParams());
  const selectPresident = useRef();

  const presidents = new Presidents();
  const foodVsSalary = new FoodVsSalary();
  const foodBasket = new FoodBasket();
  const salary = new Salary();
  const deflorestation = new Deflorestation();
  const foodInsecurity = new FoodInsecurity();

  const minDates = [
    salary.getMinDataDate(),
    presidents.getMinDataDate(),
    foodBasket.getMinDataDate(),
    deflorestation.getMinDataDate(),
  ];

  const maxDates = [
    salary.getMaxDataDate(),
    presidents.getMaxDataDate(),
    foodBasket.getMaxDataDate(),
    deflorestation.getMaxDataDate(),
  ];

  const available = presidents
    .getPeriod(
      minDates.sort((a, b) => b - a).shift(),
      maxDates.sort((a, b) => b - a).pop(),
    )
    .sort((a, b) => b.start - a.start);

  const [selected, setSelected] = useState(
    available.filter((a) => routeSeleted.includes(a.slug)),
  );
  let { pathname: location } = useLocation();

  location = location.replace(routeSeleted.join('/'), '');

  useEffect(() => {
    let path = location;

    if (path.substring(path.length - 1) === '/') {
      path = path.substring(0, path.length - 1);
    }

    window.history.replaceState(
      null,
      null,
      `${path}/${selected.map((p) => p.slug).join('/')}`,
    );
  }, [selected, location]);

  const removeSelected = (slug) => {
    setSelected(selected.filter((s) => s.slug !== slug));
  };

  const addPresident = () => {
    const newValues = [...selected];
    const equivalent = available
      .filter((p) => p.slug === selectPresident.current.value)
      .pop();

    if (!equivalent) return;

    newValues.push(equivalent);

    setSelected(newValues);
  };

  let minInsecurityAxis = [];

  const presidentList = selected.map((p) => {
    let foodVsSalarySeries = foodVsSalary
      .getPeriodValues(p.start, p.end)
      .filter((v) => !!v);
    let deflorestationSeries = deflorestation
      .getPeriodSeries(p.start, p.end)
      .filter((v) => !!v);
    let foodInsecuritySeries = foodInsecurity
      .getPeriodSeries(p.start, p.end)
      .filter((v) => !!v);

    minInsecurityAxis.push(...foodInsecuritySeries);

    return {
      ...p,
      foodVsSalary: {
        series: foodVsSalarySeries,
        start: foodVsSalarySeries[0],
        end: foodVsSalarySeries[foodVsSalarySeries.length - 1],
        variation:
          (foodVsSalarySeries[foodVsSalarySeries.length - 1] /
            foodVsSalarySeries[0] -
            1) *
          100,
        average: getAvg(foodVsSalarySeries),
      },
      deflorestation: {
        series: deflorestationSeries,
        start: deflorestationSeries[0],
        end: deflorestationSeries[deflorestationSeries.length - 1],
        variation:
          (deflorestationSeries[deflorestationSeries.length - 1] /
            deflorestationSeries[0] -
            1) *
          100,
        average: getAvg(deflorestationSeries),
      },
      foodInsecurity: {
        series: foodInsecuritySeries,
        start: foodInsecuritySeries[0],
        end: foodInsecuritySeries[foodInsecuritySeries.length - 1],
        variation:
          foodInsecuritySeries[foodInsecuritySeries.length - 1] -
          foodInsecuritySeries[0],
        average: getAvg(foodInsecuritySeries),
      },
    };
  });

  minInsecurityAxis = minInsecurityAxis.sort((a, b) => b - a).shift();

  const minFoodAxis = selected
    .map((s) =>
      foodVsSalary
        .getPeriodValues(s.start, s.end)
        .sort((a, b) => b - a)
        .shift(),
    )
    .sort((a, b) => b - a)
    .shift();

  const minDeflorestationAxis = selected
    .map((s) =>
      deflorestation
        .getPeriodValues(s.start, s.end)
        .sort((a, b) => b - a)
        .shift(),
    )
    .sort((a, b) => b - a)
    .shift();

  return (
    <>
      <Helmet>
        <title>
          {selected.length > 1
            ? selected.map((p) => p.name).join(' vs. ') + ' | '
            : ''}
          Comparador | Números não mentem
        </title>
      </Helmet>
      <Header />
      <Container className="Content-wrapper">
        <Row>
          <Col>
            <h1>Comparador</h1>
            <p>
              Compare o mandato dos presidentes utilizando os relatórios que
              disponibilizamos.
            </p>
            {selected.length === 0 && (
              <Alert variant="secondary">
                Selecione um presidente para começar
              </Alert>
            )}
          </Col>
        </Row>

        <Row className="align-items-end">
          <Col md={3}></Col>
          {selected.length > 0 &&
            selected.map((p) => (
              <Col md={3}>
                <Row className="justify-content-md-center d-none d-md-grid">
                  <Col md="auto">
                    <Figure>
                      <Figure.Image
                        src={p.image}
                        title={p.name}
                        alt={p.name}
                        rounded
                      />
                      <Figure.Caption>{p.name}</Figure.Caption>
                    </Figure>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={8} sm={8} className="d-sm-grid d-md-none">
                    <b>{p.name}</b>
                  </Col>
                  <Col xs={4} sm={4} md={12} className="d-grid">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => removeSelected(p.slug)}
                    >
                      Remover
                    </Button>
                  </Col>
                </Row>
              </Col>
            ))}
          {selected.length < 3 && (
            <Col md={3}>
              <Row>
                <Col xs={8} sm={8}>
                  <Select inputRef={selectPresident}>
                    {available
                      .filter(
                        (p) => !selected.map((i) => i.slug).includes(p.slug),
                      )
                      .map((p) => (
                        <option value={p.slug}>{p.name}</option>
                      ))}
                  </Select>
                </Col>
                <Col xs={4} sm={4} className="d-grid">
                  <Button onClick={() => addPresident()}>Adicionar</Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Alimentação</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <h4>Cesta básica</h4>
            <p>
              A cesta básica de alimentos deve conter itens básicos para o
              sustento de uma família.
              <br />
              Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo
              de soja, Café, e etc.
            </p>
            <Link to="/cesta-basica">
              <Button variant="light">Ver relatório completo</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md={3}>&nbsp;</Col>
          {presidentList.length > 0 &&
            presidentList.map((p) => {
              const isBest =
                [...presidentList].sort(
                  (a, b) => a.foodVsSalary.average - b.foodVsSalary.average,
                )[0].slug === p.slug;

              return (
                <Col md={3} className="mb-3">
                  <Row className="d-sm-grid d-md-none">
                    <Col>
                      <h4>{p.name}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Chart
                        options={{
                          yAxis: {
                            minRange: minFoodAxis,
                            min: 0,
                            title: {
                              text: 'Porcentagem (%)',
                            },
                          },
                          xAxis: {
                            categories: getDateInterval(p.start, p.end).map(
                              (d) => slashedMonthYear(d),
                            ),
                          },
                          series: [
                            {
                              name: 'Porcentagem',
                              data: p.foodVsSalary.series,
                              color: '#2176AE',
                            },
                          ],
                          chart: {
                            height: '300vw',
                          },
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        No mandato de <b>{p.knownAs}</b>: <br />A cesta básica
                        teve custo médio de{' '}
                        <b>
                          {p.foodVsSalary.average.toFixed(2)}
                          <small>%</small>
                        </b>{' '}
                        do salário mínimo.
                        <br />
                        Se compararmos o começo e o final do mandato, o custo
                        <b>
                          {!p.foodVsSalary.variation && ' se manteve igual'}
                          {p.foodVsSalary.variation !== 0 &&
                          p.foodVsSalary.variation > 0
                            ? ' aumentou '
                            : ' diminuiu '}
                          {p.foodVsSalary.variation !== 0 && (
                            <>
                              {' '}
                              {Math.abs(p.foodVsSalary.variation).toFixed(2)}
                              <small>%</small>
                            </>
                          )}
                        </b>
                        .
                      </p>
                    </Col>
                  </Row>
                </Col>
              );
            })}
        </Row>

        <Row>
          <Col>
            <Sources sources={[...foodVsSalary.getSources()]} />
          </Col>
        </Row>

        <Row>
          <Col>
            <h4>Insegurança Alimentar</h4>
            <p>
              A insegurança alimentar é definida quando um indivíduo não possui
              acesso a alimentos suficientes para satisfazer as suas
              necessidades, conforme a definição da Organização das Nações
              Unidas para Alimentação e Agricultura (FAO).
            </p>
            <Link to="/inseguranca-alimentar">
              <Button variant="light">Ver relatório completo</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md={3}>&nbsp;</Col>
          {presidentList.length > 0 &&
            presidentList.map((p) => {
              const isBest =
                [...presidentList].sort(
                  (a, b) => a.foodVsSalary.average - b.foodVsSalary.average,
                )[0].slug === p.slug;

              console.log({ name: p.name, start: p.start, end: p.end });

              return (
                <Col md={3} className="mb-3">
                  <Row className="d-sm-grid d-md-none">
                    <Col>
                      <h4>{p.name}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Chart
                        options={{
                          yAxis: {
                            minRange: minInsecurityAxis,
                            min: 0,
                            title: {
                              text: 'Total da população (%)',
                            },
                          },
                          xAxis: {
                            categories: getDateInterval(p.start, p.end).map(
                              (d) => slashedMonthYear(d),
                            ),
                          },
                          series: [
                            {
                              name: 'Porcentagem',
                              data: p.foodInsecurity.series,
                              color: '#2176AE',
                            },
                          ],
                          chart: {
                            height: '300vw',
                          },
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        No mandato de <b>{p.knownAs}</b>: <br />O percentual
                        médio da população em insegurança alimentar foi de{' '}
                        <b>
                          {p.foodInsecurity.average.toFixed(2)}
                          <small>%</small>
                        </b>
                        .<br />
                        Se compararmos o começo e o final do mandato, o
                        percentual
                        <b>
                          {!p.foodInsecurity.variation && ' se manteve igual'}
                          {p.foodInsecurity.variation !== 0 &&
                          p.foodInsecurity.variation > 0
                            ? ' aumentou '
                            : ' diminuiu '}
                          {p.foodInsecurity.variation !== 0 && (
                            <>
                              {' '}
                              {Math.abs(p.foodInsecurity.variation).toFixed(2)}
                              <small>%</small>
                            </>
                          )}
                        </b>
                        .
                      </p>
                    </Col>
                  </Row>
                </Col>
              );
            })}
        </Row>

        <Row>
          <Col>
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
            <h3>Desmatamento</h3>
            <p>
              A taxa de desmatamento é realizada pelo PRODES (Monitoramento do
              Desmatamento da Floresta Amazônica Brasileira por Satélite)
              através de satélites por corte raso na Amazônia Legal e produz,
              desde 1988, as taxas anuais de desmatamento na região.
            </p>
            <Link to="/desmatamento">
              <Button variant="light">Ver relatório completo</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md={3}>&nbsp;</Col>
          {presidentList.length > 0 &&
            presidentList.map((p, i) => {
              const isBest =
                [...presidentList].sort(
                  (a, b) => a.deflorestation.average - b.deflorestation.average,
                )[0].slug === p.slug;

              return (
                <Col md={3} className="mb-3">
                  <Row className="d-sm-grid d-md-none">
                    <Col>
                      <h4>{p.name}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Chart
                        options={{
                          yAxis: {
                            minRange: minDeflorestationAxis,
                            min: 0,
                            title: {
                              text: 'Porcentagem (%)',
                            },
                          },
                          xAxis: {
                            categories: getDateInterval(p.start, p.end).map(
                              (d) => slashedMonthYear(d),
                            ),
                          },
                          series: [
                            {
                              name: 'Porcentagem',
                              data: p.deflorestation.series,
                            },
                          ],
                          chart: {
                            height: '300vw',
                          },
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        No mandato de <b>{p.knownAs}</b>: <br />A média de
                        desmatamento foi de{' '}
                        <b>
                          {p.deflorestation.average.toFixed(2)}
                          <small>km²</small>
                        </b>
                        .<br />
                        Se compararmos o começo e o final do mandato, o
                        desmatamento
                        <b>
                          {!p.deflorestation.variation && ' se manteve igual'}
                          {p.deflorestation.variation !== 0 &&
                          p.deflorestation.variation > 0
                            ? ' aumentou '
                            : ' diminuiu '}
                          {p.deflorestation.variation !== 0 && (
                            <>
                              {' '}
                              {Math.abs(p.deflorestation.variation).toFixed(2)}
                              <small>%</small>
                            </>
                          )}
                        </b>
                        .
                      </p>
                    </Col>
                  </Row>
                </Col>
              );
            })}
        </Row>

        <Row>
          <Col>
            <Sources sources={[...deflorestation.getSources()]} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Compare;
