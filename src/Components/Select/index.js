import React from 'react';
import './style.css';

function Select({ inputRef, className, children }) {
  return (
    <select className={`Select ${className || ''}`} ref={inputRef}>
      {children}
    </select>
  );
}

export default Select;
