import { Col, Row } from "react-bootstrap";
import { slashedMonthYear } from "../../utils";
import Card from "../Card";

const BestAndWorst = (props) => {
  const {
    from,
    to,
    worstPercent,
    bestPercent,
    worstAvg,
    bestAvg
  } = props;

  return (
    <>
      <Row>
        <h2>{`Os melhores e piores de ${slashedMonthYear(from)} à ${slashedMonthYear(to)}`}</h2>
      </Row>
      <Row>
        <Col lg={6}>
          <Row>
            <Col>
              <h3>Números absolutos</h3>
              <p>Média nacional dos valores observados em cada mês.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card 
                president={bestPercent.president}
                value={bestPercent.value}
                isGood
              />
            </Col>
            <Col>
              <Card 
                president={worstPercent.president}
                value={worstPercent.value}
              />
            </Col>
          </Row>
        </Col>
        <Col lg={6}>
          <Row>
            <Col>
              <h3>Média</h3>
              <p>Média nacional do período dos valores observados.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card 
                president={bestAvg.president}
                value={bestAvg.value}
                showPeriod
                isGood
              />
            </Col>
            <Col>
              <Card 
                president={worstAvg.president}
                value={worstAvg.value}
                showPeriod
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default BestAndWorst;