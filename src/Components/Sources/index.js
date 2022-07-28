import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import './style.css';

function Sources(props) {
  const { sources } = props;

  return (
    <ul className="Sources">
      <li className="Sources-title">Fontes</li>
      {sources.map(
        (source) =>
          source.url &&
          source.name && (
            <li className="Source">
              <a href={source.url} nofollow="true">
                {source.name} <FiExternalLink />
              </a>
            </li>
          ),
      )}
    </ul>
  );
}

export default Sources;
