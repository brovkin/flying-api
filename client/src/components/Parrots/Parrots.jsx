import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader';
import { changeFilter, getParrots } from '../../features/parrots/parrotsSlice';
import { parrotsSelector } from '../../selectors/parrots';
import List from './List';
import './style.scss';
import Search from './Search';
import CheckboxFilter from './CheckboxFilter';

const Parrots = () => {
  const { items, loaded } = useSelector(parrotsSelector);
  const [currentItems, setCurrentItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const getSearchValue = (value) => setSearchValue(value);

  return (
    <>
      <Search
        setItems={setCurrentItems}
        items={items}
        getSearchValue={getSearchValue}
      />
      <CheckboxFilter setItems={setCurrentItems} items={items} />
      <Loader loaded={loaded}>
        {currentItems.length ? (
          <List items={currentItems} searchValue={searchValue} />
        ) : (
          'Поиск не дал результатов'
        )}
      </Loader>
    </>
  );
};

export default Parrots;
