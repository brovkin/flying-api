import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Auth from '../Auth';

const RouterWrapper = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact>
          Home
        </Route>
        <Route path="/admin">Admin</Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/parrots">Parrots</Route>
      </Switch>
    </Router>
  </div>
);

export default RouterWrapper;
