import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Figure, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';
import Chart from '../../Components/Chart';
import Featured from '../../Components/Featured';
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

const Compare = () => {
  const routeSeleted = Object.values(useParams());
  const selectPresident = useRef();

  const presidents = new Presidents();
  const foodVsSalary = new FoodVsSalary();
  const foodBasket = new FoodBasket();
  const salary = new Salary();
  const deflorestation = new Deflorestation();

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
      minDates.sort((a,b) => b - a).shift(),
      maxDates.sort((a,b) => b - a).pop(),
    )
    .sort((a, b) => b.start - a.start);

  
  const [selected, setSelected] = useState(available.filter(a => routeSeleted.includes(a.slug)));
  let { pathname: location} = useLocation();

  location = location.replace(routeSeleted.join('/'), '');

  useEffect(() => {
    let path = location;

    if(path.substring(path.length - 1) === '/') {
      path = path.substring(0, path.length - 1);
    }

    window.history.replaceState(
      null,
      null,
      `${path}/${selected.map(p => p.slug).join('/')}`
    );
  }, [selected, location]);

  const removeSelected = (slug) => {
    setSelected(selected.filter(s => s.slug !== slug));
  }

  const addPresident = () => {
    const newValues = [...selected];
    const equivalent = available.filter(p => p.slug === selectPresident.current.value).pop();

    if (!equivalent) return;

    newValues.push(equivalent);

    setSelected(newValues);
  }

  const minFoodAxis = selected
    .map(s => foodVsSalary.getPeriodValues(s.start, s.end).sort((a, b) => b - a).shift())
    .sort((a,b) => b - a)
    .shift();

  const minDeflorestationAxis = selected
    .map(s => deflorestation.getPeriodValues(s.start, s.end).sort((a, b) => b - a).shift())
    .sort((a,b) => b - a)
    .shift();

  const avgsFood = selected.map(p => getAvg(foodVsSalary.getPeriodValues(p.start, p.end)));
  const minAvgsFood = [...avgsFood].sort((a, b) => b - a).pop();

  const avgsDeflorestation = selected.map(p => deflorestation.getPeriodAverage(p.start, p.end));
  const minAvgsDeflorestation = [...avgsDeflorestation].sort((a, b) => b - a).pop();

  return (
    <>
    <Helmet>
      <title>
        { selected.length>1 ? selected.map(p => p.name).join(' vs. ') + ' | ' : '' }
        Comparador | Números não mentem
      </title>
    </Helmet>
    <Header />
    <Container className="Content-wrapper">
      
      <Row>
        <Col>
          <h1>Comparador</h1>
          <p>Compare o mandato dos presidentes utilizando os relatórios que disponibilizamos.</p>
          {selected.length===0 && (
            <Alert variant='secondary'>Selecione um presidente para começar</Alert>
          )}
        </Col>
      </Row>

      <Row className='align-items-end'>
        <Col md={3}></Col>
        {
          selected.length > 0 && 
          selected.map(p => (
            <Col md={3}>
              <Row className='justify-content-md-center d-none d-md-grid'>
                <Col md='auto'>
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
              <Row className='mb-2'>
                <Col xs={8} sm={8} className='d-sm-grid d-md-none'>
                  <b>{p.name}</b>
                </Col>
                <Col xs={4} sm={4} md={12} className='d-grid'>
                  <Button size='sm' variant='danger' onClick={() => removeSelected(p.slug)}>Remover</Button>
                </Col>
              </Row>
            </Col>
          ))
        }
        {selected.length < 3 && (
          <Col md={3}>
            <Row>
              <Col xs={8} sm={8}>
                <Select inputRef={selectPresident}>
                  {
                    available
                    .filter(p => !selected.map(i => i.slug).includes(p.slug))
                    .map(p => 
                      (<option value={p.slug}>{p.name}</option>)
                    )
                  }
                </Select>    
              </Col>
              <Col xs={4} sm={4} className='d-grid'>
                <Button onClick={() => addPresident()}>Adicionar</Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      <Row>
        <Col>
          <hr/>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Cesta básica</h3>
          <p>
            A cesta básica de alimentos deve conter itens básicos para o sustento de uma família.<br/>
            Normalmente ela contem itens como Arroz, Feijão, Açúcar, Sal, Óleo de soja, Café, e etc.
          </p>
          <Link to='/cesta-basica'>
            <Button variant='light'>Ver relatório completo</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md={3}>&nbsp;</Col>
        {selected.length > 0 && 
          selected.map((p, i) => (
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
                          text: 'Porcentagem (%)'
                        }
                      },
                      xAxis: {
                        categories: getDateInterval(p.start, p.end).map(d => slashedMonthYear(d)),
                      },
                      series: [
                        {
                          name: 'Porcentagem',
                          data: foodVsSalary.getPeriodValues(p.start, p.end),
                          color: '#2176AE'
                        }
                      ],
                      chart: {
                        height: '300vw'
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={`ComparisonValue ${minAvgsFood===avgsFood[i] ? 'ComparisonValue-best' : ''}`}>
                    <Featured>{avgsFood[i].toFixed(2)}<small>%</small></Featured>
                  </div>
                </Col>
              </Row>
            </Col>
          ))}
      </Row>

      <Row>
        <Col>
          <Sources sources={[...foodVsSalary.getSources()]}/>
        </Col>
      </Row>

      <Row>
        <Col>
          <hr/>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>Desmatamento</h3>
          <p>
            A taxa de desmatamento é realizada pelo PRODES (Monitoramento do Desmatamento da Floresta Amazônica Brasileira por Satélite) 
            através de satélites por corte raso na Amazônia Legal e produz, desde 1988, as taxas anuais de desmatamento na região.
          </p>
          <Link to='/desmatamento'>
            <Button variant='light'>Ver relatório completo</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md={3}>&nbsp;</Col>
        {selected.length > 0 && 
          selected.map((p, i) => (
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
                          text: 'Porcentagem (%)'
                        }
                      },
                      xAxis: {
                        categories: getDateInterval(p.start, p.end).map(d => slashedMonthYear(d)),
                      },
                      series: [
                        {
                          name: 'Porcentagem',
                          data: deflorestation.getPeriodSeries(p.start, p.end),
                        }
                      ],
                      chart: {
                        height: '300vw'
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={`ComparisonValue ${minAvgsDeflorestation===avgsDeflorestation[i] ? 'ComparisonValue-best' : ''}`}>
                  <Featured>{avgsDeflorestation[i].toFixed(2)}<small>km²</small></Featured>
                </Col>                
              </Row>
            </Col>
          ))}
      </Row>

      <Row>
        <Col>
          <Sources sources={[...deflorestation.getSources()]}/>
        </Col>
      </Row>

    </Container>
    <Footer />
    </>
  );
}

export default Compare;