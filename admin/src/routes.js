import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import Register from './components/Register';
import React from 'react';
import { Redirect } from 'react-router';

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return <AdminPanel />;
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
