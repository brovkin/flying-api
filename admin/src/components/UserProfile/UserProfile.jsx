import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setUserPassword } from '../../features/auth/authSlice';
import { authSelector } from '../../selectors/auth';
import { formLayout, formTailLayout } from '../../constants';

const { TabPane } = Tabs;

const UserProfile = ({ user }) => {
  const { id, login, password, name, email, phone } = user;
  const { loading } = useSelector(authSelector);
  const [userDataError, setUserDataError] = useState(false);
  const [userDataSuccess, setUserDataSuccess] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const dispatch = useDispatch();

  const changeValues = (values) => {
    setUserDataError(false);
    setUserDataSuccess(false);
    setPasswordError(false);
    setPasswordSuccess(false);
  };

  const updateUserData = async (values) => {
    const result = await dispatch(setUserData({ id, values }));

    const { error, payload } = result;
    if (error) {
      setPasswordError(true);
    }

    if (payload.status === 'ok') {
      setUserDataSuccess(true);
    }
  };

  const updateUserPassword = async (values) => {
    const result = await dispatch(setUserPassword({ id, values }));
    const { error, payload } = result;

    if (error) {
      setPasswordError(true);
    }

    if (payload.status === 'ok') {
      setPasswordSuccess(true);
    }
  };

  const onFail = (errors) => {};

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Основные настройки" key="1">
          <Spin spinning={loading} tip="Loading...">
            <Form
              {...formLayout}
              name="basic"
              initialValues={{
                login,
                password,
                name,
                email,
                phone,
              }}
              onFinish={updateUserData}
              onFinishFailed={onFail}
              onValuesChange={changeValues}
            >
              <Form.Item
                label="Логин"
                name="login"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста введите Ваш логин!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Имя"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста введите Ваше имя!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="E-mail" name="email">
                <Input />
              </Form.Item>

              <Form.Item label="Телефон" name="phone">
                <Input />
              </Form.Item>

              {userDataSuccess && (
                <Form.Item {...formTailLayout}>
                  <Alert type="success" message="Успешно!" banner />
                </Form.Item>
              )}

              {userDataError && (
                <Form.Item {...formTailLayout}>
                  <Alert type="error" message="Test" banner />
                </Form.Item>
              )}

              <Form.Item {...formTailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </TabPane>
        <TabPane tab="Смена пароля" key="2">
          <Form
            {...formLayout}
            name="basic"
            initialValues={{
              remember: true,
              login,
              password,
            }}
            onFinish={updateUserPassword}
            onFinishFailed={onFail}
            onValuesChange={changeValues}
          >
            <Form.Item
              label="Текущий пароль"
              name="current_password"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите Ваш текущий пароль!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Новый пароль"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите Ваш новый пароль!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Повторите новый пароль"
              name="repeat_new_password"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста подтвердите Ваш новый пароль!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            {passwordSuccess && (
              <Form.Item {...formTailLayout}>
                <Alert type="success" message="Успешно!" banner />
              </Form.Item>
            )}

            {passwordError && (
              <Form.Item {...formTailLayout}>
                <Alert type="error" message="Ошибка" banner />
              </Form.Item>
            )}

            <Form.Item {...formTailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfile;
