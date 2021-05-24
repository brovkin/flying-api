import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useRoutes } from '../../routes';
import { useAuth } from '../../hooks/useAuth';
import { AuthContext } from '../../context/AuthContext';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuth,
        userId,
      }}
    >
      <Router>
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
