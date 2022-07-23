import React from 'react';
import './style.css';

const Select = ({inputRef, className, children}) => {
  return (
    <select className={`Select ${className || ''}`} ref={inputRef}>
      {children}
    </select>
  );
}

export default Select;