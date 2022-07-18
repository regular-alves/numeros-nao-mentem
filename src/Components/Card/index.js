import { Col, Image, Row } from "react-bootstrap";
import './style.css';

const Card = (props) => {
  const {president, value, date, isGood} = props;

  return (
    <div 
      className={`Card ${isGood !== undefined && ('Card-has' + (isGood ? 'Good' : 'Bad') + 'Value')}`}
    >
      <Row>
        <Col lg={5} md={3}>
          <Image
            className="Card-image"
            src={president.image || ''}
            title={president.name}
            alt={president.name}
          />
        </Col>
        <Col className="Card-body" lg={7} md={9}>
          <h5>{president.name}</h5>
          <div className="Card-value">{value}</div>
          <div className="Card-date">{date.start && date.end ? `${date.start} - ${date.end}` : date}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Card;