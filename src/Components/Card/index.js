import { Col, Image, Row } from "react-bootstrap";
import './style.css';

const Card = (props) => {
  const {president, value, date, start, end, isGood, showPeriod} = props;

  return (
    <div className={`Card ${isGood ? 'Card-hasGoodValue' : ''}`}>
      <Row>
        <Col md={5}>
          <Image
            className="Card-image"
            src={president.image || ''}
            title={president.name}
            alt={president.name}
          />
        </Col>
        <Col className="Card-body" md={7}>
          <h5>{president.name}</h5>
          <div className="Card-value">{value}</div>
          <div className="Card-date">
            {
              showPeriod ? 
              `${start} - ${end}` :
              date
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Card;