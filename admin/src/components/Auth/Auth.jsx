import React, { useContext } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationUser } from '../../features/auth/authSlice';
import { AuthContext } from '../../context/AuthContext';
import { authSelector } from '../../selectors/auth';

const Auth = () => {
  const auth = useContext(AuthContext);
  const { error } = useSelector(authSelector);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(authenticationUser(values)).then((result) => {
      const { payload } = result;
      if (payload && payload.token) {
        auth.login(payload.token, payload.id);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {};

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <div
      style={{ display: 'flex', margin: '20px 0', justifyContent: 'center' }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{
          login: 'admin',
          password: '5102',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1 style={{ textAlign: 'center' }}>Авторизация</h1>
        <Form.Item
          label="Логин"
          name="login"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваше имя.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш пароль.',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {error && (
          <Alert
            type="error"
            message="Неправильный логин или пароль"
            banner
            closable
          />
        )}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Link to="/register">Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
