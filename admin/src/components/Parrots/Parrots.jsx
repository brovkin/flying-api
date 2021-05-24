import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import AddParrot from './AddParrot';
import ParrotsTable from './ParrotsTable';
import { useDispatch } from 'react-redux';
import { getParrots } from '../../features/parrots/parrotsSlice';

const { TabPane } = Tabs;

const Parrots = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParrots());
  }, []);

  return (
    <div>
      <h2>Попугаи</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Таблица данных" key="1">
          <ParrotsTable />
        </TabPane>
        <TabPane tab="Загрузить" key="2">
          <AddParrot />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Parrots;
