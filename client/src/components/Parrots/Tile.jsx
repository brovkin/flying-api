import React, { useEffect, useState } from 'react';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findChunksWords } from '../../helpers/findChunksWords';

const Tile = ({ name, image, description, flying, searchValue }) => {
  const [chunkToHighlight, setChunkToHighlight] = useState('');

  useEffect(() => {
    setChunkToHighlight(searchValue);
  }, [searchValue]);

  return (
    <div className="col-12 col-lg-4 col-md-6">
      <div className="parrots__wrapper">
        <div className="parrots__name-wrapper">
          <Highlighter
            searchWords={[chunkToHighlight]}
            textToHighlight={name}
            findChunks={findChunksWords}
            className="parrots__highlight parrots__name"
          />
          {!!flying && <FontAwesomeIcon icon={faFeather} />}
        </div>

        <div className="parrots__content">
          <div className="parrots__image-wrapper">
            <img
              alt=""
              className="parrots__image"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
          <Highlighter
            searchWords={[chunkToHighlight]}
            textToHighlight={description}
            findChunks={findChunksWords}
            className="parrots__highlight parrots__description"
          />
        </div>
      </div>
    </div>
  );
};

export default Tile;
