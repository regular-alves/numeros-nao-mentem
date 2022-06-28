import React from "react";
import './style.css';

const Wrapper = props => {
  return (
    <div className="Wrapper">{ props.children }</div>
  );
}

export default Wrapper;