import { Col, Image, Row } from "react-bootstrap";
import { slashedMonthYear } from "../../utils";
import './style.css';

const Card = (props) => {
  const {president, value, isGood, showPeriod} = props;

  return (
    <div className={`Card ${isGood ? 'Card-hasGoodValue' : ''}`}>
      <Row>
        <Col xs={5}>
          <Image
            className="Card-image"
            src={president.image || ''}
            title={president.name}
            alt={president.name}
          />
        </Col>
        <Col className="Card-body" xs={7}>
          <h5>{president.name}</h5>
          <div className="Card-value">{`${value.value.toFixed(2)}%`}</div>
          <div className="Card-date">
            {
              showPeriod ? 
              `${slashedMonthYear(value.start)} - ${slashedMonthYear(value.end)}` :
              slashedMonthYear(value.date)
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Card;