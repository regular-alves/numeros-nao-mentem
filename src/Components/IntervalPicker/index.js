import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBr from 'date-fns/locale/pt-BR';
import { Col, Row } from "react-bootstrap";
import { AiOutlineCalendar } from 'react-icons/ai';
import "react-datepicker/dist/react-datepicker.css";
import './style.css';

registerLocale('pt-BR', ptBr);

const IntervalPicker = props => {
  const {min, max, from, to, setFrom, setTo} = props;
  const common = {
    dateFormat: 'MM/yyyy',
    showMonthYearPicker: true,
    showFullMonthYearPicker: true,
    locale: 'pt-BR',
    className: 'IntervalPicker-input'
  }

  const minValue = min || from;
  const maxValue = max || to;

  return (
    <Row className="IntervalPicker">
      <Col className="IntervalPicker-icon" xs={2}>
        <AiOutlineCalendar />
      </Col>
      <Col xs={5}>
        <DatePicker
          selected={new Date(from)}
          maxDate={maxValue}
          onChange={f => setFrom(f.toISOString())}
          {...common}
        />
      </Col>
      <Col xs={5}>
        <DatePicker
          selected={new Date(to)}
          minDate={minValue}
          onChange={t => setTo(t.toISOString())}
          {...common}
        />
      </Col>
    </Row>
  )
}

export default IntervalPicker;