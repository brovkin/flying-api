import React, { useContext, useEffect } from 'react';
import { Layout, Button, Menu } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import ParrotLogo from '../../assets/images/logo.png';
import { UserOutlined, UploadOutlined, HomeFilled } from '@ant-design/icons';
import { Link, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import UserProfile from '../UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../selectors/auth';
import { getUser } from '../../features/auth/authSlice';
import './style.scss';
import Parrots from '../Parrots';

const { Header, Sider, Content, Footer } = Layout;

const AdminPanel = () => {
  const { userId, token, logout } = useContext(AuthContext);
  const { name } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser({ userId, token }));
  }, [userId]);

  const menuRotes = () => {
    return (
      <Switch>
        <Route path="/" exact>
          Welcome, {name}
        </Route>
        <Route path="/user">
          <UserProfile />
        </Route>
        <Route path="/parrots">
          <Parrots />
        </Route>
      </Switch>
    );
  };

  return (
    <div>
      <Layout>
        <Header className="admin-panel__header">
          <Link to="/">
            <img
              className="admin-panel__logo"
              src={ParrotLogo}
              alt="flying-api.com"
            />
          </Link>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.Item key="1" icon={<HomeFilled />}>
                <Link to="/">Главная</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/user">Пользователь</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/parrots">Попугаи</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '20px' }}>{menuRotes()}</Content>
        </Layout>
        <Footer>flying-api.com</Footer>
      </Layout>
    </div>
  );
};

export default AdminPanel;
