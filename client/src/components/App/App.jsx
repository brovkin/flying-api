import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from '../../routes';
import { useDispatch } from 'react-redux';
import { getParrots } from '../../features/parrots/parrotsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/index.scss';

const App = () => {
  const routes = useRoutes();
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Все основные запросы
     */
    dispatch(getParrots());
  }, []);

  return (
    <Router>
      <div className="container mt-4">{routes}</div>
    </Router>
  );
};

export default App;
