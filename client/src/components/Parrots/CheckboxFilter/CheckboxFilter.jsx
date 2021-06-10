import React from 'react';
import Checkbox from './Checkbox';

const CheckboxFilter = ({ items, setItems, filterBy }) => {
  const filterHandle = (name, value) => {
    const filteredItems = items.filter((item) => item[name]);

    if (value) {
      setItems(filteredItems);
    } else {
      setItems(items);
    }
  };

  return (
    <>
      <Checkbox label="Летающий" name="flying" filterHandle={filterHandle} />
    </>
  );
};

export default CheckboxFilter;
