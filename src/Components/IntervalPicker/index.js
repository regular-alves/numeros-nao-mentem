import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBr from 'date-fns/locale/pt-BR';

import './style.css';
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="IntervalPicker">
      <DatePicker
        selected={new Date(from)}
        maxDate={maxValue}
        onChange={f => setFrom(f.toISOString())}
        {...common}
      />
      <DatePicker
        selected={new Date(to)}
        minDate={minValue}
        onChange={t => setTo(t.toISOString())}
        {...common}
      />
    </div>
  )
}

export default IntervalPicker;