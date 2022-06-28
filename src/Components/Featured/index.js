import React from "react";
import './style.css';

const Featured = (props) => {
  return (
    <div className="Featured">
      { props.children }
    </div>
  );
}

export default Featured;