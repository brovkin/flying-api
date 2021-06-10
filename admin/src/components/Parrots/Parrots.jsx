import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import AddParrot from './AddParrot';
import ParrotsTable from './ParrotsTable';
import { useDispatch, useSelector } from 'react-redux';
import { getParrots } from '../../features/parrots/parrotsSlice';
import { getCountries } from '../../features/common/commonSlice';
import { selectCountries } from '../../selectors/common';
import './style.scss';

const { TabPane } = Tabs;

const Parrots = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  useEffect(() => {
    dispatch(getParrots());
    /**
     * Получаем common requests
     */
    dispatch(getCountries());
  }, []);

  return (
    <div>
      <h2>Попугаи</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Таблица данных" key="1">
          <ParrotsTable countries={countries} />
        </TabPane>
        <TabPane tab="Загрузить" key="2">
          <AddParrot countries={countries} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Parrots;
