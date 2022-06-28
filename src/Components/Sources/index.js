import React from "react";
import { FiExternalLink } from 'react-icons/fi';
import './style.css';

const Sources = props => {
  const { sources } = props;

  return (
    <>
      <ul className="Sources">
        <li className="Sources-title">Fontes</li>
        {sources.map( source => (
          <li className="Source">
            <a href={source.url}>{source.name} <FiExternalLink /></a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sources;