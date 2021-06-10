import React from 'react';
import Tile from './Tile';

const List = ({ items, searchValue }) => {
  const renderItems = (
    <>
      {!!items.length && (
        <div className="row g-4 parrots__list">
          {items.map((item) => (
            <Tile key={item.id} {...item} searchValue={searchValue} />
          ))}
        </div>
      )}
    </>
  );
  return <div className="mt-4">{renderItems}</div>;
};

export default List;
