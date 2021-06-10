import React, { useState } from 'react';
import { PRESET_FILTERS } from '../../../constants';

const Search = ({ setItems, items, getSearchValue }) => {
  const [input, setInput] = useState('');
  const filterHandler = (e) => {
    e.preventDefault();

    const { value } = e.target;

    setInput(value);

    getSearchValue(value);

    const filteredItems = [];

    const regexp = new RegExp(`(\\b${value.toLowerCase()})`, 'gi');

    PRESET_FILTERS.forEach((typeFilter) => {
      let filterByTypeFilter = items.filter((item) =>
        /**
         * Фильтруем по последовательности символов
         */
        regexp.test(item[typeFilter].toLowerCase())
      );

      /**
       * Распаковываем массив
       */
      filteredItems.push(...filterByTypeFilter);
    });

    if (!value) {
      setItems(items);
    } else if (value === ' ') {
      setItems([]);
    } else {
      /**
       * Фильтруем от одинаковых значений
       */
      setItems([...new Set(filteredItems)]);
    }
  };

  return (
    <div className="row">
      <div className="col-6">
        <input
          className="form-control"
          type="text"
          placeholder="Please search parrots..."
          onChange={filterHandler}
          // onBlur={() => getSearchValue('')}
          // onFocus={() => getSearchValue(input)}
        />
      </div>
    </div>
  );
};

export default Search;
