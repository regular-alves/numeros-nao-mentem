import { Col, Row } from 'react-bootstrap';
import { slashedMonthYear } from '../../utils';
import Card from '../Card';

const BestAndWorst = (props) => {
  const { from, to, best, worst } = props;

  return (
    <>
      <Row>
        <h2>{`Os melhores e piores de ${slashedMonthYear(
          from,
        )} à ${slashedMonthYear(to)}`}</h2>
      </Row>
      <Row>
        <Col xl={6} lg={12}>
          <Row>
            <Col>
              <h3>Números absolutos</h3>
              <p>Valores registrados no período pesquisado.</p>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Card {...best.absolute} isGood />
            </Col>
            <Col sm={6}>
              <Card {...worst.absolute} />
            </Col>
          </Row>
        </Col>
        <Col xl={6} lg={12}>
          <Row>
            <Col>
              <h3>Média do mandato</h3>
              <p>
                Média dos valores do mandato do candidato no período pesquisado.
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Card {...best.average} showPeriod isGood />
            </Col>
            <Col sm={6}>
              <Card {...worst.average} showPeriod />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BestAndWorst;
