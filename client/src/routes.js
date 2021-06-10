import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import Parrots from './components/Parrots';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <div>Client is running</div>
        <Link to="/parrots">Попугаи</Link>
      </Route>
      <Route path="/parrots">
        <Parrots />
      </Route>
    </Switch>
  );
};
