import React from "react";
import './style.css';

const HalfWidth = (props) => {
  const { pullRight } = props;

  return (
    <div className={`HalfWidth ${pullRight ? `HalfWidth--pullRight` : ''}`}>
      <div className="HalfWidth-content">
        { props.children }
      </div>
    </div>
  );
}

export default HalfWidth;