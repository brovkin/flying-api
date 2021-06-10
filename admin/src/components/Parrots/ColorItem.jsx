import React from 'react';

const ColorItem = ({ children, onMouseEnter, onClick, color }) => {
  return (
    <div
      className="parrots__color-item"
      style={{
        backgroundColor: color.hex,
      }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ColorItem;
