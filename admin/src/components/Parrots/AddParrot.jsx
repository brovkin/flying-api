import React, { useState } from 'react';
import { Upload, Button, Form, Input, Alert, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { formLayout, formTailLayout } from '../../constants';
import { apiRequest } from '../../helpers/apiRequest';
import { useDispatch } from 'react-redux';
import { addParrot } from '../../features/parrots/parrotsSlice';

const AddParrot = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('image', data.image.file.originFileObj);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('flying', data.flying);

    try {
      const result = await apiRequest('POST', '/parrots/add', formData);
      if (result.data.status === 'ok') {
        dispatch(addParrot(result.data.parrot));
        setSuccess(true);
        form.resetFields();
      }
    } catch (e) {
      setError(true);
      setErrorMessage('Такой попугай существует');
    }
  };

  const onFail = () => {};
  const changeValues = (values) => {
    if (error) {
      setError(false);
    }
  };

  return (
    <Form
      {...formLayout}
      onFinish={onSubmit}
      onFinishFailed={onFail}
      onValuesChange={changeValues}
      form={form}
    >
      <Form.Item
        label="Название"
        name="name"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, заполните название',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, заполните описание.',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Картинка"
        name="image"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, загрузите картинку.',
          },
        ]}
      >
        <Upload>
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Летающий"
        name="flying"
        valuePropName="checked"
        initialValue={false}
        rules={[
          {
            required: false,
            message: 'Пожалуйста, загрузите картинку.',
          },
        ]}
      >
        <Checkbox />
      </Form.Item>

      {error && (
        <Form.Item {...formTailLayout}>
          <Alert
            type="error"
            message={errorMessage}
            banner
            closable
            onClose={() => setError(false)}
          />
        </Form.Item>
      )}

      {success && (
        <Form.Item {...formTailLayout}>
          <Alert
            type="success"
            message={'Успешно добавлен попугай'}
            banner
            closable
            onClose={() => setSuccess(false)}
          />
        </Form.Item>
      )}

      <Form.Item {...formTailLayout}>
        <Button type="primary" htmlType="submit">
          Принять
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddParrot;
