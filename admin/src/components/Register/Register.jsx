import React from 'react';
import { Form, Input, Button } from 'antd';

const Register = () => {
  const onFinish = (values) => {};

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
          password: 'password',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1 style={{ textAlign: 'center' }}>Регистрация</h1>
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
